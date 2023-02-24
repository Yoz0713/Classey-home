const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: path.join(path.join(__dirname, 'src'), "index.js"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',

    },
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'], //優先查找src裡的文件再查找nodeModules裡面的
        alias: {
            react: path.join(__dirname, 'node_modules', 'react'),//將查找react路徑簡化為import react from "react"
        },
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                // 把 sass-loader 放在首要處理 (第一步)
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            quality: 100
                        },
                    },
                    {
                        loader: 'webp-loader',
                        options: {
                            quality: 100,
                        },
                    },
                ],
            },
            {
                test: /\.mp4$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "video"
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin()
    ],
};
