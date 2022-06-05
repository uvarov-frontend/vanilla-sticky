/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */

const fs = require('fs');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = require('./paths');
const ALIAS = require('./alias');

const RULES = [];
fs.readdirSync(PATHS.rules).filter((filename) => RULES.push(require(`${PATHS.rules}/${filename}`)));

const TEMP = process.env.npm_package_scripts_temp.split('TEMP=')[1].split(' ')[0] !== 'false';
const ENTRY = {
	main: `${PATHS.entry.catalog}/${TEMP !== false && TEMP !== 'false' ? PATHS.entry.temp : PATHS.entry.main}`,
};

const PAGE_EXT = (filename) => ['pug', 'twig', 'html'].find((ext) => ext === filename.split('.').pop());

const PAGES_DIR = `${PATHS.src}/${PATHS.assets.templates}/${PATHS.assets.pages}`;
const DEVELOP_PAGES = fs.readdirSync(PAGES_DIR).filter((filename) => filename.startsWith('_'));
const PAGES = DEVELOP_PAGES.length > 0 ? DEVELOP_PAGES : fs.readdirSync(PAGES_DIR).filter(PAGE_EXT);

PAGES.forEach((page) => {
	const PAGE_NAME = page.replace(/^_/g, '').replace(/\.(pug|html|twig)/g, '');
	const ENTRY_PAGES = fs.readdirSync(`${PATHS.entry.catalog}/${PATHS.entry.pages}`);

	if (ENTRY_PAGES.includes(`${PAGE_NAME}.js`)) {
		ENTRY[PAGE_NAME] = {
			dependOn: PATHS.entry.main.replace(/\.(js)/g, ''),
			import: `${PATHS.entry.catalog}/${PATHS.entry.pages}/${PAGE_NAME}.js`,
		};
	} else {
		console.error('\x1b[31m', `Ошибка! Не найдена точка входа для "${page}", страница будет пропущена.`, '\x1b[0m');
		PAGES.length = 0;
	}
});

module.exports = {
	externals: {
		paths: PATHS,
	},
	stats: 'errors-warnings',
	mode: process.env.NODE_ENV,
	entry: ENTRY,
	output: {
		path: PATHS.output,
		clean: true,
		publicPath: '/',
		library: 'my-library',
		libraryTarget: 'umd',
	},
	resolve: {
		alias: ALIAS,
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	module: {
		rules: RULES,
	},
	plugins: [
		new webpack.ProgressPlugin({
			percentBy: 'entries',
		}),
		new VueLoaderPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: `${PATHS.src}/${PATHS.assets.static}`,
				to: PATHS.output,
			}],
		}),
		...PAGES.map(
			(page) => {
				const PAGE_NAME = page.replace(/^_/g, '').replace(/\.(pug|html|twig)/g, '');
				return new HtmlWebpackPlugin({
					template: `${PAGES_DIR}/${page}`,
					filename: `./${PAGE_NAME}.html`,
					chunks: ['main', `${PAGE_NAME}`],
					cache: true,
					scriptLoading: 'blocking',
					base: '/',
				});
			},
		),
		new HtmlReplaceWebpackPlugin([
			{
				pattern: / data-src="[^"]+"/g,
				replacement: '',
			},
		]),
	],
};
