//process.traceDeprecation = true;

module.exports = (env, argv) => {
    const production = argv && argv.mode && argv.mode !== "development";

    const htmlWebpackPlugin = require("html-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const { CleanWebpackPlugin } = require("clean-webpack-plugin");
    const autoprefixer = require("autoprefixer");
    const TerserPlugin = require("terser-webpack-plugin");
    const webpack = require("webpack");
    const path = require("path");

    const postcssOpts = {
        postcssOptions: {
            plugins: [autoprefixer]
        }
    };




    return {
        entry: path.resolve(__dirname, "src/main"),
        target: 'web', // <=== can be omitted as default is 'web'
        output: {
            filename: "js/[name][contenthash].js",
            path: path.resolve(__dirname, "dist/"),
            publicPath: "/"
        },
        resolve: {
            extensions: [".js", ".jsx", ".css", ".sccs"],
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
                        name: "[path][name][contenthash][.[ext]",
                        outputPath: "fonts"
                    }
                },
                // {
                //     test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
                //     loader: "file-loader",
                //     options: {
                //         context: "src/assets/img",
                //         name: "[path][name][contenthash].[ext]",
                //         outputPath: "img"
                //     }
                // }
                {
                    test: /\.(jpe?g|png)$/i,
                    loader: "responsive-loader",
                    options: {
                        disable: true
                    }
                },
            ]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "css/[name][contenthash].css"
            }),

            new htmlWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html"),
                favicon: "./public/favicon.ico"
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