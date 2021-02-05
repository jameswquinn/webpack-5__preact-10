console.log("hello world");

// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"


/** @jsx h */
import { h, render, Fragment } from "preact";






import './styles'


const App = () => {
    return(
        <Fragment>
            <h1>Hello world</h1>
        </Fragment>
    )
};



render( <App/> , document.body, document.body.querySelector("#root"));