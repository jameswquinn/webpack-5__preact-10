// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef, Children } from "preact/compat"

/** @jsx h */
import { Component } from "preact";
import { createPortal } from "preact/compat"


const headRoot = document.head;

// export class Head extends Component {
//    render() {
//     return createPortal(this.props.children, headRoot);
//   }
// }

export const Head = (props) => {
    return createPortal(props.children, headRoot);
}