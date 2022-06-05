module.exports = {
	test: /\.(woff|woff2|eot|ttf|otf)$/i,
	type: 'asset/resource',
	generator: {
		filename: (PathData) => PathData.filename.replace('src/', ''),
	},
};
