"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const mime_1 = __importDefault(require("mime"));
const core_1 = require("@miniflare/core");
const connect_1 = __importDefault(require("connect"));
const SSEUrl = '/events';
const autoReloadScript = `<script defer type="application/javascript">
(function () {
  // MiniOxygen Auto Reload
  var source = new EventSource('${SSEUrl}');
  source.addEventListener('open', function(e) { console.log('Auto Reload Enabled') }, false);
  source.onmessage = function(e) { if (e.data === 'connected') {console.log('Listening for events...');} else if (e.data === 'reload') {location.reload();} };
})();
</script>`;
const autoReloadScriptLength = Buffer.byteLength(autoReloadScript);
function createAssetMiddleware({ assetsDir, }) {
    return (req, res, next) => {
        const url = new URL(req.url || '/', `http://${req.headers.host}`);
        const pathname = url.pathname.substring(1);
        const filePath = path_1.default.join(assetsDir, pathname);
        if (pathname !== '' && fs_1.default.existsSync(filePath)) {
            const rs = fs_1.default.createReadStream(filePath);
            const { size } = fs_1.default.statSync(filePath);
            res.setHeader('Content-Type', mime_1.default.getType(filePath));
            res.setHeader('Content-Length', size);
            return rs.pipe(res);
        }
        next();
    };
}
function writeSSE(res, data) {
    const id = new Date().toLocaleTimeString();
    res.write(`id: ${id}\n`);
    res.write(`data: ${data}\n\n`);
}
function createAutoReloadMiddleware(mf) {
    return (req, res) => {
        if (req.headers.accept && req.headers.accept === 'text/event-stream') {
            mf.addEventListener('reload', () => writeSSE(res, 'reload'));
            res.writeHead(200, {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'Content-Type': 'text/event-stream',
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
            });
            return writeSSE(res, 'connected');
        }
        else {
            res.writeHead(400).end('Bad Request');
        }
    };
}
function createRequestMiddleware(mf, autoReload) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return async (req, res) => {
        let response;
        let status = 500;
        const headers = {};
        const reqHeaders = {};
        // eslint-disable-next-line guard-for-in
        for (const key in req.headers) {
            const val = req.headers[key];
            if (Array.isArray(val)) {
                reqHeaders[key] = val.join(',');
            }
            else if (val !== undefined) {
                reqHeaders[key] = val;
            }
        }
        const request = new core_1.Request(urlFromRequest(req), {
            method: req.method,
            headers: reqHeaders,
        });
        try {
            response = await mf.dispatchFetch(request);
            status = response.status;
            // eslint-disable-next-line guard-for-in
            for (const key in req.headers) {
                const val = req.headers[key];
                if (Array.isArray(val)) {
                    headers[key] = val.join(',');
                }
                else if (val !== undefined) {
                    headers[key] = val;
                }
            }
            if (autoReload) {
                const contentLength = response.headers.get('content-length');
                if (contentLength) {
                    headers['content-length'] =
                        parseInt(contentLength, 10) + autoReloadScriptLength;
                }
            }
            res.writeHead(status, headers);
            if (response.body) {
                for await (const chunk of response.body) {
                    res.write(chunk);
                }
                if (autoReload) {
                    res.write(autoReloadScript);
                }
            }
            res.end();
        }
        catch (err) {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            res.writeHead(status, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end(err.stack, 'utf8');
        }
        return response;
    };
}
function createServer(mf, { assetsDir, autoReload = false }) {
    const app = (0, connect_1.default)();
    if (assetsDir) {
        app.use(createAssetMiddleware({ assetsDir }));
    }
    if (autoReload) {
        app.use(SSEUrl, createAutoReloadMiddleware(mf));
    }
    app.use(createRequestMiddleware(mf, autoReload));
    const server = http_1.default.createServer(app);
    return server;
}
exports.createServer = createServer;
function urlFromRequest(req) {
    var _a, _b;
    const protocol = req.socket.encrypted ? 'https' : 'http';
    const origin = `${protocol}://${(_a = req.headers.host) !== null && _a !== void 0 ? _a : 'localhost'}`;
    const url = new URL((_b = req.url) !== null && _b !== void 0 ? _b : '', origin);
    return url;
}
