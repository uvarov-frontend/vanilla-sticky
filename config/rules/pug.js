module.exports = {
	test: /\.pug$/i,
	oneOf: [
		{
			resourceQuery: /^\?vue/,
			use: [{
				loader: '@uvarov.frontend/pug-bem-plain-loader',
				options: {
					b: true,
				},
			}],
		},
		{
			use: [
				{
					loader: 'html-loader',
					options: {
						sources: {
							list: [
								{
									attribute: 'src',
									type: 'src',
								},
								{
									attribute: 'srcset',
									type: 'src',
								},
								{
									attribute: 'data-src',
									type: 'src',
								},
							],
						},
						preprocessor: (content) => content.replace(/\url\('~@\/[^"]+"/g, (match) => {
							let url = '';
							match.replace(/'~@\/[^)]+'/, (path) => { url = path.replace(/'/g, ''); });
							return match.replace(/\url\('~@\/[^"]+"/, (style) => `${style.replace(/~@/, '')} data-src="${url}"`);
						}),
					},
				},
				{
					loader: '@uvarov.frontend/pug-bem-plain-loader',
					options: {
						b: true,
					},
				},
			],
		},
	],
};
