const PathResolver = require('../helpers/path-resolver');

module.exports = {
	entry: [
		'./src/page.js'
	],
	resolve: {
		extensions: ['.ts', '.tsx', ".js", ".json"],
		alias: {
			'webpack-hot-client/client': PathResolver.cli('node_modules/webpack-hot-client/client')
		},
	},
	module: {
		rules: [
			{ test: /\.ts?$/, use: "awesome-typescript-loader" },
			{
				test: /\.html$/,
				loader: 'html-loader?attrs[]=img:src&attrs[]=video:src&attrs[]=source:src'
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
	]
};