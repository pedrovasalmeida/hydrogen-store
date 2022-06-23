import React, { useContext, createContext } from 'react';
export const RouteParamsContext = createContext({
    routeParams: {},
    basePath: '/',
});
export const RouteParamsProvider = ({ children, routeParams, basePath }) => {
    return (React.createElement(RouteParamsContext.Provider, { value: { routeParams, basePath } }, children));
};
export function useBasePath() {
    const router = useContext(RouteParamsContext);
    return router.basePath;
}
