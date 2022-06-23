export declare class StorageFactory {
    storages: Map<string, any>;
    constructor();
    storage(namespace: string): any;
}
