module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
		'plugin:vue/essential',
		'plugin:react/recommended',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'vue',
		'import',
		'react',
	],
	settings: {
		'import/resolver': {
			alias: [
				['@', './src'],
			],
		},
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
