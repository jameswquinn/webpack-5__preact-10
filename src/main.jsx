console.log("hello world");

// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"


/** @jsx h */
import { h, render, Fragment } from "preact";

import responsiveImage from './image.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048';
import responsiveImageWebp from './image.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=webp';






import './styles'


const App = () => {
    return (
        <Fragment>
            <h1>Hello world</h1>
            <picture>
                <source srcSet={responsiveImageWebp.srcSet} type='image/webp' />
                <img
                    src={responsiveImage.src}
                    srcSet={responsiveImage.srcSet}
                    sizes='(min-width: 1024px) 1024px, 100vw'
                    loading="lazy"
                />
            </picture>
        </Fragment>
    )
};



render(<App />, document.body, document.body.querySelector("#root"));