const PATHS = require('../paths');

module.exports = {
	test: /\.jsx$/,
	include: PATHS.src,
	exclude: /node_modules/,
	loader: 'babel-loader',
	options: {
		presets: ['@babel/preset-env', '@babel/preset-react'],
	},
};
