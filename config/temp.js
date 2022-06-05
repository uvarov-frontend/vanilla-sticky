/* eslint-disable no-console */

const fs = require('fs');
const PATHS = require('./paths');

const createTemp = {
	init() {
		fs.access(`${PATHS.entry.catalog}/${PATHS.entry.temp}`, (error) => {
			if (!error) fs.unlink(`${PATHS.entry.catalog}/${PATHS.entry.temp}`, (errorUnlink) => { if (errorUnlink) console.error(errorUnlink); });
		});

		const TEMP = process.env.npm_lifecycle_script.split('TEMP=')[1].split(' ')[0];
		if (TEMP !== false && TEMP !== 'false') {
			fs.readFile(`${PATHS.entry.catalog}/${PATHS.entry.main}`, 'utf8', (error, data) => {
				if (error) return console.error(error);
				const result = data + PATHS.temp;

				fs.writeFile(`${PATHS.entry.catalog}/${PATHS.entry.temp}`, result, 'utf8', (errorWriteFile) => { if (errorWriteFile) console.error(errorWriteFile); });
				return console.log('TEMP MODE:', '\x1b[32m', 'ON', '\x1b[0m');
			});
		} else {
			console.log('TEMP MODE:', '\x1b[31m', 'OFF', '\x1b[0m');
		}
	},
};

createTemp.init();
