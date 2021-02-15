/** @jsx h */
import { h, Component, render } from "preact";
import { Link } from 'preact-router/match';


const Navigation = () => {
    return (
        <nav class="navigation">
            <Link activeClassName="active" href="/" aria-label="link home">
                home
            </Link>
            <Link activeClassName="active" href="/about" aria-label="link about">
                about
            </Link>
            <Link activeClassName="active" href="/contact" aria-label="link contact">
                Contact
            </Link>
        </nav>
    )
}

export default Navigation;