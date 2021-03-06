/** @jsx h */
import { h } from "preact";

import HeadTag from './HeadTag';

export const Title = props => <HeadTag tag="title" {...props} />;

export const Style = props => <HeadTag tag="style" {...props} />;

export const Meta = props => <HeadTag tag="meta" {...props} />;

export const Link = props => <HeadTag tag="link" {...props} />;

export const Base = props => <HeadTag tag="base" {...props} />;

export { default as HeadProvider } from './HeadProvider';
