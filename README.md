# svelte-panorama-component

Lightweight standalone responsive 360 degree panorama web component that leverages webgl to project an equirectangular image onto an HTML canvas. This is web component so it can be leveraged in any project (react, vue, angular, svelte, or just plain HTML). The intent of this component is to be small in final size, very fast, and easy to use. Minified it is under 63KB. Compare this to three.js (commonly used to achieve the same effect, or most similar panorama only libraries that actually use three.js under the hood) which sits minified at 588KB. It should be noted this is not a replacement for three.js which functions as an excellent 3d framework since this has a very specific use case.

## Attributes

- src: exactly the same as src for an <img> image formats that should work are listed in [OGL's TextureLoader](https://github.com/oframe/ogl/blob/0da03dd187f585d74975a50888dca0f75c3e409a/src/extras/TextureLoader.js#L81) it is required. For the component to work correctly it needs to be an equirectangular image.
- alt: an aria-label applied to the element, this defaults to "Panoramic View" and can be ignored, but is for accessibility.
- class: exactly what you would expect, puts a class on the canvas wrapper this can be used to override the default 100% width and height
- fov: accepts an integer and indicates the field of view in degrees of the projection defaults to 30.

## Usage

### Svelte

```
<script>
  import Panorama from 'svelte-panorama-component';
</script>

<Panorama src="some-equirectangular-360-image.jpg" alt="Pretty Sky" />
```

*Important* You will need to use a glsl loader plugin to use this way. See Issue [#3](https://github.com/vipero07/svelte-panorama/issues/3)
 - rollup [rollup-plugin-glslify](https://www.npmjs.com/package/rollup-plugin-glslify)
 - vite / sveltekit [vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl)

Check `svelte-kit-example/src/routes/+page.svelte` and `svelte-kit-example/vite.config.js` for svelte-kit details. Check `rollup.config.mjs` for rollup details.

### Anything else as a web component

[custom elements everywhere](https://custom-elements-everywhere.com/)

Add .js or .mjs file however you want, either in a bundler or directly to the page via Script tag, then...

```
<svelte-panorama src="some-equirectangular-360-image.jpg" alt="Pretty Sky"></svelte-panorama>
```

A sample of the web component working can be found on [here](https://vipero07.github.io/svelte-panorama/) using the following images [outdoor 360](<https://commons.wikimedia.org/wiki/File:Veste_Oberhaus_(Passau,_full_spherical_panoramic_image,_equirectangular_projection).jpg>) and [indoor 360](<https://commons.wikimedia.org/wiki/File:Rheingauer_Dom,_Geisenheim,_360_Panorama_(Equirectangular_projection).jpg>)

Feel free to check out the source of that page at [docs/index.html](https://github.com/vipero07/svelte-panorama/blob/master/docs/index.html)
