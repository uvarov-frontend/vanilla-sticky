module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'import'
	],
	settings: {
	},
	rules: {
		'react/prop-types': 'off',
		'max-len': ['error', { code: 180 }],
		'class-methods-use-this': 'off',
		'no-tabs': 'off',
		'no-param-reassign': 'off',
		'import/extensions': 'off',
		'prefer-destructuring': ['error', { object: true, array: false }],
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		indent: ['error', 'tab', { SwitchCase: 1 }],
	},
};
