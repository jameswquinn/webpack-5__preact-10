// /** @jsx h */
// import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
// import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
// import React,{ unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef, Children } from "preact/compat"
// import {Switch, Route, Router, Link, useRoute, useRouter, useLocation } from "wouter-preact";
// import makeCachedMatcher from "wouter-preact/matcher";


/** @jsx h */
import { h, Component, render, Fragment, createContext, hydrate, toChildArray, cloneElement, createRef, createElement, isValidElement } from "preact";
import { useCallback, useContext, useDebugValue, useErrorBoundary, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "preact/hooks"
import React, { unstable_batchedUpdates, Suspense, SuspenseList, lazy, createPortal, PureComponent, memo, forwardRef, Children } from "preact/compat"

// /** @jsx h */
// import { h, render, Fragment } from "preact";
import { Route, Router, Link as NavLink, useRoute, useRouter, useLocation } from "wouter-preact";
import { Head } from '../public/head/Head'
// import ScriptJsonLD from '@s-ui/react-script-json-ld'
import "./styles.css";
import { indexOf } from "lodash";

const Scope = props => {
    const router = useRouter();
    const [parentLocation] = useLocation();

    const nestedBase = `${router.base}${props.base}`;

    // don't render anything outside of the scope
    if (!parentLocation.startsWith(nestedBase)) return null;

    // we need key to make sure the router will remount if the base changes
    return (
        <Router base={nestedBase} key={nestedBase}>
            {props.children}
        </Router>
    );
};

const CurrentLoc = () => useLocation()[0];

const ActiveLink = props => {
    const [isActive] = useRoute(props.href);
    return (
        <NavLink {...props}>
            <a className={isActive ? "active" : ""} href={props.href}>
                {props.children}
            </a>
        </NavLink>
    );
};

function ScriptJsonLD(_ref) {
    var json = _ref.json;
    return h(Head, {
        children: json && h("script", {
            dangerouslySetInnerHTML: {
                __html: JSON.stringify(json)
            },
            type: "application/ld+json"
        })
    });
}

//   function ScriptJsonLD(_ref) {
//     var json = _ref.json;
//     return h(Fragment, {
//       children: json && h("script", {
//         dangerouslySetInnerHTML: {
//           __html: JSON.stringify(json)
//         },
//         type: "application/ld+json"
//       })
//     });
//   }

const Home = () => {
    return (
        <Fragment>
            home james
        </Fragment>
    )
}

const CreateHead = ({
    title = "No page title",
    description = "Page without description",
    image = "http://defaultimage.com",
    url = ""
}) => {
    return (
        <Fragment>
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="article" />
            <meta name="twitter:card" content={image} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="description" content={description} />
        </Fragment>
    )
}


function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

// export const useMeta = (attributes) => {
//     let el = document.createElement('meta'),
//         attrName;
//     let fragment = document.head
//     useEffect(() => {
//         for (attrName in attributes) {
//             el.setAttribute(attrName, attributes[attrName]);
//         }
//         fragment.appendChild(el);
//         return () => {
//             for (attrName in attributes) {
//                 el.setAttribute(attrName, attributes[attrName]);
//             }
//             fragment.removeChild(el);
//         }
//     }, [fragment, el])
// };

// const useTag = (name, attributes) => {
//     let el = document.createElement(name),
//         attrName;
//     let mount = document.head
//     useEffect(() => {
//         for (attrName in attributes) {
//             el.setAttribute(attrName, attributes[attrName]);
//         }
//         mount.appendChild(el);
//         return () => {
//             for (attrName in attributes) {
//                 el.setAttribute(attrName, attributes[attrName]);
//             }
//             mount.removeChild(el);
//         }
//     }, [mount, el]
// };


const useMeta = (attributes) => {
    let el = document.createElement('meta')
    let mount = document.head
    useEffect(() => {
        for (let attrName in attributes) {
            el.setAttribute(attrName, attributes[attrName]);
        }
        mount.appendChild(el);
        return () => {
            mount.removeChild(el);
        }
    }, [mount])
};


export const useMetaArray = (metaSet) => {
    useEffect(() => {
        let mount = document.head
        for (let attributes in metaSet) {
            let el = document.createElement('meta')
            for (let attrName in metaSet[attributes]) {
                el.setAttribute(attrName, metaSet[attributes][attrName])
                el.setAttribute('data-head', '')
            }
            mount.appendChild(el);
        }
        return () => {
            document.querySelectorAll('[data-head]').forEach(function (c) {
                c.parentNode.removeChild(c);
            });
        }
    }, [])
}


 const generateMetasMarkup = (props) => {
    for (let attrName in attributes) {
        document.createElement('meta').setAttribute(attrName, attributes[attrName]);
    }
 }


 const useMeta2 = (attributes) => {
    let el = document.createElement('meta')
    let mount = document.head
    useEffect(() => {
        for (let attrName in attributes) {
            el.setAttribute(attrName, attributes[attrName]);
        }
        mount.appendChild(el);
        return () => {
            mount.removeChild(el);
        }
    }, [mount])
};


const useMetaArray22 = (metaArray) => {
    useEffect(() => {
        for (let attributes in metaArray) {
            useMeta2(attributes[indexOf])
        }
        return () => {}
    }, [])
}



// const useMetaArray = (metaArray) => {
//     let fragment = document.head
//     let el = document.createElement('meta')
//     useEffect(() => {
//         for (let attributes in metaArray) {
//             let prop = metaArray[attributes];
//             for (let attrName in prop) {
//                 el.setAttribute(attrName, prop[attrName]);
//             }
//             fragment.appendChild(el);
//         }

//     }, [])

//     useEffect(() => {
//         return () => {
//             for (let attributes in metaArray) {
//                 let prop = metaArray[attributes];
//                 for (let attrName in prop) {
//                     el.setAttribute(attrName, prop[attrName]);
//                 }
//                 fragment.removeChild(el);
//             }
//         }
//     }, [])
// }


// const useMeta = (metaTags) => {
//     let mount = document.head
//     let fragment = document.createDocumentFragment();

//     useEffect(() => {
//         for (let attributes in metaArray) {
//             //   console.log(metaArray[attributes])
//               let prop = metaArray[attributes];
//               var el = document.createElement('meta'),
//                 attrName;
//               for (let attrName in prop) {
//                 el.setAttribute(attrName, prop[attrName]);
//               }
//               document.head.appendChild(el);
//             }
//         // return () => {
//         //     for (attributes in metaTags) {
//         //         for (attrName in metaTags[attributes]) {
//         //             el.setAttribute(attrName, metaTags[attributes][attrName]);
//         //         }
//         //         fragment.removeChild(el);
//         //     }
//         // }
//     }, [el, fragment]);
//     return createPortal(el, mount)
// }
// const useMeta = (metaTags) => {
//     let mount = document.head
//     let fragment = document.createDocumentFragment();

//     useEffect(() => {
//         for (let attributes in metaArray) {
//             //   console.log(metaArray[attributes])
//               let prop = metaArray[attributes];
//               var el = document.createElement('meta'),
//                 attrName;
//               for (let attrName in prop) {
//                 el.setAttribute(attrName, prop[attrName]);
//               }
//               document.head.appendChild(el);
//             }
//         // return () => {
//         //     for (attributes in metaTags) {
//         //         for (attrName in metaTags[attributes]) {
//         //             el.setAttribute(attrName, metaTags[attributes][attrName]);
//         //         }
//         //         fragment.removeChild(el);
//         //     }
//         // }
//     }, [el, fragment]);
//     return createPortal(el, mount)
// }

// const useMeta = (metaTags) => {
//     let mount = document.head
//     let fragment = document.createDocumentFragment();

//     useEffect(() => {
//         for (let attributes in metaArray) {
//             //   console.log(metaArray[attributes])
//               let prop = metaArray[attributes];
//               var el = document.createElement('meta'),
//                 attrName;
//               for (let attrName in prop) {
//                 el.setAttribute(attrName, prop[attrName]);
//               }
//               document.head.appendChild(el);
//             }
//         // return () => {
//         //     for (attributes in metaTags) {
//         //         for (attrName in metaTags[attributes]) {
//         //             el.setAttribute(attrName, metaTags[attributes][attrName]);
//         //         }
//         //         fragment.removeChild(el);
//         //     }
//         // }
//     }, [el, fragment]);
//     return createPortal(el, mount)
// }
const About3 = () => {
    const example = [{
        "property": "og:image",
        "content": "/og-image.jpg"
    }, {
        "property": "og:image:width",
        "content": "1200"
    }, {
        "property": "og:image:height",
        "content": "628"
    }, {
        "property": "og:title",
        "content": "An awesome page james"
    }, {
        "property": "og:description",
        "content": "Everything you need to know about the topic you are looking for"
    }, {
        "property": "og:url",
        "content": "http://example.com"
    }]

    const example2 = {
        "property": "og:image",
        "content": "/og-image.jpg"
    }

    const example3 = {
        "property": "og:description",
        "content": "Everything you need to know about the topic you are looking for"
    }
    // useTag('meta', {
    //     "property": "og:description",
    //     "content": "Everything you need to know about the topic you are looking for"
    // })
    // useMeta({
    //     "property": "og:title",
    //     "content": "An awesome page"
    // })

    // useMeta2(example[3])

    useMetaArray(example)


    return (
        <Fragment>
            Hello from About3 | James
        </Fragment>
    )


}

const About = () => {
    const numbers = [1, 2, 3, 4, 5];
    const meta = { desc: 'hello James', url: location.host, title: 'hello james from title' }
    return (
        <Fragment>
            {createPortal(h(Fragment,
                null,
                h('title', null, meta.title),
                h('meta', { property: "og:title", content: meta.title }),
                h('meta', { property: "og:url", content: meta.url }),
                h('meta', { property: "og:image", content: 'image' }),
                h('meta', { property: "og:description", content: meta.desc }),
                h('meta', { property: "og:type", content: "article" }),
                h('meta', { name: "twitter:card", content: 'image' }),
                h('meta', { name: "twitter:title", content: meta.title }),
                h('meta', { name: "twitter:description", content: meta.desc }),
                h('meta', { name: "twitter:image", content: 'image' }),
                h('meta', { name: "description", content: meta.desc })
            ),
                document.head)}
            <NumberList numbers={numbers} />
            about james
        </Fragment>
    )
}


const Abouts = () => {
    return (
        <Fragment>
            <CreateHead title="My page title | James" description="This page is super important" url={location.href} image="https://heikole-art.net/wp-content/uploads/2020/05/5D4_5892.jpg" />
            <ScriptJsonLD json={{
                '@context': 'http://schema.org',
                '@type': 'AutoDealer',
                name: 'Dealer name | James',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Avda. Maresme, 133',
                    postalCode: '08302',
                    addressLocality: 'Mataró'
                },
                image:
                    'https://a.ccdn.es/coches/store_images_profesionales/123456_13032018103554.jpg',
                telephone: ['123456789'],
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: '41.53194',
                    longitude: '2.442895'
                }
            }} />
            from nested about
        </Fragment>
    )
}


