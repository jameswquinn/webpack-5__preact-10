// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"


/** @jsx h */
import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

import { Redirect, Switch, Route, Router, Link, useRoute, Link, useRouter, useLocation } from "wouter-preact";
import Helmet from "preact-helmet";
import "./styles.css";

const Scope = props => {
  const router = useRouter();
  const [parentLocation] = useLocation();

  const nestedBase = `${router.base}${props.base}`;

  // don't render anything outside of the scope
  if (!parentLocation.startsWith(nestedBase)) return null;

  // we need key to make sure the router will remount if the base changes
  return (
    <Router base={nestedBase} key={nestedBase}>
      {props.children}
    </Router>
  );
};

const CurrentLoc = () => useLocation()[0];

const ActiveLink = props => {
  const [isActive] = useRoute(props.href);
  return (
    <Link {...props}>
      <a className={isActive ? "active" : ""} href={props.href}>
        {props.children}
      </a>
    </Link>
  );
};

function App() {
  return (
    <div className="App">
      <Helmet
                title="My Title"
                titleTemplate="MySite.com - %s"
                defaultTitle="My Default Title"
                titleAttributes={{itemprop: "name", lang: "en"}}
                base={{target: "_blank", href: "http://mysite.com/"}}
                meta={[
                    {name: "description", content: "Helmet application"},
                    {property: "og:type", content: "article"}
                ]}

                script={[
                    {src: "http://include.com/pathtojs.js", type: "text/javascript"},
                    {type: "application/ld+json", innerHTML: `{ "@context": "http://schema.org" }`}
                ]}


          
            />
      <nav>
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/about">About</ActiveLink>
        <ActiveLink href="/help">Help Center</ActiveLink>
      </nav>

      <main>
        <Route path="/">Welcome!</Route>
        <Route path="/about">About Us</Route>

        <Scope base="/help">
          <div>
            These are nested routes. Relative location: <CurrentLoc />
            <ul>
              <li>
                <Link href="/topics">Topics</Link>
              </li>

              <li>
                <Link href="/how-to">How to use?</Link>
              </li>
            </ul>
          </div>
          <Route path="/topics">
            <h1>Topics</h1>
            <p> To be announced...</p>
          </Route>
          <Route path="/how-to">
            <article>
              <h1>How it all started?</h1>
              <p>
                Injection stdio.h wannabee hexadecimal packet mainframe script
                kiddies thread new gnu win emacs for fopen if cat Leslie
                Lamport. Big-endian over clock hello world Starcraft firewall
                machine code d00dz alloc perl. Flush class deadlock man pages
                tera unix frack semaphore long server rsa suitably small values.
              </p>

              <p>
                Mega wabbit firewall frack fork grep gobble false stdio.h
                mainframe fail endif less Starcraft tera gcc blob back door void
                float lib ack. Alloc try catch bypass null new access int double
                wannabee stack mutex fatal dereference nak bit vi crack
                semaphore. Bin continue gnu bytes case salt packet sniffer char
                private bin infinite loop foad.
              </p>
            </article>
          </Route>
        </Scope>
      </main>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);