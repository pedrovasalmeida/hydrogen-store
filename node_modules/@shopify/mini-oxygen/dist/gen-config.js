#!/usr/bin/env node --no-warnings
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const fs_1 = require("fs");
const path_1 = require("path");
const inquirer_1 = __importDefault(require("inquirer"));
const preview_1 = require("./preview");
const DEFAULTS = {
    port: 3000,
    workerFile: 'dist/worker/index.js',
    assetsDir: 'dist/client',
    buildCommand: 'yarn build',
    watch: true,
    buildWatchPaths: ['./src'],
    autoReload: true,
    modules: true,
    env: {},
};
inquirer_1.default
    .prompt([
    {
        name: 'port',
        type: 'number',
        message: 'TCP port to use for development server',
        default: DEFAULTS.port,
    },
    {
        name: 'workerFile',
        message: 'Relative path to the worker file',
        default: DEFAULTS.workerFile,
        validate: (input) => {
            return (0, fs_1.existsSync)((0, path_1.resolve)(input))
                ? true
                : `No file found at ${(0, path_1.resolve)(input)}. You may need to build your project first.`;
        },
    },
    {
        name: 'assetsDir',
        message: 'Relative path to the where public assets are located for your project',
        default: DEFAULTS.assetsDir,
        validate: (input) => {
            return (0, fs_1.existsSync)((0, path_1.resolve)(input))
                ? true
                : `No directory found at ${(0, path_1.resolve)(input)}. You may need to build your project first.`;
        },
    },
    {
        name: 'buildCommand',
        message: 'Command to run that will trigger the build for your project',
        default: DEFAULTS.buildCommand,
    },
    {
        name: 'watch',
        type: 'confirm',
        message: 'Watch for source file changes?',
        default: DEFAULTS.watch,
    },
    {
        name: 'buildWatchPaths',
        message: 'Any paths that should trigger the build command when changed. Separate multiple with a ,',
        default: DEFAULTS.buildWatchPaths,
        when: (answers) => answers.watch === true,
        filter: (input) => {
            if (Array.isArray(input))
                return input;
            // Need to change input string into an array of file paths
            return input.split(',').map((filePath) => filePath.trim());
        },
    },
    {
        name: 'autoReload',
        type: 'confirm',
        message: 'Auto refresh browser after changes?',
        default: DEFAULTS.autoReload,
        when: (answers) => answers.watch === true,
    },
    {
        name: 'modules',
        type: 'confirm',
        message: 'Does your worker file use ES module syntax?',
        default: DEFAULTS.modules,
    },
])
    .then((answers) => {
    const filePathFull = (0, path_1.resolve)(preview_1.configFileName);
    (0, fs_1.writeFileSync)(preview_1.configFileName, JSON.stringify({ ...answers, env: DEFAULTS.env }, null, 2), 'utf-8');
    console.log(`✅ Successfully generated config file at ${filePathFull}\n🔑 You may add environment variables for your worker by editing this file`);
})
    .catch((error) => {
    if (error.isTtyError) {
        console.log(`Cannot launch config file assistant in current environment. Please manually add a ${preview_1.configFileName} file in the root of your project in the following format\n${JSON.stringify(DEFAULTS, null, 2)}`);
    }
    else {
        console.log(`Failed to complete config file assistant. Please re-run the command or manually add a ${preview_1.configFileName} file in the root of your project in the following format\n${JSON.stringify(DEFAULTS, null, 2)}`);
    }
});
