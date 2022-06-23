import React from 'react';
import type { HydrogenRequest } from '../HydrogenRequest/HydrogenRequest.server';
import type { QueryKey } from '../../types';
declare type ServerRequestProviderProps = {
    request: HydrogenRequest;
    children: React.ReactNode;
};
export declare function ServerRequestProvider({ request, children, }: ServerRequestProviderProps): JSX.Element;
export declare function useServerRequest(): HydrogenRequest;
declare type RequestCacheResult<T> = {
    data: T;
    error?: never;
} | {
    data?: never;
    error: Response | Error;
};
/**
 * Returns data stored in the request cache.
 * It will throw the promise if data is not ready.
 */
export declare function useRequestCacheData<T>(key: QueryKey, fetcher: (request: HydrogenRequest) => T | Promise<T>): RequestCacheResult<T>;
export declare function preloadRequestCacheData(request: HydrogenRequest): void;
export {};
