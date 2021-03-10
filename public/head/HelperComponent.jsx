/** @jsx h */
import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
import React, { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef, Children } from "preact/compat"

const headRoot = document.head;

// class Head extends Component {
//   render() {
//     return createPortal(this.props.children, headRoot);
//   }
// }



// export const CreateHead = ({
//   title = "No page title",
//   description = "Page without description",
//   image = "http://defaultimage.com",
//   url = ""
// }) => {
//   return (
//     <Head>
//       <meta property="og:title" content={title} />
//       <meta property="og:url" content={url} />
//       <meta property="og:image" content={image} />
//       <meta property="og:description" content={description} />
//       <meta property="og:type" content="article" />
//       <meta name="twitter:card" content={image} />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       <meta name="twitter:image" content={image} />
//       <meta name="description" content={description} />
//       <title>{title}</title>
//       <meta name="description" content={description} />
//     </Head>
//   )
// }


// import { jsx as _jsx } from "react/jsx-runtime";
// import { Fragment as _Fragment } from "react/jsx-runtime";

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

// const ScriptJsonLD = (prop) => {
//   let json = prop.json
//   return (<script type='application/ld+json'>
//     {{
//       dangerouslySetInnerHTML: {
//         __html: JSON.stringify(json)
//       }
//     }}
//   </script>)
// }

// ScriptJsonLD({
//   "@context": "http://www.schema.org",
//   "@type": "WebSite",
//   "name": "James quinn ",
//   "alternateName": "James",
//   "url": "https://soundcloud.com/zoeblade/logic-bomb-restrung-mix"
// })



function ScriptJsonLD(_ref) {
  var json = _ref.json;
  return /*#__PURE__*/h(Fragment, {
    children: json && /*#__PURE__*/h("script", {
      dangerouslySetInnerHTML: {
        __html: JSON.stringify(json)
      },
      type: "application/ld+json"
    })
  });
}