module.exports = {
	test: /\.twig$/i,
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
			loader: 'twig-html-loader',
		},
	],
};
