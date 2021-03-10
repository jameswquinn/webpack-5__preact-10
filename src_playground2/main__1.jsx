/** @jsx h */
import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

import { Redirect, Switch, Route, Router, Link, useRoute } from "wouter-preact";

// import "./styles.css";
const About = lazy(() => import('./routes/about'));
// const _404 = lazy(() => import('./routes/404'));
import _404 from './routes/404'
// import About from './routes/about'


const ActiveLink = props => {
  const [isActive] = useRoute(props.href);
  return (
    <Link {...props}>
      <a className={isActive ? "active" : ""}>{props.children}</a>
    </Link>
  );
};
 
const App = () => {
  return(
   
<Router>
<nav>
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/404">404</ActiveLink>
          {/* <ActiveLink href="/lodash">lodash</ActiveLink>
          <ActiveLink href="/antd">antd</ActiveLink> */}
        </nav>
    {/* <About /> */}
    <Suspense fallback={<div>loading...</div>}>
    <Switch>
    <Route path="/" component={About} />
    <Route path="/404" component={_404} />
    {/* <Route path="/lodash" component={lazy(() => import('./routes/lodash'))} />
    <Route path="/antd" component={lazy(() => import('./routes/antd'))} /> */}
    </Switch>
    </Suspense>
    </Router>
  

  )
}

render(<App />, document.getElementById("root"));
