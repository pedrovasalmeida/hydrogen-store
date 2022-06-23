/// <reference types="node" />
import http from 'http';
import type { MiniOxygen } from './core';
export interface MiniOxygenServerOptions {
    assetsDir?: string;
    autoReload?: boolean;
}
export declare function createServer(mf: MiniOxygen, { assetsDir, autoReload }: MiniOxygenServerOptions): http.Server;
