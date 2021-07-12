const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
const rulesModule = require('./config/webpack.rules')
const aliasModule = require('./config/webpack.alias')
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.tsx'
        // index: {
        //   import: './src/index.js',
        //   dependOn: 'shared'
        // },
        // another: {
        //     import: './src/another-module.js',
        //     dependOn: 'shared'
        // },
        // shared: 'lodash',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Draw Mind',
            filename: './index.html'
        })
        // new ESLintPlugin({})
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    resolve: {
        alias: aliasModule,
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: rulesModule
}