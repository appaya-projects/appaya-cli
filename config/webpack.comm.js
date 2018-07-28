const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const absPath = require('../src/helpers/abs-path');

module.exports = {
	entry: './src/page.js',
	resolve: {
		extensions: ['.ts', '.tsx', ".js", ".json"],
		alias: {
			'webpack-hot-client/client': absPath.cli('node_modules/webpack-hot-client/client')
		},
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
		modules: [absPath.cli('node_modules')],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
};