/* @jsx h */
import { h } from "preact";
import { Link, useRoute } from "wouter-preact";

const ActiveLink = props => {
  const [isActive] = useRoute(props.href);
  return (
    <Link {...props}>
      <a className={isActive ? "active" : ""} href={props.href}>
        {props.children}
      </a>
    </Link>
  );
};

export default ActiveLink;