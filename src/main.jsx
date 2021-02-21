// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

/** @jsx h */
import { h, render, Fragment } from "preact";
import { useEffect, useRef } from "preact/hooks"
import { Redirect, Switch, Route, Router, Link, useRoute } from "wouter-preact";
import lozad from "lozad";
import { format } from 'timeago.js';
// import Helmet from "preact-helmet";


import "./styles.css";


const ActiveLink = (props) => {
  const [isActive] = useRoute(props.href);
  return (
    <Link {...props}>
      <a href="/" className={isActive ? "active" : ""}>
        {props.children}
      </a>
    </Link>
  );
};


const About = () => {
  const { observe } = lozad("[data-use-lozad]", {
    loaded: el => {
      el.classList.add("fade");
    }
  });

  useEffect(() => {
    observe();
  }, [observe]);

  return (
    <div>
      <h1 style={{ marginBottom: "200vh" }}>Scroll down!</h1>


      {Array.from(Array(100)).map((_, i) => (
        <img
          key={i}
          alt={``}
          style={{
            display: "block",
            height: "640px",
            width: "640px"
          }}
          data-use-lozad
          data-src={`https://picsum.photos/seed/${Math.random()}/300`}
        />
      ))}
    </div>
  );
}

function App() {
  const refTimeago = useRef(format(1613942894028));

    return (
      <Fragment>
        {/* <Helmet title="My Title" /> */}
     
      <Router base="/app">
        <Route path="~/" children={<Redirect to="/" />} />
  
     <h1>James | Hay  Updated {refTimeago.current}</h1>
 
          <nav>
            <ActiveLink href="/">Home</ActiveLink>
            <ActiveLink href="/about">What is Wouter</ActiveLink>
            <ActiveLink href="/faq">FAQ</ActiveLink>
            <ActiveLink href="/info">More Info (redirect)</ActiveLink>
          </nav>
  
          <main>
            <Switch>
              <Route path="/info">
                <Redirect to="/about" />
              </Route>
              <Route path="/">Wouter + Preact = ♡</Route>
              <Route path="/about" component={About} />

 
              <Route path="/:anything*">
                <center>
                  <b>404:</b> Sorry, this page isn't ready yet!
                </center>
              </Route>
            </Switch>
          </main>

      </Router>
      </Fragment>
    );
  }


const rootElement = document.getElementById("root");
render(<App />, rootElement);
