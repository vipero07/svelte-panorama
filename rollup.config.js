import svelte from 'rollup-plugin-svelte';
import glslify from 'rollup-plugin-glslify';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default [{
	input: 'src/index.js',
	output: [
		{ file: pkg.module, 'format': 'es' },
		{ file: pkg.main, 'format': 'umd', name }
	],
	plugins: [
		glslify(),
		svelte({ 
			compilerOptions: {
				customElement: true
			}
		}),
		resolve()
	]
},
{
	input: 'src/index.js',
	output: [
		{ file: `dist/index.min.mjs`, 'format': 'es' },
		{ file: `dist/index.min.js`, 'format': 'umd', name }
	],
	plugins: [
		glslify(),
		svelte({ 
			compilerOptions: {
				customElement: true
			}
		}),
		terser(),
		resolve()
	]
}
];
