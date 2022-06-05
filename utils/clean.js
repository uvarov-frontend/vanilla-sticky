/* eslint-disable no-console */
const fs = require('fs');
const PATHS = require('../config/paths');

try {
	fs.rmSync(PATHS.output, { recursive: true, force: true });
	console.log('\x1b[33m', 'cd ./build removed!', '\x1b[0m');
} catch (error) {
	console.error(error);
}

fs.unlink(`${PATHS.entry.catalog}/${PATHS.entry.temp}`, () => {
	console.log('\x1b[33m', 'cd ./config/entry/main.temp.js removed!', '\x1b[0m');
});
