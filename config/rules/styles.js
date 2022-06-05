const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	test: /\.(css|s[ac]ss)$/i,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
		},
		{
			loader: 'css-loader',
			options: {
				sourceMap: !isProd,
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
				sourceMap: !isProd,
			},
		},
		{
			loader: 'sass-loader',
			options: {
				sourceMap: !isProd,
			},
		},
	],
};
