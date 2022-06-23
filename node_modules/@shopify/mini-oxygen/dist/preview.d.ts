export declare type MiniOxygenPreviewOptions = Partial<{
    ui: {
        say(message: string): unknown;
    };
    port: number;
    workerFile: string;
    assetsDir: string;
    watch: boolean;
    modules: boolean;
    buildCommand: string;
    buildWatchPaths: string[];
    autoReload: boolean;
    env: {
        [key: string]: unknown;
    };
}>;
export declare const configFileName = "mini-oxygen.config.json";
export declare function preview(opts: MiniOxygenPreviewOptions): void;
