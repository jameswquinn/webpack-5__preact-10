// /** @jsx h */
import { h, render, Fragment } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { addTag } from "../helper";

import chungHeiWebp from './img/chung-hei.jpg?min=480,max=1024,steps=3&format=webp';
import jerryZhangWebp from './img/jerry-zhang.jpg?min=480,max=1024,steps=3&format=webp';

import chungHei from './img/chung-hei.jpg?min=480,max=1024,steps=3';
import jerryZhang from './img/jerry-zhang.jpg?min=480,max=1024,steps=3';


import 'lazysizes';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import './styles.css'
import './fonts.css'

const App = () => {
    useEffect(() => {
        document.title = `"Welcome James | 💭"`;

        addTag('meta', { name: 'description', content: 'This article will explain how to add external and internal css and js files dynamically inside html head tag using javascript.Example: meta tag, javascript, css' });
        addTag('meta', { property: "og:title", content: "PreactX" });
        addTag('meta', { property: "og:type", content: "article" });
        // addTag('meta', { property: "og:image", content: location.href + responsiveImage.src })
        addTag('meta', { property: "og:url", content: location.href })
        addTag('base', { target: "_blank", href: location.href })
        addTag('link', { rel: "canonical", href: location.href })
    }, [])

    return (

        <Fragment>
            <h3>background-size: contain</h3>

            <p>created with lazySizes bgset and parent-fit plugins</p>
            <div class="row">
                <div class="outerbox">
                    <div class="box ratio-container lazyload" data-sizes="auto" data-bgset={chungHeiWebp.srcSet}></div>

                    
                </div>
                <div class="outerbox">
                    <div class="box ratio-container lazyload" data-sizes="auto" data-bgset={jerryZhangWebp.srcSet}></div>
                </div>
            </div>
            <h3>background-size: cover</h3>

            <p>created with lazySizes bgset and parent-fit plugins</p>
            <div class="row">
                <div class="outerbox">
                    <div class="box cover ratio-container lazyload" data-sizes="auto" data-bgset={chungHei.srcSet}></div>

                    
                </div>
                <div class="outerbox">
                    <div class="box cover ratio-container lazyload" data-sizes="auto" data-bgset={jerryZhang.srcSet}></div>
                </div>
            </div>
        </Fragment>
    )
};


render(<App />, document.getElementById("root"));