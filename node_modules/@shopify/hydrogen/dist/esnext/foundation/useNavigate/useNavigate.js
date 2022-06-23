import { useRouter } from '../Router/BrowserRouter.client';
import { useBasePath } from '../useRouteParams/RouteParamsProvider.client';
/**
 * The useNavigate hook imperatively navigates between routes.
 */
export function useNavigate() {
    const router = useRouter();
    const routeBasePath = useBasePath();
    return (path, options = { replace: false, reloadDocument: false }) => {
        path = buildPath(options.basePath ?? routeBasePath, path);
        const state = {
            ...options?.clientState,
            scroll: options?.scroll ?? true,
        };
        // @todo wait for RSC and then change focus for a11y?
        if (options?.replace) {
            router.history.replace(path, state);
        }
        else {
            router.history.push(path, state);
        }
    };
}
export function buildPath(basePath, path) {
    if (path.startsWith('http') || path.startsWith('//'))
        return path;
    let builtPath = path;
    if (basePath !== '/') {
        const pathFirstChar = path.charAt(0);
        const basePathLastChar = basePath.charAt(basePath.length - 1);
        builtPath =
            pathFirstChar === '/' && basePathLastChar === '/'
                ? basePath + path.substring(1)
                : basePathLastChar !== '/' && pathFirstChar !== '/'
                    ? basePath + '/' + path
                    : basePath + path;
    }
    return builtPath;
}
