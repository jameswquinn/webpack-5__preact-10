import { Component, createRef, Fragment, render } from "preact";
import { useState } from "preact/hooks";
import TransitionGroup from "preact-transition-group";

let i = 0;

const Animate = () => {
  const [items, setItems] = useState([]);
  return (
    <Fragment>
      <button onClick={() => setItems([...items, i++, i++])}>Add</button>
      <button
        onClick={() => setItems(items.slice(0, Math.max(items.length - 1, 0)))}
      >
        Remove
      </button>
      <button
        onClick={() =>
          setItems(items.slice(0, Math.max(items.length - 1, 0)).concat(i++))
        }
      >
        Replace
      </button>
      <TransitionGroup>
        {items.map((value) => (
          <FadeIn key={value}>
            <span>{value}</span>
          </FadeIn>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

class FadeIn extends Component {
  ref = createRef();
  componentWillEnter(callback) {
    console.log("+ componentWillEnter", this.ref.current.innerHTML);
    setTimeout(() => {
      this.ref.current.style.opacity = "1";
    });
    setTimeout(callback, 1000);
  }
  componentDidEnter() {
    console.log("+ componentDidEnter", this.ref.current.innerHTML);
  }
  componentWillLeave(callback) {
    console.log("- componentWillLeave", this.ref.current.innerHTML);
    setTimeout(() => {
      this.ref.current.style.opacity = "0";
    });
    setTimeout(callback, 1000);
  }
  componentDidLeave() {
    console.log("- componentDidLeave", this.ref.current.innerHTML);
  }
  render() {
    return (
      <div style={{ transition: "opacity 1s", opacity: 0 }} ref={this.ref}>
        {this.props.children}
      </div>
    );
  }
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
