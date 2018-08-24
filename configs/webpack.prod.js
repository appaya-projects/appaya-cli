const webpackMerge = require('webpack-merge'),
    commonConfig = require('./webpack.base.js'),
    path = require('path'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    autoprefixer = require('autoprefixer'),
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    mode: ENV,
    devtool: 'source-map',

    output: {
        path: path.resolve('./build'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: { inline: false } // generate sourcemap use an external file
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=misc/[name].[ext]'
            },
            {
                test: /\.(webm|mp4)$/,
                loader: 'file-loader?name=misc/[name].[ext]',
            },
            {
                test: /\.css$/, use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                    { loader: 'postcss-loader', options: { sourceMap: true, plugins: (loader) => [autoprefixer()] } }]
            },
            {
                test: /\.scss$/, use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1, minimize: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true, minimize: true, plugins: (loader) => [autoprefixer()] } },
                    { loader: 'sass-loader', options: { sourceMap: true, minimize: true, importLoaders: 1 } }]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
});