const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
	target: 'web',
	devtool: 'source-map', // slow build (debug js on)
	// devtool: 'eval-source-map', // fast build (debug js off)
	performance: {
		hints: false,
	},
	output: {
		filename: `${common.externals.paths.assets.js}/[name].js`,
	},
	devServer: {
		open: ['index.html'],
		hot: true,
		historyApiFallback: true,
		compress: true,
		allowedHosts: 'all',
		client: {
			logging: 'info',
			overlay: true,
			progress: false,
		},
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${common.externals.paths.assets.styles}/[name].css`,
			linkType: false,
		}),
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: true,
		}),
	],
});
