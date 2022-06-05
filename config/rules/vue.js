module.exports = {
	test: /\.vue$/i,
	loader: 'vue-loader',
	options: {
		loader: {
			scss: 'vue-style-loader!css-loader!sass-loader',
		},
	},
};
