/** @jsx h */
import { useEffect } from "preact/hooks"

const _internalSetAttributes = (_NAME, _HEADMETASET) => {
    useEffect(() => {
        let mount = document.head
        for (let attributes in _HEADMETASET) {
            let el = document.createElement(_NAME)
            for (let attrName in _HEADMETASET[attributes]) {
                el.setAttribute(attrName, _HEADMETASET[attributes][attrName])
            }
            el.setAttribute('data-head', '')
            mount.appendChild(el);
        }
        return () => {
            document.querySelectorAll('head [data-head]').forEach(function (node) {
                node.parentNode.removeChild(node);
            });
        }
    }, [_HEADMETASET])
}

const useTitle = (title) => {
    useEffect(() => {
      document.title = title;
    }, [title]);
  };
  
const useMeta = (_HEADMETASET) => { 
    _internalSetAttributes('meta', _HEADMETASET) 
}
const useLink = (_HEADMETASET) => { 
    _internalSetAttributes('link', _HEADMETASET) 
}

export { useMeta, useLink, useTitle }

// @examples

// useLink({[
//     {rel: "canonical", href: "http://mysite.com/example"},
//     {rel: "apple-touch-icon", href: "http://mysite.com/img/apple-touch-icon-57x57.png"},
//     {rel: "apple-touch-icon", sizes: "72x72", href: "http://mysite.com/img/apple-touch-icon-72x72.png"}
// ]})

// useMate({[
//     {name: "description", content: "Helmet application"},
//     {property: "og:type", content: "article"}
// ]})


//   const setLang = (lang) => {
//     document.documentElement.lang = lang;
//   };