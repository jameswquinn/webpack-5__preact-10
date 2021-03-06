//process.traceDeprecation = true;

module.exports = (env, argv) => {
    const production = argv && argv.mode && argv.mode !== "development";

    const htmlWebpackPlugin = require("html-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const WebpackPwaManifest = require('webpack-pwa-manifest');
    const PurgeCSSPlugin = require('purgecss-webpack-plugin');
    const WebpackCriticalCSSInliner = require('webpack-critical-css-inliner');
    const { CleanWebpackPlugin } = require("clean-webpack-plugin");
    const autoprefixer = require("autoprefixer");
    const TerserPlugin = require("terser-webpack-plugin");
    const BrotliPlugin = require("brotli-webpack-plugin");
    const CopyPlugin = require("copy-webpack-plugin");
    const { GenerateSW } = require('workbox-webpack-plugin');
    const SizePlugin = require('size-plugin');
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
    const webpack = require("webpack");
    const path = require("path");
    const glob = require('glob')

    const postcssOpts = {
        postcssOptions: {
            plugins: [autoprefixer]
        }
    };

    const PATHS = {
        src: path.join(__dirname, 'src')
    }



    return {
        entry: path.resolve(__dirname, "src/main"),
        target: 'web', // <=== can be omitted as default is 'web'
        output: {
            filename: "js/[name][contenthash:5].js",
            path: path.resolve(__dirname, "dist/"),
            publicPath: "/"
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx", ".css", ".sccs"],
            alias: {
                react: "preact/compat",
                "react-dom": "preact/compat",
            },
        },
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                // ["@babel/preset-modules"],
                                ["@babel/preset-env"],
                                [
                                    "@babel/preset-react",
                                    {
                                        "pragma": "h",
                                        "pragmaFrag": "Fragment"
                                    }
                                ]
                            ],
                            plugins: [
                                "@babel/plugin-transform-destructuring",
                                "@babel/plugin-proposal-object-rest-spread",
                                "@babel/plugin-transform-template-literals"
                            ],
                            babelrc: false
                        }
                    }
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader",
                            options: postcssOpts
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader",
                            options: postcssOpts
                        },
                        { loader: "sass-loader" }
                    ]
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: { minimize: true }
                    }]
                },
                {
                    test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                    loader: "file-loader",
                    options: {
                        context: "src/assets/fonts",
                        name: "[path][name][contenthash:4][.[ext]",
                        outputPath: "fonts"
                    }
                }, {
                    test: /\.(webm|mp4)$/,
                    loader: "file-loader",
                    options: {
                        context: "src/assets/video",
                        name: "[path][name][contenthash:4].[ext]",
                        outputPath: "video"
                    }
                },
                {
                    test: /\.(jpe?g|png)$/i,
                    loader: "responsive-loader",
                    options: {
                        adapter: require("responsive-loader/sharp"),
                        esModule: true,
                        quality: 65,
                        name: "[name][contenthash:4].[ext]",
                        outputPath: "imgs"
                    }
                }
            ]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "css/[name][contenthash:5].css"
            }),
            new PurgeCSSPlugin({
                paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
            }),
            new WebpackPwaManifest({
                name: 'My Progressive Web App',
                short_name: 'MyPWA',
                description: 'My awesome Progressive Web App!',
                orientation: "portrait",
                display: "standalone",
                background_color: '#ffffff',
                theme_color: '#000000',
                crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
                start_url: ".",
                share_target: {
                    "action": "/share-photo",
                    "method": "POST",
                    "enctype": "multipart/form-data",
                    "params": {
                        "og:title": "name",
                        "og:description": "description",
                        "og:url": "link",
                        "files": [{
                            "name": "photos",
                            "accept": "image/jpg"
                        }]
                    }
                },
                fingerprints: false,
                inject: true,
                icons: [{
                        src: path.resolve('public/icons/icon.png'),
                        sizes: [16, 32],
                        destination: path.join('favicon'),
                    }, {
                        src: path.resolve('public/icons/icon.png'),
                        sizes: [120, 152, 167, 180, 1024],
                        destination: path.join('icons', 'ios'),
                        ios: true
                    },
                    {
                        src: path.resolve('public/icons/large-icon.png'),
                        size: 1024,
                        destination: path.join('icons', 'ios'),
                        ios: 'startup'
                    },
                    {
                        src: path.resolve('public/icons/icon.png'),
                        sizes: [36, 48, 72, 96, 144, 192, 512],
                        destination: path.join('icons', 'android')
                    },
                    {
                        src: path.resolve('public/icons/maskable-icon.png'),
                        size: '1024x1024',
                        purpose: 'maskable'
                    }
                ]
            }),
            // new CopyPlugin({
            //     patterns: [
            //         { from: path.resolve(__dirname, "src/robots.txt"), to: "robots.txt" }
            //     ],
            // }),
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html"),
            }),
            // new WebpackCriticalCSSInliner({
            //     base: 'dist/',
            //     src: 'index.html',
            //     target: 'index.html',
            //     inlineGoogleFonts: true,
            //     minify: true,
            //     // ignoreStylesheets: [/bootstrap/],
            //     // whitelist: /@font-face|\:root/
            //     // whitelist: /@font-face/
            // }),
            new BrotliPlugin({
                asset: "[path].br[query]",
                test: /\.js$|\.css$|\.svg$|\.html$/,
                threshold: 10240,
                minRatio: 0.7
            }),
            new GenerateSW(),
            new SizePlugin(),
            new WebpackBuildNotifierPlugin({
                title: "My Project Webpack Build",
                logo: path.resolve("public/icons/icon.png"),
                suppressSuccess: true
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: "static"
            })
        ],
        optimization: {
            minimize: production,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        toplevel: true,
                        output: {
                            beautify: false
                        }
                    }
                })
            ],
            sideEffects: true
        },

        performance: {
            hints: false
        },
        devServer: {
            hot: true,
            host: "127.0.0.1"
        }
    };
};