// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

/** @jsx h */
import {
    h,
    render
} from "preact";

import {
    Switch,
    Route,
    Router,
    Link,
    useRoute
} from "wouter-preact";
import makeMatcher from "wouter-preact/matcher";

import "./styles.css";

const ActiveLink = (props) => {
    const [isActive] = useRoute(props.href);
    return (
        <Link {...props}>
            <a className={isActive ? "active" : ""} href={props.href}>
                {props.children}
            </a>
        </Link>
    );
};

/*
 * A custom routing matcher function that supports multipath routes
 */
const defaultMatcher = makeMatcher();

const multipathMatcher = (patterns, path) => {
    for (let pattern of [patterns].flat()) {
        const [match, params] = defaultMatcher(pattern, path);
        if (match) return [match, params];
    }

    return [false, null];
};

function App() {
    return (
        <Router matcher={multipathMatcher}>
            <div className="App">
                <nav>
                    <ActiveLink href="/">Home</ActiveLink>
                    <ActiveLink href="/about">What is Wouter</ActiveLink>
                    <ActiveLink href="/faq">FAQ</ActiveLink>
                </nav>

                <main>
                    <Switch>
                        <Route path={["/", "/home"]}>
                            <p>
                                Hi! This is a multipath matcher example. In wouter you can
                  customize the default matcher function in the{" "}
                                <code>{"<Router />"}</code> component
                </p>
                            <p>
                                This page can also be accessible via{" "}
                                <Link to="/home">this link</Link>
                            </p>
                        </Route>
                        <Route path="/about">
                            <article>
                                <h1>Wouter API</h1>

                                <p>
                                    A tiny routing solution for modern React apps that relies on
                                    Hooks. A router you wanted so bad in your project!
                  </p>
                                <p>
                                    Wouter comes with two kinds of APIs: low-level{" "}
                                    <a
                                        href="https://reactjs.org/docs/hooks-intro.html"
                                        rel="nofollow"
                                    >
                                        React Hooks
                    </a>{" "}
                    API and more traditional component-based API similar to React
                    Router's one.
                  </p>
                                <p>
                                    <ul>
                                        <li>
                                            Zero dependency, only <strong>1151 B</strong> gzipped vs
                        17KB{" "}
                                            <a href="https://github.com/ReactTraining/react-router">
                                                React Router
                        </a>
                        .
                      </li>
                                        <li>
                                            Supports both <strong>React</strong> and{" "}
                                            <strong>
                                                <a href="https://preactjs.com/" rel="nofollow">
                                                    Preact
                          </a>
                                            </strong>
                        ! Read{" "}
                                            <em>
                                                <a href="#preact-support">"Preact support" section</a>
                                            </em>{" "}
                        for more details.
                      </li>
                                        <li>
                                            No top-level <code>&lt;Router /&gt;</code> component, it
                        is <strong>fully optional</strong>.
                      </li>
                                        <li>
                                            Mimics{" "}
                                            <a href="https://github.com/ReactTraining/react-router">
                                                React Router
                        </a>
                        's best practices by providing familiar
                        <strong>
                                                <a href="#route-pathpattern-">
                                                    <code>Route</code>
                                                </a>
                                            </strong>
                        ,{" "}
                                            <strong>
                                                <a href="#link-hrefpath-">
                                                    <code>Link</code>
                                                </a>
                                            </strong>
                        ,{" "}
                                            <strong>
                                                <a href="#switch-">
                                                    <code>Switch</code>
                                                </a>
                                            </strong>{" "}
                        and{" "}
                                            <strong>
                                                <a href="#redirect-topath-">
                                                    <code>Redirect</code>
                                                </a>
                                            </strong>{" "}
                        components.
                      </li>
                                        <li>
                                            Has hook-based API for more granular control over routing
                        (like animations):{" "}
                                            <strong>
                                                <a href="#uselocation-hook-working-with-the-history">
                                                    <code>useLocation</code>
                                                </a>
                                            </strong>
                        ,{" "}
                                            <strong>
                                                <a href="#useroute-the-power-of-hooks">
                                                    <code>useRoute</code>
                                                </a>
                                            </strong>{" "}
                        and{" "}
                                            <strong>
                                                <a href="#userouter-accessing-the-router-object">
                                                    <code>useRouter</code>
                                                </a>
                                            </strong>
                        .
                      </li>
                                    </ul>
                                </p>
                            </article>
                        </Route>
                        <Route path="/:anything*">
                            <center>
                                <b>404:</b> Sorry, this page isn't ready yet!
                </center>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

render(<App />, document.getElementById("root"));
