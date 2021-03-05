export const addTag = (name, attributes) => {
    var el = document.createElement(name),
        attrName;
    for (attrName in attributes) {
        el.setAttribute(attrName, attributes[attrName]);
    }
    document.head.appendChild(el);
};

export const useMeta = (attributes) => {
    var el = document.createElement('meta'),
        attrName;
    for (attrName in attributes) {
        el.setAttribute(attrName, attributes[attrName]);
    }
    document.head.appendChild(el);
};



    // create product schema
    createProductSchema = function(from, to, currency) {
        return injectSchema = function(price) {
            let el = document.createElement('script');
            el.type = 'application/ld+json';
            el.text = JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": `Flight from ${from} to ${to}`,
                "description": `Cheap flights from ${from} to ${to}`,
                "offers": {
                    "@type": "Offer",
                    "url": `http://flightsearches.net?fso=${from}&fsd=${to}`,
                    "priceCurrency": `${currency}`,
                    "availability": "https://schema.org/InStock",
                    "price": `${price}`,
                }
            });
    
            console.log('inject now ');
            document.querySelector('head').appendChild(el);
        };
    };

{/* <meta property="og:image" content="/og-image.jpg">
<meta property="og:image:width" content="531">
<meta property="og:image:height" content="797">
<meta property="og:title" content="An awesome page">
<meta property="og:description" content="Everything you need to know about the topic you are looking for">
<meta property="og:url" content="http://example.com"></meta> */}