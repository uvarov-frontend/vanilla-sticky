/* eslint-disable no-console */
const fs = require('fs');
const PATHS = require('../config/paths');

const createEntry = {
	variables() {
		this.PAGES = undefined;
		this.ENTRY = undefined;
		this.SCRIPTS = undefined;
		this.STYLES = undefined;
	},

	clean() {
		fs.rmSync(`${PATHS.entry.catalog}/${PATHS.entry.pages}`, { recursive: true, force: true });
		fs.mkdirSync(`${PATHS.entry.catalog}/${PATHS.entry.pages}`, { recursive: true });
	},

	search(path, extens) {
		return fs.readdirSync(path).filter((filename) => extens.find((ext) => ext === filename.split('.').pop()));
	},

	missing(variables, extens) {
		return this.PAGES.flatMap((page) => {
			if (variables.includes(`${page.replace(/(_)/y, '').replace(/\.(pug|html|twig)/g, '')}${extens}`)) return null;
			return page;
		}).filter((page) => page);
	},

	create(arr, path, imports, extens) {
		arr.forEach((page) => {
			const file = page.replace(/\.(pug|html|twig)/g, '').replace(/(_)/y, '');
			let data = '';

			if (imports) {
				data += `import '@/${PATHS.assets.js}/${PATHS.assets.pages}/${file}.js';\n`;
				data += `import '@/${PATHS.assets.styles}/${PATHS.assets.pages}/${file}.scss';\n`;
				data += `import '@/${PATHS.assets.templates}/${PATHS.assets.pages}/${page}';\n`;
			}

			fs.writeFile(`${path}/${file}${extens}`, data, (error) => { if (error) console.error(error); });
		});
	},

	init() {
		this.clean();

		this.PAGES = this.search(`${PATHS.src}/${PATHS.assets.templates}/${PATHS.assets.pages}`, ['pug', 'twig', 'html']);
		this.ENTRY = this.search(`${PATHS.entry.catalog}/${PATHS.entry.pages}`, ['js']);
		this.SCRIPTS = this.search(`${PATHS.src}/${PATHS.assets.js}/${PATHS.assets.pages}`, ['js']);
		this.STYLES = this.search(`${PATHS.src}/${PATHS.assets.styles}/${PATHS.assets.pages}`, ['scss']);

		this.MISSING_ENTRY = this.missing(this.ENTRY, '.js');
		this.MISSING_SCRIPTS = this.missing(this.SCRIPTS, '.js');
		this.MISSING_STYLES = this.missing(this.STYLES, '.scss');

		this.create(this.MISSING_ENTRY, `${PATHS.entry.catalog}/${PATHS.entry.pages}`, true, '.js');
		this.create(this.MISSING_SCRIPTS, `${PATHS.src}/${PATHS.assets.js}/${PATHS.assets.pages}`, false, '.js');
		this.create(this.MISSING_STYLES, `${PATHS.src}/${PATHS.assets.styles}/${PATHS.assets.pages}`, false, '.scss');

		return console.log('ENTRY:', '\x1b[32m', 'OK', '\x1b[0m');
	},
};

createEntry.init();
