// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

/** @jsx h */
import { h, createContext } from "preact";
import { useCallback, useContext, useEffect, useMemo } from "preact/hooks"
import { lazy } from "preact/compat"

import { Link as WLink, Switch, useRoute, useRouter } from "wouter-preact";

const PathsContext = createContext(new Map())
const usePaths = () => useContext(PathsContext)

const LazyRoute = ({ path, factory }) => {
    const paths = usePaths()
    const [matches, params] = useRoute(path)
    const Component = useMemo(() => lazy(factory), [factory])

    useEffect(() => {
        paths.set(path, factory)

        return () => paths.delete(path)
    }, [paths, path, factory])

    return matches && < Component params = { params }
    />
}

const LazySwitch = ({ children, location }) => {
    const paths = usePaths()

    useEffect(() => {
        let kids = children && children.length ? children : [children]

        kids.forEach(
            kid => kid.props.factory && paths.set(kid.props.path, kid.props.factory)
        )

        return () =>
            kids.forEach(kid => kid.props.factory && paths.delete(kid.props.path))
    }, [children, paths])

    return <Switch children = { children }
    location = { location }
    />
}

const LinkWithPrefetch = ({ to, ...props }) => {
    const router = useRouter()
    const paths = usePaths()
    const prefetch = useCallback(() => {
        let path = Array.from(paths.keys()).find(
            pattern => router.matcher(pattern, to)[0]
        )

        if (path) {
            let fetcher = paths.get(path)

            // hack for run lazy promise
            fetcher().then(v => v)
        }
    }, [paths, router, to])

    return <WLink to = { to } {...props }
    onMouseEnter = { prefetch }
    />
}

export { LinkWithPrefetch, LazyRoute, LazySwitch }