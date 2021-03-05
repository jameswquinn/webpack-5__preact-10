export const addTag = (name, attributes) => {
    var el = document.createElement(name),
        attrName;
    for (attrName in attributes) {
        el.setAttribute(attrName, attributes[attrName]);
    }
    document.head.append(el);
};

export const useMeta = (attributes) => {
    var el = document.createElement('meta'),
        attrName;
    for (attrName in attributes) {
        el.setAttribute(attrName, attributes[attrName]);
    }
    document.head.appendChild(el);
};

// export const useMetaArray = (metaTags) => {
//     for (attributes in metaTags) {
//         // console.log(attrName)
//         // console.log(metaTags[attributes]);
//         var el = document.createElement('meta'),
//             attrName;
//         for (attrName in metaTags[attributes]) {
//             el.setAttribute(attrName, metaTags[attributes][attrName]);
//         }
//         document.head.appendChild(el);
//     }
// };

// export const useMetaArray = (metaArray) => {
//     console.log("hello from useMetaArray")
//     for (array in metaArray) {
//         let attributes = metaArray[array];
//         console.log(attributes)
//         console.log("hello from useMetaArray | James again")

//     }
// };

// export const useMetaArray = (metaTags) => {
//     for (attributes in metaTags) {
//         console.log(attrName)
//         console.log(metaTags[attributes]);
//         // var el = document.createElement('meta'),
//         //     attrName;
//         // for (attrName in metaTags[attributes]) {
//         //     el.setAttribute(attrName, metaTags[attributes][attrName]);
//         // }
//         // document.head.appendChild(el);
//     }
// };


export const useMetaArray = (metaArray) => {
    for (let attributes in metaArray) {
    //   console.log(metaArray[attributes])
      let prop = metaArray[attributes];
      var el = document.createElement('meta'),
        attrName;
      for (let attrName in prop) {
        el.setAttribute(attrName, prop[attrName]);
      }
      document.head.appendChild(el);
    }
  }




// console.log("hello from useMetaArray | James again")

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
useMetaArray(example);

// example array will generate the following meta tags in head
// <meta property="og:image" content="/og-image.jpg">
// <meta property="og:image:width" content="1200">
// <meta property="og:image:height" content="628">
// <meta property="og:title" content="An awesome page">
// <meta property="og:description" content="Everything you need to know about the topic you are looking for">
// <meta property="og:url" content="http://example.com">