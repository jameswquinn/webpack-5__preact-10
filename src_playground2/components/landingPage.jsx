// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

/** @jsx h */
import { h, Fragment } from "preact";


 const LandingPage = props => {
    return (
        <Fragment>
            <h1>Landing Page</h1>
            <button onClick={() => {
                props.history.push('/about')
            }}>
                Login
            </button>
        </Fragment>
    )
}

export default LandingPage;