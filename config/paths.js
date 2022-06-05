const path = require('path');

module.exports = {
	src: path.resolve(__dirname, '../src'),
	output: path.resolve(__dirname, '../build'),
	rules: path.resolve(__dirname, './rules'),
	entry: {
		catalog: path.resolve(__dirname, './entry'),
		pages: 'pages',
		main: 'main.js',
		temp: 'main.temp.js',
	},
	assets: {
		js: 'js',
		img: 'img',
		fonts: 'fonts',
		pages: 'pages',
		styles: 'styles',
		static: 'static',
		templates: 'templates',
	},
	temp: "\nimport '@/temp/temp.js';\n",
};
