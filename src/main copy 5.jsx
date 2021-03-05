import {
  h,
  render
} from "preact";
import React from "preact/compat";
import { useEffect} from 'preact/hooks'

import { pathToRegexp } from "path-to-regexp";

import { Router, Switch, Route, Link, useRoute } from "wouter-preact";
import makeCachedMatcher from "wouter-preact/matcher";

import Portal from 'preact-portal';
import "./styles.css";
import { Fragment } from "../node_modules/preact/src/index";
import { addTag as useTag } from "../helper";

/*
 * This function specifies how strings like /app/:users/:items* are
 * transformed into regular expressions.
 *
 * Note that it is just a wrapper around `pathToRegexp`, which uses a
 * slighly different convetion of returning the array of keys.
 *
 * @param {string} path — a path like "/:foo/:bar"
 * @return {{ keys: [], regexp: RegExp }}
 */
const convertPathToRegexp = (path) => {
  let keys = [];

  // we use original pathToRegexp package here with keys
  const regexp = pathToRegexp(path, keys);
  return { keys, regexp };
};

// signature of the matcher fn: (pattern, path) => [success, params]
const customMatcher = makeCachedMatcher(convertPathToRegexp);

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

function Home() {
  useEffect(() => {
    document.title = `"Welcome James | 💭"`;

    useTag('meta', { name: 'description', content: 'This article will explain how to add external and internal css and js files dynamically inside html head tag using javascript.Example: meta tag, javascript, css' });
    useTag('meta', { property: "og:title", content: "PreactX" });
    useTag('meta', { property: "og:type", content: "article" });
    useTag('meta', { property: "og:image", content: location.href })
    useTag('meta', { property: "og:url", content: location.href })
    useTag('base', { target: "_blank", href: location.href })
    useTag('link', { rel: "canonical", href: location.href })
}, [])
  return (
    <Fragment>
      Welcome!
    </Fragment>
  )
}

function _404() {
  document.title="James | Hay from 404"
  return(
    <center>
    <b>404:</b> Sorry, this page isn't ready yet!
  </center>
  )
}


function App() {
  return (
    <Router matcher={customMatcher}>
      <div className="App">
        <nav>
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/for-sale/sofa">For Sale</ActiveLink>
          <ActiveLink href="/sold-items/chair">Sold Items</ActiveLink>
          <ActiveLink href="/unsold-items/desk">Unsold Items</ActiveLink>
          <ActiveLink href="/etc/faq">FAQ</ActiveLink>
        </nav>

        <main>
          <Switch>
            <Route path="/" component={Home} />
            
            

            <Route path="/(for-sale|sold-items|unsold-items)/:item">
              {(params) => (
                <article>
                  <h1>{params.item.toUpperCase()}: Product Info</h1>
                  <p>
                    Injection stdio.h wannabee hexadecimal packet mainframe
                    script kiddies thread new gnu win emacs for fopen if cat
                    Leslie Lamport. Big-endian over clock hello world Starcraft
                    firewall machine code d00dz alloc perl. Flush class deadlock
                    man pages tera unix frack semaphore long server rsa suitably
                    small values.
                  </p>

                  <p>
                    Mega wabbit firewall frack fork grep gobble false stdio.h
                    mainframe fail endif less Starcraft tera gcc blob back door
                    void float lib ack. Alloc try catch bypass null new access
                    int double wannabee stack mutex fatal dereference nak bit vi
                    crack semaphore. Bin continue gnu bytes case salt packet
                    sniffer char private bin infinite loop foad.
                  </p>
                </article>
              )}
            </Route>
            <Route path="/:anything*" component={_404} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);