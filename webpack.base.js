const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const PathResolver = require('./helpers/path-resolver');

const webpackMerge = require('webpack-merge'),
  commonConfig = require('../webpack.base.js'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  autoprefixer = require('autoprefixer'),
  OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	entry: './src/page.js',
	devtool: 'source-map',

	output: {
		path: path.resolve('./build'),
		publicPath: '',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},

	resolve: {
		extensions: ['.ts', '.tsx', ".js", ".json"],
		alias: {
			'webpack-hot-client/client': PathResolver.cli('node_modules/webpack-hot-client/client')
		},
	},
	optimization: {
		minimizer: [
		  new UglifyJsPlugin({
			cache: true,
			parallel: true,
			sourceMap: true
		  }),
		  new OptimizeCSSAssetsPlugin({})
		]
	  },

	module: {
		rules: [
			{ test: /\.ts?$/, use: "awesome-typescript-loader" },
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.css$/, use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } }
				]
			},
			{
				test: /\.scss$/, use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader', options: { sourceMap: true, importLoaders: 1, minimize: true } },
					{ loader: 'sass-loader', options: { sourceMap: true, importLoaders: 1, minimize: true } }]
			},
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	},

	resolveLoader: {
		modules: [PathResolver.cli('node_modules')],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
};