// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"

/** @jsx h */
import { h, render } from "preact";
import { useEffect } from "preact/hooks"
import Siema from './siema';



import "./siema.css";

const App = () => {


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    siema = new Siema({
      selector: '.siema',
      duration: 200,
      easing: 'ease-out',
      perPage: 1,
      startIndex: 0,
      draggable: true,
      multipleDrag: true,
      threshold: 20,
      loop: false,
      rtl: false,
      onInit: () => {},
      onChange: () => {},
    });
  });

return(
  <div>
  <div className="siema">
    <div><img src="https://pawelgrzybek.github.io/siema/assets/siema--pink.svg" alt="Siema image" /></div>
    <div><img src="https://pawelgrzybek.github.io/siema/assets/siema--yellow.svg" alt="Siema image" /></div>
    <div><img src="https://pawelgrzybek.github.io/siema/assets/siema--pink.svg" alt="Siema image" /></div>
    <div><img src="https://pawelgrzybek.github.io/siema/assets/siema--yellow.svg" alt="Siema image" /></div>
  </div>

</div>
)
}

render(<App/>, document.getElementById('root'));