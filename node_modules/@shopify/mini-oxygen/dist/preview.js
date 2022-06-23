"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preview = exports.configFileName = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const core_1 = require("./mini-oxygen/core");
class WorkerNotFoundError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'WorkerNotFoundError';
        this.message = 'A worker file is required for this command. Try building your project or check your mini-oxygen config file to ensure a workerFile is specified and the path is correct.';
    }
}
exports.configFileName = 'mini-oxygen.config.json';
function preview(opts) {
    const { 
    // eslint-disable-next-line no-console
    ui = { say: (message) => console.log(message) }, port = 3000, workerFile, assetsDir, watch = false, buildWatchPaths, buildCommand, autoReload = false, modules = true, env = {}, } = opts;
    const root = process.cwd();
    if (!workerFile || !fs.existsSync(workerFile)) {
        throw new WorkerNotFoundError();
    }
    const mf = new core_1.MiniOxygen({
        buildCommand,
        scriptPath: path.resolve(root, workerFile),
        watch,
        modules,
        buildWatchPaths,
    }, env);
    const app = mf.createServer({
        assetsDir: assetsDir ? path.resolve(root, assetsDir) : undefined,
        autoReload,
    });
    app.listen(port, () => {
        ui.say(`\nStarted miniOxygen server. Listening at http://localhost:${port}\n`);
    });
}
exports.preview = preview;
