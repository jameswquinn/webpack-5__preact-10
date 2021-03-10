import React, { useState } from "react";
import Helmet from "react-helmet";
import Favicon from 'react-favicon';
import MetaTags from 'react-meta-tags';

export default function MetaData(props) {
    const [meta] = useState({
        name: props.name,
        description: props.description,
        ogUrl: props.ogUrl,
        imgUrl: "https://bucard.co.il/server/public/images/uploads/1601487360190-meat-shop-logo_71835-89.jpg"
    });
    
    return (
        <>
            <MetaTags>
                <meta name="title" content={`Digital Card Of ${meta.name}`} />
                <meta
                    name="description"
                    content={meta.description}
                />

                <meta property="og:title" content={`Digital Card Of ${meta.name}`} />
                {meta.imgUrl && <meta property="og:image" content={meta.imgUrl} />}
                <meta
                    property="og:description"
                    content={meta.description}
                />
                <meta property="og:url" content={meta.ogUrl} />
            </MetaTags>
            <Helmet>
                <title>{`Digital Card Of ${meta.name}`}</title>
                {meta.imgUrl && <link rel="icon" href={meta.imgUrl}></link>}
                <meta name="title" content={`Digital Card Of ${meta.name}`} />
                <meta
                    name="description"
                    content={meta.description}
                />
                <meta property="og:title" content={`Digital Card Of ${meta.name}`} />
                {meta.imgUrl && <meta property="og:image" content={meta.imgUrl} />}
                <meta
                    property="og:description"
                    content={meta.description}
                />
                <meta property="og:url" content={meta.ogUrl} />
            </Helmet>
            {meta.imgUrl && <Favicon url={meta.imgUrl} />}
        </>
    );
}
