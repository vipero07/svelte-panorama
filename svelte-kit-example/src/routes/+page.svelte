<script>
	import Panorama from '../../../src/Panorama.svelte';
</script>

<main>
	<header>
		<h3>Svelte-Panorama</h3>
		<p>
			A very lightweight (~63 KB uncompressed) standalone 360 equirectangular image viewer. The
			source code can be found <a href="https://github.com/vipero07/svelte-panorama">here</a>. An
			npm package for use in a bundler with react, vue, angular, svelte or as a standalone web
			component can be found
			<a href="https://www.npmjs.com/package/svelte-panorama-component">here</a>.
		</p>
		<p>
			This page can be resized, the web component will properly adjust to smaller screen sizes. Feel
			free to try this on mobile devices too.
		</p>
		<p><a href="stats.html">Bundle Stats</a></p>
	</header>

	<section>
		<header>
			<h4>Outdoor smaller file example ~296 KB</h4>
			<h5>FOV is 30</h5>
		</header>
		<div class="panorama-wrapper">
			<Panorama
				class="panorama"
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Veste_Oberhaus_%28Passau%2C_full_spherical_panoramic_image%2C_equirectangular_projection%29.jpg/2560px-Veste_Oberhaus_%28Passau%2C_full_spherical_panoramic_image%2C_equirectangular_projection%29.jpg"
				alt="Some Outdoor Location"
			/>
			<div class="attribute">
				<a
					href="https://commons.wikimedia.org/wiki/File:Veste_Oberhaus_(Passau,_full_spherical_panoramic_image,_equirectangular_projection).jpg"
					>Jürgen Matern / Wikimedia Commons</a
				>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia
				Commons
			</div>
		</div>
	</section>

	<section>
		<header>
			<h4>Indoor larger file example ~13 MB</h4>
			<h5>FOV is 45</h5>
		</header>
		<div class="panorama-wrapper">
			<Panorama
				class="panorama"
				fov={45}
				src="https://upload.wikimedia.org/wikipedia/commons/1/18/Rheingauer_Dom%2C_Geisenheim%2C_360_Panorama_%28Equirectangular_projection%29.jpg"
				alt="Some Indoor Location"
			/>
			<div class="attribute">
				<a
					href="https://commons.wikimedia.org/wiki/File:Rheingauer_Dom,_Geisenheim,_360_Panorama_(Equirectangular_projection).jpg"
					>DXR</a
				>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia
				Commons
			</div>
		</div>
	</section>
</main>

<style>
	main {
		background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='69.282' height='40' patternTransform='scale(2) rotate(30)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(167, 0%, 87%, 1)'/><path d='M34.641-20v80m34.64-40L0-20m69.282 80L0 20m69.282 0L0 60m69.282-80L0 20m69.282-40v80M0-20v80M34.64 40l11.547-20m11.547 20l11.547 20M34.641 40h23.094m11.547-20L57.735 40M46.188 20L34.641 40l11.547 20h23.094L80.83 40 69.282 20H46.188zM34.641 40l11.547-20m11.547 20l11.547 20M34.641 40h23.094m11.547-20L57.735 40M46.188 20L34.641 40l11.547 20h23.094L80.83 40 69.282 20H46.188zM34.641 0l11.547-20M57.735 0l11.547 20M34.642 0h23.093m11.547-20L57.735 0M46.188-20L34.641 0l11.547 20h23.094L80.83 0 69.282-20H46.188zM34.641 40L23.094 20M11.547 40L0 60m34.64-20H11.548M0 20l11.547 20m11.547-20l11.547 20-11.547 20H0l-11.547-20L0 20h23.094zM34.641 0L23.094-20M11.547 0L0 20M34.64 0H11.548M0-20L11.547 0m11.547-20L34.641 0 23.094 20H0L-11.547 0 0-20h23.094z'  stroke-width='0.5' stroke='hsla(63, 0%, 77%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-218,-104)' fill='url(%23a)'/></svg>");
		max-width: 1280px;
		margin: 0 auto;
	}

	p,
	h3,
	h4,
	h5 {
		text-align: center;
	}

	.panorama-wrapper {
		width: 640px;
		height: 320px;
		max-width: 90%;
		max-height: 90%;
		margin: 0 auto;
		position: relative;
		box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
			rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
		padding: 0.25rem;
		background: #fff;
	}

	.panorama-wrapper > :global(.panorama) {
		cursor: grab;
	}

	.attribute {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 0.125rem 0.25rem;
		margin: 0.25rem;
		background: hsla(0, 0%, 100%, 0.6);
	}
</style>
