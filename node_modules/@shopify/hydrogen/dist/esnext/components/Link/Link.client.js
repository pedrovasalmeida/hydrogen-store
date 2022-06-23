import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from '../../foundation/Router/BrowserRouter.client';
import { createPath } from 'history';
import { buildPath, useNavigate } from '../../foundation/useNavigate/useNavigate';
import { RSC_PATHNAME } from '../../constants';
import { useInternalServerProps } from '../../foundation/useServerProps/use-server-props';
import { useBasePath } from '../../foundation/useRouteParams/RouteParamsProvider.client';
/**
 * The `Link` component is used to navigate between routes. Because it renders an underlying `<a>` element, all
 * properties available to the `<a>` element are also available to the `Link` component.
 * For more information, refer to the [`<a>` element documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes).
 */
export const Link = React.forwardRef(function Link(props, ref) {
    const navigate = useNavigate();
    const location = useLocation();
    const [_, startTransition] = React.useTransition();
    const routeBasePath = useBasePath();
    /**
     * Inspired by Remix's Link component
     */
    const [shouldPrefetch, setShouldPrefetch] = useState(false);
    const [maybePrefetch, setMaybePrefetch] = useState(false);
    const { reloadDocument, target, replace: _replace, onClick, clientState, prefetch = true, scroll = true, } = props;
    const to = buildPath(props.basePath ?? routeBasePath, props.to);
    const internalClick = useCallback((e) => {
        if (onClick)
            onClick(e);
        if (!reloadDocument && // do regular browser stuff
            e.button === 0 && // Ignore everything but left clicks
            (!target || target === '_self') && // Let browser handle "target=_blank"
            !isModifiedEvent(e) // Ignore modifier key clicks
        ) {
            e.preventDefault();
            // If the URL hasn't changed, the regular <a> will do a replace
            const replace = !!_replace || createPath(location) === createPath({ pathname: to });
            navigate(to, {
                replace,
                scroll,
                clientState,
                basePath: '/', // path was already resolved with the base
            });
        }
    }, [
        onClick,
        reloadDocument,
        target,
        _replace,
        location,
        to,
        navigate,
        clientState,
        scroll,
    ]);
    const signalPrefetchIntent = () => {
        /**
         * startTransition to yield to more important updates
         */
        startTransition(() => {
            if (prefetch && !!to) {
                setMaybePrefetch(true);
            }
        });
    };
    const cancelPrefetchIntent = () => {
        /**
         * startTransition to yield to more important updates
         */
        startTransition(() => {
            if (prefetch) {
                setMaybePrefetch(false);
            }
        });
    };
    /**
     * Wrapping `maybePrefetch` inside useEffect allows the user to quickly graze over
     * a link without triggering a prefetch.
     */
    useEffect(() => {
        if (maybePrefetch) {
            const id = setTimeout(() => {
                setShouldPrefetch(true);
            }, 100);
            return () => {
                clearTimeout(id);
            };
        }
    }, [maybePrefetch]);
    const onMouseEnter = composeEventHandlers(props.onMouseEnter, signalPrefetchIntent);
    const onMouseLeave = composeEventHandlers(props.onMouseLeave, cancelPrefetchIntent);
    const onFocus = composeEventHandlers(props.onFocus, signalPrefetchIntent);
    const onBlur = composeEventHandlers(props.onBlur, cancelPrefetchIntent);
    const onTouchStart = composeEventHandlers(props.onTouchStart, signalPrefetchIntent);
    return (React.createElement(React.Fragment, null,
        React.createElement("a", { ...without(props, [
                'to',
                'replace',
                'clientState',
                'reloadDocument',
                'prefetch',
                'scroll',
            ]), ref: ref, rel: props.rel ??
                (to.startsWith('http') || to.startsWith('//')
                    ? 'noreferrer noopener'
                    : undefined), onClick: internalClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onFocus: onFocus, onBlur: onBlur, onTouchStart: onTouchStart, href: to }, props.children),
        shouldPrefetch && React.createElement(Prefetch, { pathname: to })));
});
function Prefetch({ pathname }) {
    const { getProposedLocationServerProps } = useInternalServerProps();
    const location = useLocation();
    const newPath = createPath({ pathname });
    if (pathname.startsWith('http') || newPath === createPath(location)) {
        return null;
    }
    const newLocation = new URL(newPath, window.location.href);
    const proposedServerState = getProposedLocationServerProps({
        pathname: newLocation.pathname,
        search: newLocation.search,
    });
    const href = `${RSC_PATHNAME}?state=` +
        encodeURIComponent(JSON.stringify(proposedServerState));
    return React.createElement("link", { rel: "prefetch", as: "fetch", href: href });
}
/**
 * Credit: Remix's <Link> component.
 */
export function composeEventHandlers(theirHandler, ourHandler) {
    return (event) => {
        theirHandler?.(event);
        if (!event.defaultPrevented) {
            ourHandler(event);
        }
    };
}
function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function without(obj, props) {
    const newObj = {};
    for (const key of Object.keys(obj)) {
        if (!props.includes(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
