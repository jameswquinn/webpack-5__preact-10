console.log("hello world");

// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef } from "preact/compat"
// import { useMeta, useLink, useLang, useTitle, useTitleTemplate } from 'hoofd/preact';

// /** @jsx h */
import { h, render, Fragment } from "preact";
import { addTag } from "../helper"
import { useEffect } from "preact/hooks"




import responsiveImage from './image.jpg?min=375,max=1024,steps=3';
import responsiveImageWebp from './image.jpg?min=375,max=1024,steps=3&format=webp';




import './styles'


const App = () => {
    useEffect(() => {
        document.title = `"Welcome James | 💭"`;

        // const addTag = (name, attributes) => {
        //     var el = document.createElement(name),
        //         attrName;
        //     for (attrName in attributes) {
        //         el.setAttribute(attrName, attributes[attrName]);
        //     }
        //     document.head.append(el);
        // };

//         // Add mata file
        addTag('meta', { name: 'description', content: 'This article will explain how to add external and internal css and js files dynamically inside html head tag using javascript.Example: meta tag, javascript, css' });


        // og:title - The title of your object as it should appear within the graph, e.g., "PreactX".
        // og:type - The type of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.
        // og:image - An image URL which should represent your object within the graph.
        // og:url - The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.example.com/".


        addTag('meta', { property: "og:title", content: "PreactX" });
        addTag('meta', { property: "og:type", content: "article" });
        addTag('meta', { property: "og:image", content: location.origin + responsiveImage.src })
        addTag('meta', { property: "og:url", content: location.origin })
    });


    return (
        <Fragment>
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