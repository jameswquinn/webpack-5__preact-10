// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef, Children } from "preact/compat"
// import {Switch, Route, Router, Link, useRoute, useRouter, useLocation } from "wouter-preact";
// import makeCachedMatcher from "wouter-preact/matcher";

/** @jsx h */
import { h, Component, render, Fragment } from "preact";
import { useEffect, useLayoutEffect, useState } from 'preact/hooks'



import { Route, Router, Link, useRoute, useRouter, useLocation } from "wouter-preact";
// import Helmet from "preact-helmet";
// import Helmet from './helmetHooks';
// import { useMetaArray } from '../helper'

const useMetaArray = (_HEADATTRIBUTE) => {
  for (let _ATTRIBUTES in _HEADATTRIBUTE) {
    let el = document.createElement('meta'), _PROPERTY
    for (let _PROPERTY in _HEADATTRIBUTE[_ATTRIBUTES]) {
      el.setAttribute(_PROPERTY, _HEADATTRIBUTE[_ATTRIBUTES][_PROPERTY]);
    }
   
    // document.head.removeChild(el);
    document.head.appendChild(el);
  }
};

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
const meta = [{
  "data-preact-helmet": true,
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

const Abouts = () => {
  // const [isActive, setisActive] = useState(true);

  useLayoutEffect(() => {
    // Trigger your effect
    useMetaArray(meta)
    return () => {
      // Optional: Any cleanup code
      useMetaArray([])
    };
  }, []);
  return(
    <Fragment>
james
    </Fragment>
  )
}

const Home = () => {
  return(
    <Fragment>
home james
    </Fragment>
  )
}


function PageTitle(props) {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return <h1>{props.title}</h1>;
}

const About = () => {
  useEffect(() => {
    const meta = [{
      "data-preact-helmet": true,
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

    //   export const useMeta = (attributes) => {
    //     var el = document.createElement('meta'),
    //         attrName;
    //     for (attrName in attributes) {
    //         el.setAttribute(attrName, attributes[attrName]);
    //     }
    //     document.head.appendChild(el);
    // };


    // const useMetaArray = (metaArray) => {
    //   for (let attributes in metaArray) {
    //     console.log(metaArray[attributes])
    //     let prop = metaArray[attributes];
    //     var el = document.createElement('meta'),
    //       attrName;
    //     for (let attrName in prop) {
    //       el.setAttribute(attrName, prop[attrName]);
    //     }
    //     document.head.appendChild(el);
    //   }
    // }

    const useMetaArray = (_HEADATTRIBUTE) => {
      for (let _ATTRIBUTES in _HEADATTRIBUTE) {
        let el = document.createElement('meta'), _PROPERTY;
        for (let _PROPERTY in _HEADATTRIBUTE[_ATTRIBUTES]) {
          el.setAttribute(_PROPERTY, _HEADATTRIBUTE[_ATTRIBUTES][_PROPERTY]);
        }
        document.head.append(el);
      }
    }

    // export const useMetaArray = (metaTags) => {
    //   for (attributes in metaTags) {
    //       console.log(attrName)
    //       console.log(metaTags[attributes]);
    //       // var el = document.createElement('meta'),
    //       //     attrName;
    //       // for (attrName in metaTags[attributes]) {
    //       //     el.setAttribute(attrName, metaTags[attributes][attrName]);
    //       // }
    //       // document.head.appendChild(el);
    //   }
    // };


    useMetaArray(meta)

  }, []);
  return (
    <Fragment>
      About
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
        <Route path="/" component={Home}/>
        <Route path="/about" component={Abouts} />

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

