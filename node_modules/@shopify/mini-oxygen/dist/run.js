"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const fs_1 = require("fs");
const path_1 = require("path");
const preview_1 = require("./preview");
const cwd = process.cwd();
let configOptions = {};
try {
    const configFilePath = (0, path_1.join)(cwd, preview_1.configFileName);
    if ((0, fs_1.existsSync)(configFilePath)) {
        const data = (0, fs_1.readFileSync)(configFilePath, {
            encoding: 'utf-8',
        });
        configOptions = JSON.parse(data);
    }
}
catch (err) {
    console.error(`Cannot load mini-oxygen:\n${err}`);
    process.exit(1);
}
(0, preview_1.preview)(configOptions);
