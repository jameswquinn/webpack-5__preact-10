// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef, Children } from "preact/compat"
// import {Switch, Route, Router, Link, useRoute, useRouter, useLocation } from "wouter-preact";
// import makeCachedMatcher from "wouter-preact/matcher";

/** @jsx h */
import { h, Component, render, Fragment } from "preact";
import { useEffect, useLayoutEffect, useState, useRef, useMemo } from 'preact/hooks'
import { Route, Router, Link, useRoute, useRouter, useLocation } from "wouter-preact";

// import useDocumentTitle from './helpers/util'
import "./styles.css";
// import {addTag} from '../helper'

const meta = [{
  property: "og:image",
  content: "/og-image.jpg"
}, {
  property: "og:image:width",
  content: "1200"
}, {
  property: "og:image:height",
  content: "628"
}, {
  property: "og:title",
  content: "An awesome page"
}, {
  property: "og:description",
  content: "Everything you need to know about the topic you are looking for"
}, {
  property: "og:url",
  content: "http://example.com"
}]

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

// function useDocumentTitle() {
//   const defaultTitle = useRef(document.title);

//   useEffect(() => {
//     document.title = 'Page Title | James';
//   }, []);

  // useEffect(() => {
  //   return () => {
  //       document.title = defaultTitle.current; 
  //   };
  // }, []);
// }

function useDocumentTitle(title) {
  const defaultTitle = useRef(document.title);
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      document.title = defaultTitle.current; 
    };
  }, []);
}

const useMetaDescription = (description) => {

  // element = document.querySelector(selectors);
  // element = document.createElement(tagName[, options]);
  const defaultDescription = useRef(document.querySelector('meta[name="description"]').content);
  const defaultDescriptionOg = useRef(document.querySelector('meta[property="og:description"]').content);
  useEffect(() => {
    document.head.querySelector('[name="description"]').content = description;
    document.head.querySelector('[property="og:description"]').content = description;

    
  }, []);
  useEffect(() => {
    return () => {
      document.head.querySelector('[name="description"]').content = defaultDescription.current; 
      document.head.querySelector('[property="og:description"]').content = defaultDescriptionOg.current; 

    };
  }, []);

}

const useMetaArray = (_HEADATTRIBUTE) => {
  useEffect(() => {  
    for (let _ATTRIBUTES in _HEADATTRIBUTE) {
      console.log(_ATTRIBUTES);
      let el = document.createElement('meta'), _PROPERTY;
      for (let _PROPERTY in _HEADATTRIBUTE[_ATTRIBUTES]) {
        console.log(_PROPERTY);
        el.setAttribute(_PROPERTY, _HEADATTRIBUTE[_ATTRIBUTES][_PROPERTY]);
        console.log(_HEADATTRIBUTE[_ATTRIBUTES][_PROPERTY]);
      }
      document.head.appendChild(el);
    }
  }, [_HEADATTRIBUTE]);

  useEffect(() => {
    return () => {
      const element = document.querySelector('[property="og:description"], [property="og:title"]')
      document.head.removeChild(element);
    };
  }, []);
}


const About = () => {

  useDocumentTitle('james | is still here');
  // useMetaArray(meta);
  useMetaDescription('Hello world from james | here');
  // useEffect(() => {
  //   document.title = `"Welcome James | 💭"`;

  //   addTag('meta', { name: 'description', content: 'This article will explain how to add external and internal css and js files dynamically inside html head tag using javascript.Example: meta tag, javascript, css' });
  //   addTag('meta', { property: "og:title", content: "PreactX" });
  //   addTag('meta', { property: "og:type", content: "article" });
  //   addTag('meta', { property: "og:image", content: location.href })
  //   addTag('meta', { property: "og:url", content: location.href })
  //   addTag('base', { target: "_blank", href: location.href })
  //   addTag('link', { rel: "canonical", href: location.href })
  // }, [])

  return (
    <Fragment>
      james
    </Fragment>
  )
}

const Home = () => {
  return (
    <Fragment>
      home james
    </Fragment>
  )
}


function App() {
  return (
    <div className="App">
      <nav>
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/about">About</ActiveLink>
        <ActiveLink href="/help">Help Center</ActiveLink>
      </nav>

      <main>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />

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


render(<App />, document.getElementById("root"));

