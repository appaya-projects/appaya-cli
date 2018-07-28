const path = require('path'),
	// CopyWebpackPlugin = require('copy-webpack-plugin'),
	//BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
	MiniCssExtractPlugin = require("mini-css-extract-plugin")
	autoprefixer = require('autoprefixer'),
	OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
	UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
	mode: ENV,
	devtool: 'source-map',

	entry: './src/page.js',
	resolve: {
		extensions: ['.ts', '.tsx', ".js", ".json"]
	},

	output: {
		path: path.resolve('./static'),
		publicPath: '',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},
	module: {
		rules: [
			{ test: /\.ts?$/, use: "awesome-typescript-loader" },
			{
				test: /\.(gif|png|jpe?g)$/i,
				use: [
					'file-loader?name=assets/[name].[ext]',
					'image-webpack-loader'
				]
			},
			{
				test: /\.(svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file-loader?name=assets/[name].[ext]'
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
					{ loader: 'postcss-loader', options: { sourceMap: true, plugins: (loader) => [autoprefixer()] } },
					{ loader: 'sass-loader', options: { sourceMap: true, importLoaders: 1 } }]
			},
		]
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
	plugins: [
		//		new BrowserSyncPlugin({
		//			proxy: 'http://127.0.0.1/edsa-wp/',
		//			files: ['./*.php', './views/**/*.twig', './assets/**/*.*'],
		//		}),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		})
	]
};



