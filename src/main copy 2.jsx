// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

/** @jsx h */
import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"


import { Redirect, Switch, Route, Link, useRoute, Router } from "wouter-preact";

// import About from './routes/about'
const About = lazy(() => import('./routes/about'));
// import LandingPage from './components/landingPage'
import "./styles.css";
import { addTag } from "../helper";



const LandingPage = props => {
  return (
      <Fragment>
          <h1>Landing Page</h1>
          {/* <button onClick={() => {
              props.history.push('/about')
          }}>
              Login
          </button> */}
      </Fragment>
  )
}

// returns the current hash location (excluding the '#' symbol)
const currentLoc = () => window.location.hash.replace("#", "") || "/";

const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLoc());

  useEffect(() => {
    const handler = () => setLoc(currentLoc());

    // subscribe on hash changes
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback(to => (window.location.hash = to), []);
  return [loc, navigate];
};

const ActiveLink = props => {
  const [isActive] = useRoute(props.href);
  return (
    <Link {...props}>
      <a className={isActive ? "active" : ""}>{props.children}</a>
    </Link>
  );
};
const isAuth = true

function isLogin() {
  return(
    <Fragment>
    <h1>Login in successful</h1>
    <button onClick={() => {
      props.history.push('/about')
  }}>
      Login
  </button>
  </Fragment>
  )
}

function App() {
    useEffect(() => {
        document.title = `"Welcome James | 💭"`;
    
        addTag('meta', { name: 'description', content: 'This article will explain how to add external and internal css and js files dynamically inside html head tag using javascript.Example: meta tag, javascript, css' });
        addTag('meta', { property: "og:title", content: "PreactX" });
        addTag('meta', { property: "og:type", content: "article" });
        addTag('meta', { property: "og:image", content: location.href })
        addTag('meta', { property: "og:url", content: location.href })
        addTag('base', { target: "_blank", href: location.href })
        addTag('link', { rel: "canonical", href: location.href })
      }, [])
  return (

    <Router hook={useHashLocation}>
      <div className="App">
        <nav>
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/about">What is Wouter</ActiveLink>
          <ActiveLink href="/faq">FAQ</ActiveLink>
          <ActiveLink href="/info">More Info (redirect)</ActiveLink>
          <ActiveLink href="/landingpage">LandingPage</ActiveLink>
        </nav>

        <main>
  
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
 
            <Route path="/info" children={isAuth ? isLogin : <Redirect to="/about" />} />
             
          
            <Route path="/">This example uses hash-based routing.</Route>
            <Route path="/about" component={About} />
            <Route path="/about" component={About} />
            <Route path="/:anything*">
              <center>
                <b>404:</b> Sorry, this page isn't ready yet!
              </center>
            </Route>
            <Route path="/landingpage" component={LandingPage} />
            
          </Switch>
          </Suspense>
        </main>
      </div>
    </Router>


  );
}

render(<App />, document.getElementById("root"));
