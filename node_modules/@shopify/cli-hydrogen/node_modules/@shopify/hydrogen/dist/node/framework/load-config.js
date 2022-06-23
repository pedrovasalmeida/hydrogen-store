"use strict";
// Provide Hydrogen config loader to external tools like the CLI
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const vite_plugin_hydrogen_virtual_files_1 = require("./plugins/vite-plugin-hydrogen-virtual-files");
const viteception_1 = require("./viteception");
async function loadConfig(options = { root: process.cwd() }) {
    const { loaded } = await (0, viteception_1.viteception)([vite_plugin_hydrogen_virtual_files_1.VIRTUAL_PROXY_HYDROGEN_CONFIG_ID], options);
    return { configuration: loaded[0].default };
}
exports.loadConfig = loadConfig;
