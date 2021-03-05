/** @jsx h */
import { h, Component } from 'preact';

module.exports = function withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient,
  mapStateOnServer
) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }
  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }
  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
   throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    let mountedInstances = [];
    let state;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    class SideEffect extends Component {
      // Try to use displayName of wrapped component
      static displayName = `SideEffect(${getDisplayName(WrappedComponent)})`;

      // Expose canUseDOM so tests can monkeypatch it
      static canUseDOM = !!(
        typeof window !== 'undefined' &&
        window.document &&
        window.document.createElement
      );

      static peek() {
        return state;
      }

      static rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        let recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      }

      shouldComponentUpdate(nextProps) {
        // preact-compat normally does this
        let { children, ...props } = nextProps;
        if (children && children.length) props.children = children;
        return shallowDiffers(props, this.props);
      }

      componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      }

      componentDidUpdate() {
        emitChange();
      }

      componentWillUnmount() {
        const index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return SideEffect;
  }

  // Pulled from react-compat
  function shallowDiffers (a, b) {
    for (let i in a) if (!(i in b)) return true
    for (let i in b) if (a[i] !== b[i]) return true
    return false
  }
}