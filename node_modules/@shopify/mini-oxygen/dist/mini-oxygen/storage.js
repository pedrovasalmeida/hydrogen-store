"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageFactory = void 0;
const storage_memory_1 = require("@miniflare/storage-memory");
class StorageFactory {
    constructor() {
        this.storages = new Map();
    }
    storage(namespace) {
        let storage = this.storages.get(namespace);
        if (storage)
            return storage;
        this.storages.set(namespace, (storage = new storage_memory_1.MemoryStorage()));
        return storage;
    }
}
exports.StorageFactory = StorageFactory;
