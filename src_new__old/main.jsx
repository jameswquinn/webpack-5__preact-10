console.log("hello world");

// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

/** @jsx h */
import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
import { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"


// /** @jsx h */
import { h, render, Fragment } from "preact";
import { addTag } from "../helper";
import { useEffect, useRef } from "preact/hooks";
import { Router } from "preact-router";
import { Link } from 'preact-router/match';
import AsyncRoute from 'preact-async-route';



import 'lazysizes';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import { format } from 'timeago.js';
import responsiveImage from './image.jpg?min=640,max=1280,steps=3';
import responsiveImageWebp from './image.jpg?min=640,max=1280,steps=3&format=webp';


import './fonts'
import './styles'
const example = [{
    "property": "og:image",
    "content": "/og-image.jpg"
}, {
    "property": "og:image:width",
    "content": "1200"
}, {
    "property": "og:image:height",
    "content": "628"
}, {
    "property": "og:title",
    "content": "An awesome page"
}, {
    "property": "og:description",
    "content": "Everything you need to know about the topic you are looking for"
}, {
    "property": "og:url",
    "content": "http://example.com"
}]


const About = () => {
    useEffect(() => {
        document.title = `"Welcome James | 💭"`;

    }, [])
    return (
        <Fragment>
            <h1>About | James </h1>
        </Fragment>
    )
}


const Home = () => {
    useEffect(() => {
        document.title = `"Welcome James | 💭"`;

        addTag('meta', { name: 'description', content: 'This article will explain how to add external and internal css and js files dynamically inside html head tag using javascript.Example: meta tag, javascript, css' });
        addTag('meta', { property: "og:title", content: "PreactX" });
        addTag('meta', { property: "og:type", content: "article" });
        addTag('meta', { property: "og:image", content: location.href + responsiveImage.src })
        addTag('meta', { property: "og:url", content: location.href })
        addTag('base', { target: "_blank", href: location.href })
        addTag('link', { rel: "canonical", href: location.href })
    }, [])
    return (
        <Fragment>
            <h1>Home | James </h1>
        </Fragment>
    )
}

const App = () => {
 

    const refTimeago = useRef(format(1612800105910));

    useEffect(() => { }, []);

    return (

        <Fragment>
            <h1>Hello world</h1>
            <picture>
                <source data-srcset={responsiveImageWebp.srcSet} type='image/webp' />
                <source data-srcset={responsiveImage.srcSet} type='image/jpeg' />
                <img
                    src={responsiveImage.src}
                    // window.innerWidth
                    width={window.innerWidth}
                    height={(responsiveImage.height / responsiveImage.width) * window.innerWidth}
                    alt='artist'
                    class="lazyload"
                />
            </picture>
            <i>
                Updated {refTimeago.current}
            </i>

            Hello from :root font is?




            <Router>
                <Home path='/' />
                <About path='/about' />
            </Router>
        </Fragment>
    )
};


render(<App />, document.getElementById("root"));