function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
  
    return obj;
  }
  
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);
  
      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
  
      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }
  
    return target;
  }
  
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
  
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  
    return target;
  }
  
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
  
    var target = _objectWithoutPropertiesLoose(source, excluded);
  
    var key, i;
  
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
  
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
  
    return target;
  }
  
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }
  
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
  
      return arr2;
    }
  }
  
  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }
  
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
  
  var n,i,r;n={__e:function(n,l){for(var u,i,t;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return u.__E=u}catch(l){n=l;}throw n},__v:0},i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,r=0;
  
  var t,u,r$1,o=0,i$1=[],c=n.__b,f=n.__r,e=n.diffed,a=n.__c,v=n.unmount;function m(t,r){n.__h&&n.__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function y(r,o){var i=m(t++,3);!n.__s&&k(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i));}function s(n){return o=5,d(function(){return {current:n}},[])}function d(n,u){var r=m(t++,7);return k(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function F(n){var r=u.context[n.__c],o=m(t++,9);return o.__c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function x(){i$1.forEach(function(t){if(t.__P)try{t.__H.__h.forEach(g),t.__H.__h.forEach(j),t.__H.__h=[];}catch(u){t.__H.__h=[],n.__e(u,t.__v);}}),i$1=[];}n.__b=function(n){u=null,c&&c(n);},n.__r=function(n){f&&f(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(g),r.__h.forEach(j),r.__h=[]);},n.diffed=function(t){e&&e(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i$1.push(o)&&r$1===n.requestAnimationFrame||((r$1=n.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b&&cancelAnimationFrame(t),setTimeout(n);},r=setTimeout(u,100);b&&(t=requestAnimationFrame(u));})(x)),u=void 0;},n.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g),t.__h=t.__h.filter(function(n){return !n.__||j(n)});}catch(r){u.some(function(n){n.__h&&(n.__h=[]);}),u=[],n.__e(r,t.__v);}}),a&&a(t,u);},n.unmount=function(t){v&&v(t);var u=t.__c;if(u&&u.__H)try{u.__H.__.forEach(g);}catch(t){n.__e(t,u.__v);}};var b="function"==typeof requestAnimationFrame;function g(n){var t=u;"function"==typeof n.__c&&n.__c(),u=t;}function j(n){var t=u;n.__c=n.__(),u=t;}function k(n,t){return !n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}
  
  var isArray = Array.isArray;
  var keyList = Object.keys;
  var hasProp = Object.prototype.hasOwnProperty;
  var hasElementType = typeof Element !== 'undefined';
  
  function equal(a, b) {
    // fast-deep-equal index.js 2.0.1
    if (a === b) return true;
  
    if (a && b && typeof a == 'object' && typeof b == 'object') {
      var arrA = isArray(a)
        , arrB = isArray(b)
        , i
        , length
        , key;
  
      if (arrA && arrB) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0;)
          if (!equal(a[i], b[i])) return false;
        return true;
      }
  
      if (arrA != arrB) return false;
  
      var dateA = a instanceof Date
        , dateB = b instanceof Date;
      if (dateA != dateB) return false;
      if (dateA && dateB) return a.getTime() == b.getTime();
  
      var regexpA = a instanceof RegExp
        , regexpB = b instanceof RegExp;
      if (regexpA != regexpB) return false;
      if (regexpA && regexpB) return a.toString() == b.toString();
  
      var keys = keyList(a);
      length = keys.length;
  
      if (length !== keyList(b).length)
        return false;
  
      for (i = length; i-- !== 0;)
        if (!hasProp.call(b, keys[i])) return false;
      // end fast-deep-equal
  
      // start react-fast-compare
      // custom handling for DOM elements
      if (hasElementType && a instanceof Element && b instanceof Element)
        return a === b;
  
      // custom handling for React
      for (i = length; i-- !== 0;) {
        key = keys[i];
        if (key === '_owner' && a.$$typeof) {
          // React-specific: avoid traversing React elements' _owner.
          //  _owner contains circular references
          // and is not needed when comparing the actual elements (and not their owners)
          // .$$typeof and ._store on just reasonable markers of a react element
          continue;
        } else {
          // all other properties should be traversed as usual
          if (!equal(a[key], b[key])) return false;
        }
      }
      // end react-fast-compare
  
      // fast-deep-equal index.js 2.0.1
      return true;
    }
  
    return a !== a && b !== b;
  }
  // end fast-deep-equal
  
  var reactFastCompare = function exportedEqual(a, b) {
    try {
      return equal(a, b);
    } catch (error) {
      if ((error.message && error.message.match(/stack|recursion/i)) || (error.number === -2146828260)) {
        // warn on circular references, don't crash
        // browsers give this different errors name and messages:
        // chrome/safari: "RangeError", "Maximum call stack size exceeded"
        // firefox: "InternalError", too much recursion"
        // edge: "Error", "Out of stack space"
        console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
        return false;
      }
      // some other error. we should definitely know about these
      throw error;
    }
  };
  
  var Context = createContext({});
  function Provider(props) {
    var setHelmet = function setHelmet(state) {
      if (props.setHelmet) {
        props.setHelmet(state);
        return;
      }
  
      return;
    };
  
    var value = s({
      setHelmet: setHelmet,
      instances: []
    });
    return React.createElement(Context.Provider, {
      value: value.current
    }, props.children);
  }
  
  var Helmet = memo(function Helmet(props) {
    var children = props.children,
        onLoad = props.onLoad,
        other = _objectWithoutProperties(props, ["children", "onLoad"]);
  
    var newProps = other;
  
    function mapTagChildrenToProps(tag, tagChildren) {
      if (!tagChildren) {
        return null;
      }
  
      switch (tag.type) {
        case "style":
        case "script":
          {
            return {
              text: tagChildren
            };
          }
  
        default:
          {
            throw new Error("<".concat(tag.type, "> with children. Not implemented!"));
          }
      }
    }
  
    function mapTagsToProps(tags, newProps) {
      var collectedTags = {};
      Children.forEach(tags, function (tag) {
        var _objectSpread3;
  
        if (!tag || !tag.props) {
          return;
        }
  
        var _tag$props = tag.props,
            tagChildren = _tag$props.children,
            tagProps = _objectWithoutProperties(_tag$props, ["children"]);
  
        switch (tag.type) {
          case "meta":
          case "link":
          case "style":
          case "script":
            {
              collectedTags = _objectSpread({}, collectedTags, _defineProperty({}, tag.type, [].concat(_toConsumableArray(collectedTags[tag.type] || []), [_objectSpread({}, tagProps, mapTagChildrenToProps(tag, tagChildren))])));
              break;
            }
  
          default:
            {
              switch (tag.type) {
                case "html":
                  newProps = _objectSpread({}, newProps, {
                    htmlAttrs: _objectSpread({}, newProps.htmlAttrs, tagProps)
                  });
                  break;
  
                case "body":
                  newProps = _objectSpread({}, newProps, {
                    bodyAttrs: _objectSpread({}, newProps.bodyAttrs, tagProps)
                  });
                  break;
  
                case "title":
                  newProps = _objectSpread({}, newProps, (_objectSpread3 = {}, _defineProperty(_objectSpread3, tag.type, tagChildren), _defineProperty(_objectSpread3, "titleAttrs", _objectSpread({}, tagProps)), _objectSpread3));
                  break;
  
                default:
                  newProps = _objectSpread({}, newProps, _defineProperty({}, tag.type, _objectSpread({}, tagProps)));
                  break;
              }
            }
        }
      }); // merge props with collected multi tags
  
      var result = _objectSpread({}, newProps);
  
      var tagNames = Object.keys(collectedTags);
  
      for (var i = 0; i < tagNames.length; i++) {
        var tagName = tagNames[i];
        result = _objectSpread({}, result, _defineProperty({}, tagName, collectedTags[tagName]));
      }
  
      return result;
    }
  
    var helmet = newProps;
  
    if (children) {
      helmet = mapTagsToProps(children, newProps);
    } // trigger helmet state sync
  
  
    var _useContext = F(Context),
        instances = _useContext.instances,
        setHelmet = _useContext.setHelmet;
  
    var instance = s(helmet);
    instance.current = helmet; // register and unregister a helmet instance
  
    y(function () {
      instances.push(instance);
      return function () {
        var index = instances.indexOf(instance);
        instances.splice(index, 1);
      };
    }, [instances]); // if helmet has changed then propate all helmet states to the userland
  
    y(function () {
      var helmets = instances.map(function (instance) {
        return {
          onLoad: onLoad,
          helmet: instance.current
        };
      });
      setHelmet(helmets);
    }, [helmet]);
    return null;
  }, function (prevProps, nextProps) {
    return reactFastCompare(prevProps, nextProps);
  });
  function mergeHelmets(helmets) {
    var result = {};
  
    var _loop = function _loop(i) {
      var helmet = helmets[i].helmet;
      var propNames = Object.keys(helmet);
      propNames.forEach(function (propName) {
        var props = helmet[propName];
  
        switch (propName) {
          case "meta":
          case "link":
          case "style":
          case "script":
            {
              result = _objectSpread({}, result, _defineProperty({}, propName, [].concat(_toConsumableArray(result[propName] || []), _toConsumableArray(props))));
              break;
            }
  
          default:
            {
              switch (propName) {
                case "html":
                  result[propName] = props;
                  break;
  
                case "body":
                  result[propName] = props;
                  break;
  
                case "title":
                  result[propName] = props;
                  break;
  
                default:
                  result[propName] = props;
                  break;
              }
            }
        }
      });
    };
  
    for (var i = 0; i < helmets.length; i++) {
      _loop(i);
    }
  
    return result;
  }
  
  export { Helmet, Provider, mergeHelmets };
  