'use strict';

const url = require('url');
const path = require('path');
const _debug = require('debug');
const kolorist = require('kolorist');
const sirv = require('sirv');
const ufo = require('ufo');
const pluginutils = require('@rollup/pluginutils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const _debug__default = /*#__PURE__*/_interopDefaultLegacy(_debug);
const sirv__default = /*#__PURE__*/_interopDefaultLegacy(sirv);

const debug = _debug__default("vite-plugin-inspect");
const _dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(url.fileURLToPath((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('index.cjs', document.baseURI).href))));
function PluginInspect(options = {}) {
  const {
    enabled = true
  } = options;
  if (!enabled) {
    return {
      name: "vite-plugin-inspect"
    };
  }
  const filter = pluginutils.createFilter(options.include, options.exclude);
  let config;
  const transformMap = {};
  const idMap = {};
  function hijackPlugin(plugin) {
    if (plugin.transform) {
      debug("hijack plugin transform", plugin.name);
      const _transform = plugin.transform;
      plugin.transform = async function(...args) {
        const code = args[0];
        const id = args[1];
        const start = Date.now();
        const _result = await _transform.apply(this, args);
        const end = Date.now();
        const result = typeof _result === "string" ? _result : _result?.code;
        if (filter(id) && result != null) {
          if (transformMap[id] && transformMap[id].slice(-1)[0]?.name === "vite:import-analysis")
            delete transformMap[id];
          if (!transformMap[id])
            transformMap[id] = [{ name: "__load__", result: code, start, end: start }];
          transformMap[id].push({ name: plugin.name, result, start, end });
        }
        return _result;
      };
    }
    if (plugin.load) {
      debug("hijack plugin load", plugin.name);
      const _load = plugin.load;
      plugin.load = async function(...args) {
        const id = args[0];
        const start = Date.now();
        const _result = await _load.apply(this, args);
        const end = Date.now();
        const result = typeof _result === "string" ? _result : _result?.code;
        if (filter(id) && result != null)
          transformMap[id] = [{ name: plugin.name, result, start, end }];
        return _result;
      };
    }
    if (plugin.resolveId) {
      debug("hijack plugin resolveId", plugin.name);
      const _resolveId = plugin.resolveId;
      plugin.resolveId = async function(...args) {
        const id = args[0];
        const _result = await _resolveId.apply(this, args);
        const result = typeof _result === "object" ? _result?.id : _result;
        if (!id.startsWith("./") && result && result !== id)
          idMap[id] = result;
        return _result;
      };
    }
  }
  function resolveId(id = "") {
    if (id.startsWith("./"))
      id = path.resolve(config.root, id).replace(/\\/g, "/");
    return resolveIdRec(id);
  }
  function resolveIdRec(id) {
    return idMap[id] ? resolveIdRec(idMap[id]) : id;
  }
  function getIdInfo(id) {
    const resolvedId = resolveId(id);
    return {
      resolvedId,
      transforms: transformMap[resolvedId] || []
    };
  }
  function configureServer(server) {
    const _invalidateModule = server.moduleGraph.invalidateModule;
    server.moduleGraph.invalidateModule = function(...args) {
      const mod = args[0];
      if (mod?.id)
        delete transformMap[mod.id];
      return _invalidateModule.apply(this, args);
    };
    server.middlewares.use("/__inspect", sirv__default(path.resolve(_dirname, "../dist/client"), {
      single: true,
      dev: true
    }));
    server.middlewares.use("/__inspect_api", (req, res) => {
      const { pathname, search } = ufo.parseURL(req.url);
      if (pathname === "/list") {
        const modules = Object.keys(transformMap).sort().map((id) => {
          const plugins = transformMap[id]?.map((i) => i.name);
          const deps = Array.from(server.moduleGraph.getModuleById(id)?.importedModules || []).map((i) => i.id || "").filter(Boolean);
          return {
            id,
            plugins,
            deps,
            virtual: plugins[0] !== "__load__"
          };
        });
        res.write(JSON.stringify({
          root: config.root,
          modules
        }, null, 2));
        res.end();
      } else if (pathname === "/module") {
        const id = ufo.parseQuery(search).id;
        res.write(JSON.stringify(getIdInfo(id), null, 2));
        res.end();
      } else if (pathname === "/resolve") {
        const id = ufo.parseQuery(search).id;
        res.write(JSON.stringify({ id: resolveId(id) }, null, 2));
        res.end();
      } else if (pathname === "/clear") {
        const id = resolveId(ufo.parseQuery(search).id);
        if (id) {
          const mod = server.moduleGraph.getModuleById(id);
          if (mod)
            server.moduleGraph.invalidateModule(mod);
          delete transformMap[id];
        }
        res.end();
      }
    });
    server.httpServer?.once("listening", () => {
      const protocol = config.server.https ? "https" : "http";
      const port = config.server.port;
      setTimeout(() => {
        console.log(`  > Inspect: ${kolorist.yellow(`${protocol}://localhost:${port}/__inspect/`)}
`);
      }, 0);
    });
  }
  return {
    name: "vite-plugin-inspect",
    apply: "serve",
    configResolved(_config) {
      config = _config;
      config.plugins.forEach(hijackPlugin);
    },
    configureServer
  };
}

module.exports = PluginInspect;
