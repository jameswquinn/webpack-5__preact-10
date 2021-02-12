console.log("hello world");

// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"


// /** @jsx h */
import { h, render, Fragment } from "preact";
import { addTag } from "../helper";
import { useEffect, useRef } from "preact/hooks";
import { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"
import { Router } from 'preact-router';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { format } from 'timeago.js';
import responsiveImage from './image.jpg?min=640,max=1280,steps=3';
import responsiveImageWebp from './image.jpg?min=640,max=1280,steps=3&format=webp';


import {useSpring, animated} from 'react-spring'

import './fonts'
import './styles'

const Home = () => {
    return (
        <Fragment>
            <h1>Home | James </h1>
        </Fragment>
    )
}


const App = () => {

    const refTimeago = useRef(format(1612800105910));    

    useEffect(() => {

        document.title = `"Welcome James | 💭"`;

        addTag('meta', { name: 'description', content: 'This article will explain how to add external and internal css and js files dynamically inside html head tag using javascript.Example: meta tag, javascript, css' });
        addTag('meta', { property: "og:title", content: "PreactX" });
        addTag('meta', { property: "og:type", content: "article" });
        addTag('meta', { property: "og:image", content: location.origin + responsiveImage.src })
        addTag('meta', { property: "og:url", content: location.origin })
        addTag('base', { target: "_blank", href: location.origin })
        addTag('link', { rel: "canonical", href: location.origin })  

    },[]);

    const props = useSpring({
        to: async (next, cancel) => {
          await next({opacity: 1, color: '#ffaaee'})
          await next({opacity: 0, color: 'rgb(14,26,19)'})
        },
        from: {opacity: 0, color: 'red'}
      })

    return (
        <Fragment>
            <animated.div style={props}>I will fade in and out</animated.div>
            <h1>Hello world</h1>
            <picture>
                <source data-srcset={responsiveImageWebp.srcSet} type='image/webp' />
                <img
                    data-src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
                    // width={responsiveImage.width}
                    // height={responsiveImage.height}
                    data-srcset={responsiveImage.srcSet}
                    data-sizes="100vw"
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
            </Router>
        </Fragment>
    )
};


render(<App />,document.getElementById("root"));