/**
 * This is a limited implementation of an in-memory cache.
 * It only supports the `cache-control` header.
 * It does NOT support `age` or `expires` headers.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Cache
 */
export class InMemoryCache {
    #store;
    constructor() {
        this.#store = new Map();
    }
    add(request) {
        throw new Error('Method not implemented. Use `put` instead.');
    }
    addAll(requests) {
        throw new Error('Method not implemented. Use `put` instead.');
    }
    matchAll(request, options) {
        throw new Error('Method not implemented. Use `match` instead.');
    }
    async put(request, response) {
        if (request.method !== 'GET') {
            throw new TypeError('Cannot cache response to non-GET request.');
        }
        if (response.status === 206) {
            throw new TypeError('Cannot cache response to a range request (206 Partial Content).');
        }
        if (response.headers.get('vary')?.includes('*')) {
            throw new TypeError("Cannot cache response with 'Vary: *' header.");
        }
        this.#store.set(request.url, {
            body: new Uint8Array(await response.arrayBuffer()),
            status: response.status,
            headers: [...response.headers],
            timestamp: Date.now(),
        });
    }
    async match(request) {
        if (request.method !== 'GET')
            return;
        const match = this.#store.get(request.url);
        if (!match) {
            return;
        }
        const { body, timestamp, ...metadata } = match;
        const headers = new Headers(metadata.headers);
        const cacheControl = headers.get('cache-control') || '';
        const maxAge = parseInt(cacheControl.match(/max-age=(\d+)/)?.[1] || '0', 10);
        const swr = parseInt(cacheControl.match(/stale-while-revalidate=(\d+)/)?.[1] || '0', 10);
        const age = (Date.now() - timestamp) / 1000;
        const isMiss = age > maxAge + swr;
        if (isMiss) {
            this.#store.delete(request.url);
            return;
        }
        const isStale = age > maxAge;
        headers.set('cache', isStale ? 'STALE' : 'HIT');
        headers.set('date', new Date(timestamp).toUTCString());
        return new Response(body, {
            status: metadata.status ?? 200,
            headers,
        });
    }
    async delete(request) {
        if (this.#store.has(request.url)) {
            this.#store.delete(request.url);
            return true;
        }
        return false;
    }
    keys(request) {
        const cacheKeys = [];
        for (const url of this.#store.keys()) {
            if (!request || request.url === url) {
                cacheKeys.push(new Request(url));
            }
        }
        return Promise.resolve(cacheKeys);
    }
}
