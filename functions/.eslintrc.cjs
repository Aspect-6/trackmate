module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"google",
		"plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["tsconfig.json", "tsconfig.dev.json"],
		sourceType: "module",
	},
	ignorePatterns: [
		"/lib/**/*",
		"/generated/**/*",
	],
	plugins: [
		"@typescript-eslint",
		"import",
	],
	rules: {
		"quotes": "off",
		"object-curly-spacing": ["error", "always"],
		"indent": ["error", "tab"],
		"semi": ["error", "never"],
		"no-tabs": "off",
		"max-len": "off",
		"eol-last": "off",
		"require-jsdoc": "off",
		"valid-jsdoc": "off",
		"import/no-unresolved": 0,
		"import/namespace": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"typescript-eslint/no-explicit-any": "off"
	},
}