// export const addTag = (name, attributes) => {
//     var el = document.createElement(name),
//         attrName;
//     for (attrName in attributes) {
//         el.setAttribute(attrName, attributes[attrName]);
//     }
//     // document.appendChild(el);
//     DocumentFragment.appendChild(el);
// };

import { Fragment, h } from "./node_modules/preact/src/index"

// export const useMeta = (attributes) => {
//     // var el = document.createElement('meta'),attrName;
//     for (attrName in attributes) {
//         document.createElement('meta'),attrName.setAttribute(attrName, attributes[attrName]);
//     }
//     document.head.appendChild(el);
// };



//     // create product schema
//     createProductSchema = function(from, to, currency) {
//         return injectSchema = function(price) {
//             let el = document.createElement('script');
//             el.type = 'application/ld+json';
//             el.text = JSON.stringify({
//                 "@context": "https://schema.org/",
//                 "@type": "Product",
//                 "name": `Flight from ${from} to ${to}`,
//                 "description": `Cheap flights from ${from} to ${to}`,
//                 "offers": {
//                     "@type": "Offer",
//                     "url": `http://flightsearches.net?fso=${from}&fsd=${to}`,
//                     "priceCurrency": `${currency}`,
//                     "availability": "https://schema.org/InStock",
//                     "price": `${price}`,
//                 }
//             });

//             console.log('inject now ');
//             document.querySelector('head').appendChild(el);
//         };
//     };

// {/* <meta property="og:image" content="/og-image.jpg">
// <meta property="og:image:width" content="531">
// <meta property="og:image:height" content="797">
// <meta property="og:title" content="An awesome page">
// <meta property="og:description" content="Everything you need to know about the topic you are looking for">
// <meta property="og:url" content="http://example.com"></meta> */}

// import { jsx as _jsx } from "react/jsx-runtime";
// import { Fragment as _Fragment } from "react/jsx-runtime";
// import { h } from "./node_modules/preact/src/index";

// function ScriptJsonLD(_ref) {
//   var json = _ref.json;
//   return /*#__PURE__*/_jsx(_Fragment, {
//     children: json && /*#__PURE__*/_jsx("script", {
//       dangerouslySetInnerHTML: {
//         __html: JSON.stringify(json)
//       },
//       type: "application/ld+json"
//     })
//   });
// }

// ScriptJsonLD.displayName = 'ScriptJsonLD';
// export default ScriptJsonLD;



// export const Something = (prop) => {
//     let attributes = prop.attributes;
//     elem = h('meta', {attrName});
//     for (attrName in attributes) {
//         return h(_Fragment, {
//             children: attributes && elem.setAttribute(attrName, attributes[attrName])
//         })
//     }
//    DocumentFragment.appendChild(elem);
// }



// export const useMeta = (attributes) => {
//     // var el = document.createElement('meta'),attrName;
//     for (attrName in attributes) {
//         document.createElement('meta'),attrName.setAttribute(attrName, attributes[attrName]);
//     }
//     document.head.appendChild(el);
// };

// useEffect(() => {
//     const script = document.createElement('script');

//     script.src = "https://use.typekit.net/foobar.js";
//     script.async = true;

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     }
//   }, []);




//   export const useMeta = (attributes) => {
//     var el = document.createElement('meta'),attrName;
//     for (let  in attributes) {
//         el.setAttribute(attrName, attributes[attrName]);
//     }
//     document.head.appendChild(el);
// };


// const Something = () => {
//     return{
//         <Fragment>
        
//         </Fragment>
//     }
// }

import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
const Portal = ({ id, children }) => {
  const el = useRef(document.getElementById(id) || document.createElement('div'));
  const [dynamic] = useState(!el.current.parentElement)
  useEffect(() => {
    if (dynamic) {
      el.current.id = id;
      document.body.appendChild(el.current);
    }
    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current);
      }
    }
  }, [id])
  return createPortal(children, el.current);
};
export default memo(Portal);

//




//

import React, { useRef, useEffect } from 'react';

/**
 * Creates DOM element to be used as React root.
 * @returns {HTMLElement}
 */
function createRootElement(id) {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
}

/**
 * Appends element as last child of body.
 * @param {HTMLElement} rootElem 
 */
function addRootElement(rootElem) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild.nextElementSibling,
  );
}

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 * @example
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 * @param {String} id The id of the target container, e.g 'modal' or 'spotlight'
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
function usePortal(id) {
  const rootElemRef = useRef(null);

  useEffect(function setupElement() {
    // Look for existing target dom element to append to
    const existingParent = document.querySelector(`#${id}`);
    // Parent is either a new root or the existing dom element
    const parentElem = existingParent || createRootElement(id);

    // If there is no existing DOM element, add a new one.
    if (!existingParent) {
      addRootElement(parentElem);
    }

    // Add the detached element to the parent
    parentElem.appendChild(rootElemRef.current);

    return function removeElement() {
      rootElemRef.current.remove();
      if (!parentElem.childElementCount) {
        parentElem.remove();
      }
    };
  }, [id]);

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  }

  return getRootElem();
}

export default usePortal;


import React from 'react';
import { createPortal } from 'react-dom';
import usePortal from './usePortal';

/**
 * @example
 * <Portal id="modal">
 *   <p>Thinking with portals</p>
 * </Portal>
 */
const Portal = ({ id, children }) => {
  const target = usePortal(id);
  return createPortal(
    children,
    target,
  );
};

export default Portal;

/**
 * Like React's dangerouslySetInnerHTML, but also with JS evaluation.
 * Usage:
 *   <div ref={setDangerousHtml.bind(null, html)}/>
 */
 function setDangerousHtml(html, el) {
    if(el === null) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    range.deleteContents();
    el.appendChild(range.createContextualFragment(html));
}