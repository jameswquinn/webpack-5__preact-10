export const useMetaArray = (metaSet) => {
    let el = document.createElement('meta')
    let mount = document.head
    for (let attributes in metaSet) {
      for (let attrName in metaSet[attributes]) {
        el.setAttribute(attrName, metaSet[attributes][attrName]);
      }
      mount.appendChild(el);
    }
  }