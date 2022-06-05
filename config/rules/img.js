const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
	type: 'asset/resource',
	generator: {
		filename: (PathData) => PathData.filename.replace('src/', ''),
	},
	loader: 'image-webpack-loader',
	options: {
		disable: !isProd,
	},
};
