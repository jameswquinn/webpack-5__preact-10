export const addTag = (name, attributes) => {
    var el = document.createElement(name),
        attrName;
    for (attrName in attributes) {
        el.setAttribute(attrName, attributes[attrName]);
    }
    document.head.append(el);
};

{/* <meta property="og:image" content="/og-image.jpg">
<meta property="og:image:width" content="531">
<meta property="og:image:height" content="797">
<meta property="og:title" content="An awesome page">
<meta property="og:description" content="Everything you need to know about the topic you are looking for">
<meta property="og:url" content="http://example.com"></meta> */}