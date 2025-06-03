import pkg from "./package.json" with { type: "json" };
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

const nodeBuiltinsRE = /^node:.*/; /* Regex that matches all Node built-in specifiers */

export default {
	input: "src/pptxgen.ts",
	output: [
		{
			file: "./src/bld/pptxgen.js",
			format: "iife",
			name: "PptxGenJS",
			globals: { jszip: "JSZip" },
		},
		{ file: "./src/bld/pptxgen.cjs.js", format: "cjs", exports: "default" },
		{ file: "./src/bld/pptxgen.es.js", format: "es" },
	],
	external: [
		nodeBuiltinsRE,
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [
		resolve({ preferBuiltins: true }),
		commonjs(),
		typescript({ typescript: require("typescript") }),
	]
};
