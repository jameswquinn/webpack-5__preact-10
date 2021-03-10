// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef, Children } from "preact/compat"
// import {Switch, Route, Router, Link, useRoute, useRouter, useLocation } from "wouter-preact";
// import makeCachedMatcher from "wouter-preact/matcher";

/** @jsx h */
import { h, Component, render, Fragment } from "preact";
import { useEffect, useLayoutEffect, useState } from 'preact/hooks'



import { Route, Router, Link as NavLink, useRoute, useRouter, useLocation } from "wouter-preact";
import { HeadProvider, Title, Link, Meta } from 'react-head';
// import ScriptJsonLD from '@s-ui/react-script-json-ld'
// import { Person } from "schema-dts";
// import { jsonLdScriptProps } from "react-schemaorg";
// import Head from "next/head";
// import Head from '../public/head/Head'
// import CreateHead from '../public/head/HelperComponent'


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
        <NavLink {...props}>
            <a className={isActive ? "active" : ""} href={props.href}>
                {props.children}
            </a>
        </NavLink>
    );
};


const Home = () => {
    return (
        <Fragment>
            home james
        </Fragment>
    )
}

// const autoDealerStructuredData = {
//     '@context': 'http://schema.org',
//     '@type': 'AutoDealer',
//     name: 'Dealer name',
//     address: {
//       '@type': 'PostalAddress',
//       streetAddress: 'Avda. Maresme, 133',
//       postalCode: '08302',
//       addressLocality: 'Mataró'
//     },
//     image:
//       'https://a.ccdn.es/coches/store_images_profesionales/123456_13032018103554.jpg',
//     telephone: ['123456789'],
//     geo: {
//       '@type': 'GeoCoordinates',
//       latitude: '41.53194',
//       longitude: '2.442895'
//     }
//   }


const About = ({
    title = "Jmaes | No page title",
    description = "Page without description",
    image = "http://defaultimage.com",
    url = ""
  }) => {
    return (
        <HeadProvider>
            <Meta property="og:title" content={title} />
            <Meta property="og:url" content={url} />
            <Meta property="og:image" content={image} />
            <Meta property="og:description" content={description} />
            <Meta property="og:type" content="article" />
            <Meta name="twitter:card" content={image} />
            <Meta name="twitter:title" content={title} />
            <Meta name="twitter:description" content={description} />
            <Meta name="twitter:image" content={image} />
            <Meta name="description" content={description} />
            <Title>{title}</Title>
            <Meta name="description" content={description} />
      About
        </HeadProvider>
    )
}



// const CreateHead = ({
//     title = "No page title",
//     description = "Page without description",
//     image = "http://defaultimage.com",
//     url = ""
//   }) => {
//     return (
//             <Head>
//                 <meta property="og:title" content={title} />
//                 <meta property="og:url" content={url} />
//                 <meta property="og:image" content={image} />
//                 <meta property="og:description" content={description} />
//                 <meta property="og:type" content="article" />
//                 <meta name="twitter:card" content={image} />
//                 <meta name="twitter:title" content={title} />
//                 <meta name="twitter:description" content={description} />
//                 <meta name="twitter:image" content={image} />
//                 <meta name="description" content={description} />
//                 <title>{title}</title>
//                 <meta name="description" content={description} />
//             </Head>
//     )
// }


// const Abouts = () => {
//     return(
//         <Fragment>
//             <CreateHead title="My page title | James" description="This page is super important" url={location.href} image="https://heikole-art.net/wp-content/uploads/2020/05/5D4_5892.jpg" />
//             from nested about
//         </Fragment>
//     )
// }


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
                                <NavLink href="/topics">Topics</NavLink>
                            </li>

                            <li>
                                <NavLink href="/how-to">How to use?</NavLink>
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

