/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const fs = require('fs');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
	src: path.resolve(__dirname, '../src'),
	npm: path.resolve(__dirname, '../npm'),
};

const ENTRY_FILES = fs.readdirSync(`${PATHS.npm}/src/entry`);
const ENTRY = {};

ENTRY_FILES.forEach((entry) => {
	const ENTRYS = require(`${PATHS.npm}/src/entry/${entry}`);
	ENTRY[entry.replace(/.js/, '')] = `${PATHS.src}${ENTRYS.js}`;
	if (ENTRYS.style) ENTRY[entry.replace(/.js/, '.min')] = `${PATHS.src}${ENTRYS.style}`;
});

module.exports = {
	mode: 'production',
	target: 'web',
	devtool: false,
	performance: {
		hints: false,
	},
	entry: ENTRY,
	output: {
		filename: '[name].min.js',
		path: `${PATHS.npm}/build`,
		clean: true,
		publicPath: '/',
		library: 'my-library',
		libraryTarget: 'umd',
	},
	resolve: {
		alias: {
			'@': PATHS.src,
		},
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				extractComments: false,
				terserOptions: {
					format: {
						comments: false,
					},
				},
			}),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			linkType: false,
		}),
		new CopyWebpackPlugin({
			patterns: [{
				from: `${PATHS.npm}/src/static`,
				to: `${PATHS.npm}/build`,
			}],
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/i,
				include: PATHS.src,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(css|s[ac]ss)$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: false,
							modules: {
								auto: true,
								localIdentName: '[local]__[hash:base64:5]',
							},
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: false,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: false,
						},
					},
				],
			},
		],
	},
};
