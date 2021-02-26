// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

/** @jsx h */
import { h, render, Fragment } from "preact";
import { useEffect, useRef } from "preact/hooks"
import { Redirect, Switch, Route, Router, Link, useRoute } from "wouter-preact";
import lozad from './helper/lozad';
import { format } from 'timeago.js';
// import Helmet from "preact-helmet";
import { addTag } from "../helper";
import {useTitle} from '../hooks/useTitle';
import { useFavicon } from '../hooks/useFavicon';
import { useDescription } from '../hooks/useDescription'


import "./styles.css";
import chungHei from './img/chung-hei.jpg?min=480,max=1024,steps=3';
import jerryZhang from './img/jerry-zhang.jpg?min=480,max=1024,steps=3';


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

// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
const currentLocation = () => {
  return window.location.hash.replace(/^#/, "") || "/";
};

const navigate = (to) => (window.location.hash = to);

const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLocation());

  useEffect(() => {
    // this function is called whenever the hash changes
    const handler = () => setLoc(currentLocation());

    // subscribe to hash changes
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return [loc, navigate];
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
      <h1>Hello world</h1>

      <img data-srcset={chungHei.srcSet}
        data-src={chungHei.src}
        style={{
          display: "block",
          height: "640px",
          width: "640px",
          objectFit: "contain"
        }}
        data-use-lozad
      />
            <img data-srcset={jerryZhang.srcSet}
        data-src={jerryZhang.src}
        style={{
          display: "block",
          height: "640px",
          width: "640px",
          objectFit: "cover"
        }}
        data-use-lozad
      />




    </div>
  );
}

function App() {
  useTitle('Hello world! | Hay James I am here [Hay still here]');
  // useFavicon('https://www.google.com/favicon.ico');
   useFavicon('../hooks/favicon/Flat_tick_icon.svg');

  useEffect(() => {
    document.title = `"Welcome James | 💭"`;

    addTag('meta', { name: 'description', content: 'This article will explain how to add external and internal css and js files dynamically inside html head tag using javascript.Example: meta tag, javascript, css' });
    addTag('meta', { property: "og:title", content: "PreactX" });
    addTag('meta', { property: "og:type", content: "article" });
    addTag('meta', { property: "og:image", content: location.href + jerryZhang.src })
    addTag('meta', { property: "og:url", content: location.href })
    addTag('base', { target: "_blank", href: location.href })
    addTag('link', { rel: "canonical", href: location.href })
  }, [])
  const refTimeago = useRef(format(1613942894028));

  return (
    <Fragment>
      {/* <Helmet title="My Title" /> */}

      <Router>
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
