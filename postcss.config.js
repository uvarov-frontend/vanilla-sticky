module.exports = {
	plugins: process.env.NODE_ENV === 'production'
		? {
			'postcss-preset-env': {
				browsers: 'last 3 versions',
			},
			autoprefixer: {},
			cssnano: {
				preset: [
					'default',
					{
						discardComments: {
							removeAll: true,
						},
					},
				],
			},
		// perfectionist: {
		// 	cascade: false,
		// 	indentSize: 2,
		// },
		} : {
			'postcss-preset-env': {
				browsers: 'last 3 versions',
			},
			autoprefixer: {},
		},
};
