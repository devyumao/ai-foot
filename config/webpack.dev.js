const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const {TsConfigPathsPlugin} = require('awesome-typescript-loader');

const helper = require('./helper');

module.exports = {
    devtool: 'source-map',

    context: helper.SRC_PATH,

    entry: {
        game: 'index.ts'
    },

    output: {
        path: helper.BIN_PATH,
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [helper.root('src'), helper.root('node_modules')],
        alias: {
            phaser: path.join(helper.PHASER_PATH, 'build/custom/phaser-split.js'),
            pixi: path.join(helper.PHASER_PATH, 'build/custom/pixi.js'),
            p2: path.join(helper.PHASER_PATH, 'build/custom/p2.js'),
            prefab: path.join(helper.SRC_PATH, 'game/prefab/index')
        }
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader'
            },
            {
                test: /pixi\.js/,
                use: [{
                    loader: 'expose-loader',
                    options: 'PIXI',
                }],
            },
            {
                test: /phaser-split\.js$/,
                use: [{
                    loader: 'expose-loader',
                    options: 'Phaser',
                }],
            },
            {
                test: /p2\.js/,
                use: [{
                    loader: 'expose-loader',
                    options: 'p2',
                }],
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'asset',
                to: helper.BIN_PATH
            }
        ]),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
            chunks: ['game']
        })
    ],

    devServer: {
        port: 9001
        // host: 'localhost',
        // historyApiFallback: true,
        // watchOptions: {
        //     aggregateTimeout: 300
        // },
        // outputPath: helper.BIN_PATH
    }
};
