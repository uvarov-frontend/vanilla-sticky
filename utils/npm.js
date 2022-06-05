const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
	src: path.resolve(__dirname, '../src'),
	npm: path.resolve(__dirname, '../npm'),
};

const ENTRY_FILES = fs.readdirSync(`${PATHS.npm}/src/entry`);
const ENTRY = {};

ENTRY_FILES.forEach((entry) => {
	ENTRY[entry.replace(/.js/, '')] = `${PATHS.npm}/src/entry/${entry}`;
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
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].min.css',
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
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				],
			},
			{
				test: /\.(css|s[ac]ss)$/i,
				include: PATHS.src,
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
