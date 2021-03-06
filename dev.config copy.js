//process.traceDeprecation = true;

module.exports = (env, argv) => {
    const production = argv && argv.mode && argv.mode !== "development";

    const htmlWebpackPlugin = require("html-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const autoprefixer = require("autoprefixer");
    const webpack = require("webpack");
    const path = require("path");
    const fs = require("fs");

    const postcssOpts = {
        postcssOptions: {
            plugins: [autoprefixer]
        }
    };




    return {
        entry: path.resolve(__dirname, "src/main"),
        target: 'web', // <=== can be omitted as default is 'web'
        output: {
            filename: "js/[name].js",
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
                        name: "[path][name].[ext]",
                        outputPath: "fonts"
                    }
                },
                {
                    test: /\.(jpe?g|png)$/i,
                    loader: "responsive-loader",
                    options: {
                        adapter: require("responsive-loader/sharp"),
                        esModule: true,
                        quality: 70,
                        name: "[name].[ext]",
                        outputPath: "imgs"
                    }
                }
            ]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({
                filename: "css/[name].css"
            }),
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html"),
            })
        ],
        performance: {
            hints: false
        },
        devServer: {
            port: 8080,
            hot: true,
            host: "0.0.0.0",
            quiet: true,
            compress: true,
            overlay: false,
            historyApiFallback: true,
            https: true,
            // https: {
            //     key: fs.readFileSync('/path/to/server.key'),
            //     cert: fs.readFileSync('/path/to/server.crt'),
            //     ca: fs.readFileSync('/path/to/ca.pem'),
            // },
            // proxy: {
            //     '/api': 'http://localhost:3000',
            //   },
            // index: 'index.html',
            open: {
                app: ['Google Chrome', '--incognito'],
            }
        }
    };
};