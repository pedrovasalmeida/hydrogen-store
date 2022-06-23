#!/usr/bin/env node
"use strict";
/* eslint-disable no-console */
// Copied from miniflare https://github.com/cloudflare/miniflare/blob/870b401ef520c1826339ff060fd8a0a576392a91/packages/miniflare/bootstrap.js
// Used to enable modules support in node with cross platform compatability (Windows, Linux, Mac)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const path_1 = __importDefault(require("path"));
const semiver_1 = __importDefault(require("semiver"));
const MIN_NODE_VERSION = '16.7.0';
function main() {
    if ((0, semiver_1.default)(process.versions.node, MIN_NODE_VERSION) < 0) {
        // Note Volta and nvm are also recommended in the official docs:
        // https://developers.cloudflare.com/workers/get-started/guide#2-install-the-workers-cli
        console.log(`MiniOxygen requires at least Node.js ${MIN_NODE_VERSION}. 
You should use the latest Node.js version if possible, as Oxygen Workers use a very up-to-date version of V8.
Consider using a Node.js version manager such as https://volta.sh/ or https://github.com/nvm-sh/nvm.`);
        process.exitCode = 1;
        return;
    }
    child_process_1.default
        .spawn(process.execPath, [
        '--experimental-vm-modules',
        ...process.execArgv,
        path_1.default.join(__dirname, 'run.js'),
        ...process.argv.slice(2),
    ], { stdio: 'inherit' })
        .on('exit', (code) => process.exit(code === null ? 1 : code));
}
main();
