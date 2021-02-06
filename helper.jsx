export const addTag = (name, attributes) => {
    var el = document.createElement(name),
        attrName;
    for (attrName in attributes) {
        el.setAttribute(attrName, attributes[attrName]);
    }
    document.head.append(el);
};