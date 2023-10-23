import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: "json" };
import { visualizer } from 'rollup-plugin-visualizer';

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
		{ file: `dist/index.min.mjs`, 'format': 'es', sourcemap: true },
		{ file: `dist/index.min.js`, 'format': 'umd', name, sourcemap: true },
		{ file: `docs/index.min.js`, 'format': 'umd', name, sourcemap: true }
	],
	plugins: [
		svelte({ 
			compilerOptions: {
				customElement: true
			}
		}),
		resolve(),
		terser(),
		visualizer({
			filename: './docs/stats.html',
			sourcemap: true
		})
	]
}
];
