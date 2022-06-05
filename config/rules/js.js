const PATHS = require('../paths');

module.exports = {
	test: /\.js$/,
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
};
