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
	plugins: ["@typescript-eslint", "prettier", "unused-imports"],
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
		"unused-imports/no-unused-imports": "error",
		"sort-imports": [
			"error",
			{
				ignoreCase: false,
				ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
				allowSeparatedGroups: true,
			},
		],
		"import/order": [
			"error",
			{
				groups: [
					"builtin", // Built-in imports (come from NodeJS native) go first
					"external", // <- External imports
					"internal", // <- Absolute imports
					["sibling", "parent"], // <- Relative imports, the sibling and parent types they can be mingled together
					"index", // <- index imports
					"unknown", // <- unknown
				],
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
			},
		],
	},
	settings: {
		"import/resolver": {
			typescript: {
				project: "./tsconfig.json",
			},
		},
	},
};

module.exports = config;
