const useMeta = (metaTags) => {
    let mount = document.head
    let el = document.createElement('meta'), attrName;
    let fragment = document.createDocumentFragment();

    useEffect(() => {
        for (attributes in metaTags) {
            for (attrName in metaTags[attributes]) {
                el.setAttribute(attrName, metaTags[attributes][attrName]);
            }
            fragment.appendChild(el);
        }
        return () => {
            for (attributes in metaTags) {
                for (attrName in metaTags[attributes]) {
                    el.setAttribute(attrName, metaTags[attributes][attrName]);
                }
                fragment.removeChild(el);
            }
        }
    }, [el,fragment]);
    return createPortal(fragment, mount)
}

export default useMeta;



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
    "content": "An awesome page"
}, {
    "property": "og:description",
    "content": "Everything you need to know about the topic you are looking for"
}, {
    "property": "og:url",
    "content": "http://example.com"
}]
useMeta(example);