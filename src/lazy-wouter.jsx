/** @jsx h */
import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

  
  import { Router as WRouter, Link as WLink, useRoute } from "wouter-preact";
  
  const PathsContext = createContext(new Map());
  const usePaths = () => useContext(PathsContext);
  
  const Router = ({ children, fallback }) => {
    return (
      <Suspense fallback={fallback}>
        <WRouter>{children}</WRouter>
      </Suspense>
    );
  };
  
  const Route = ({ path, factory }) => {
    const paths = usePaths();
    const [matches] = useRoute(path);
    const Component = useMemo(() => lazy(factory), [factory]);
  
    useEffect(() => {
      paths.set(path, factory);
  
      return () => paths.delete(path);
    }, [paths, path, factory]);
    
  
    return matches && <Component />;
  };
  
  const Link = ({ to, ...props }) => {
    const paths = usePaths();
    const prefetch = useCallback(() => {
      console.log('try prefetch route: ', to)
  
      if (paths.has(to)) {
        let fetcher = paths.get(to);
  
        // hack for run lazy promise
        fetcher().then(v => v);
      }
    }, [paths, to]);
  
    return <WLink to={to} {...props} onMouseEnter={prefetch} />;
  };
  
  export { Link, Route, Router };