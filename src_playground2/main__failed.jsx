// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

/** @jsx h */
import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
import React, { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"



import { Redirect, Switch, Route, Link, useRoute, Router } from "wouter-preact";




import './app.css'


c

function App() {
  return (
    <Router>
      <section>
        <nav>
          <Link to='/jquery'>jquery</Link>
          <Link to='/lodash'>lodash</Link>
          <Link to='/antd'>antd</Link>
          <Link to='/another/path'>another</Link>
        </nav>

        <main>
          <center>
            <Suspense fallback='loading...'>
              <Switch>
                <Route path='/'>
                  <h1>Code splitting example</h1>

                  <p>wouter + suspense = ❤️</p>
                </Route>
                <Route path="/about" component={lazy(() => import('./routes/about'))} />
                {/* <Route path="/lodash" component={lazy(() => import('./routes/lodash'))} />
                <Route path="/antd" component={lazy(() => import('./routes/antd'))} />
                <Route path="/404" component={lazy(() => import('./routes/404'))} /> */}
              </Switch>
            </Suspense>
          </center>
        </main>
      </section>
    </Router>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)