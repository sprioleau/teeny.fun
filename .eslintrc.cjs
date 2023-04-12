// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
	overrides: [
		{
			extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: path.join(__dirname, "tsconfig.json"),
			},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: path.join(__dirname, "tsconfig.json"),
	},
	plugins: ["@typescript-eslint", "prettier"],
	extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
	rules: {
		"prettier/prettier": "error",
		"react/jsx-max-props-per-line": ["error", { maximum: 1 }],
		"@typescript-eslint/consistent-type-imports": [
			"warn",
			{
				prefer: "type-imports",
				fixStyle: "inline-type-imports",
			},
		],
		"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
		"@typescript-eslint/restrict-template-expressions": [
			"warn",
			{
				allowNullish: false,
				allowString: true,
			},
		],
	},
};

module.exports = config;
