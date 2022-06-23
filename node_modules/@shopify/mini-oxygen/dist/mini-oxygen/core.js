"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniOxygen = void 0;
const core_1 = require("@miniflare/core");
const cache_1 = require("@miniflare/cache");
const runner_vm_1 = require("@miniflare/runner-vm");
const shared_1 = require("@miniflare/shared");
const server_1 = require("./server");
const storage_1 = require("./storage");
const PLUGINS = {
    CorePlugin: core_1.CorePlugin,
    CachePlugin: cache_1.CachePlugin,
    BuildPlugin: core_1.BuildPlugin,
    BindingsPlugin: core_1.BindingsPlugin,
};
class MiniOxygen extends core_1.MiniflareCore {
    constructor(options, env) {
        const storageFactory = new storage_1.StorageFactory();
        super(PLUGINS, {
            log: new shared_1.Log(shared_1.LogLevel.VERBOSE),
            storageFactory,
            scriptRunner: new runner_vm_1.VMScriptRunner(),
        }, {
            bindings: env,
            ...options,
        });
    }
    async dispose() {
        return super.dispose();
    }
    createServer(options) {
        return (0, server_1.createServer)(this, options);
    }
}
exports.MiniOxygen = MiniOxygen;
