const webpackMerge = require('webpack-merge'),
	commonConfig = require('./webpack.base.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {
	mode: ENV,
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file-loader?name=assets/[name].[ext]'
			},
			{
				test: /\.(webm|mp4)$/,
				loader: 'file-loader?name=assets/[name].[ext]'
			},
		]
	},
	serve: {
		clipboard: false,
		logLevel: 'error',
		mode: ENV,
		open: true,
		hotClient: {
			reload: true,
			hmr: false,
			logLevel: 'error'
		},
		devMiddleware: {
			publicPath: "/",
			logLevel: 'error',
			hot: false,
			inline: false
		}
	}
});