function App() {
    return (
        <div className="App">
            <nav>
                <ActiveLink href="/">Home</ActiveLink>
                <ActiveLink href="/about">About</ActiveLink>
                <ActiveLink href="/help">Help Center</ActiveLink>
            </nav>

            <main>
                <Route path="/" component={Home} />
                <Route path="/about" component={About3} />

                <Scope base="/help">
                    <div>
                        These are nested routes. Relative location: <CurrentLoc />
                        <ul>
                            <li>
                                <NavLink href="/topics">Topics</NavLink>
                            </li>

                            <li>
                                <NavLink href="/how-to">How to use?</NavLink>
                            </li>
                        </ul>
                    </div>
                    <Route path="/topics">
                        <h1>Topics</h1>
                        <p> To be announced...</p>
                    </Route>
                    <Route path="/how-to">
                        <article>
                            <h1>How it all started?</h1>
                            <p>
                                Injection stdio.h wannabee hexadecimal packet mainframe script
                                kiddies thread new gnu win emacs for fopen if cat Leslie
                                Lamport. Big-endian over clock hello world Starcraft firewall
                                machine code d00dz alloc perl. Flush class deadlock man pages
                                tera unix frack semaphore long server rsa suitably small values.
              </p>

                            <p>
                                Mega wabbit firewall frack fork grep gobble false stdio.h
                                mainframe fail endif less Starcraft tera gcc blob back door void
                                float lib ack. Alloc try catch bypass null new access int double
                                wannabee stack mutex fatal dereference nak bit vi crack
                                semaphore. Bin continue gnu bytes case salt packet sniffer char
                                private bin infinite loop foad.
              </p>
                        </article>
                    </Route>
                </Scope>
            </main>
        </div>
    );
}


render(<App />, document.getElementById("root"));