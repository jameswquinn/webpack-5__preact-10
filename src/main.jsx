console.log("hello world");

// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"


/** @jsx h */
import { h, render, Fragment } from "preact";
import Helmet from "preact-helmet";

import responsiveImage from './image.jpg?min=375,max=1024,steps=3';
import responsiveImageWebp from './image.jpg?min=375,max=1024,steps=3&format=webp';




import './styles'


const App = () => {
    return (
        <Fragment>
            <Helmet
                title="My Title"
                meta={[
                    { name: "description", content: "Helmet application" }
                ]}
            />
            <h1>Hello world</h1>
            <picture>
                <source srcSet={responsiveImageWebp.srcSet} type='image/webp' />
                <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
                    srcSet={responsiveImage.srcSet}
                    data-sizes="auto"
                    alt='artist'
                    loading="lazy"
                />
            </picture>
        </Fragment>
    )
};



render(<App />, document.body, document.body.querySelector("#root"));