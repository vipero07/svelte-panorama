# svelte-panorama-component

Lightweight standalone 360 degree panorama web component that leverages webgl to project an equirectangular image onto an HTML canvas. This is web component so it can be leveraged in any project (react, vue, angular, svelte, or just plain HTML). The intent of this component is to be small in final size, very fast, and easy to use. Minified it is under 63KB. Compare this to three.js (commonly used to achieve the same effect, or most similar panorama only libraries that actually use three.js under the hood) which sits minified at 588KB. It should be noted this is not a replacement for three.js which functions as an excellent 3d framework since this has a very specific use case.

## Attributes

- src: exactly the same as src for an <img> image formats that should work are listed in [OGL's TextureLoader](https://github.com/oframe/ogl/blob/0da03dd187f585d74975a50888dca0f75c3e409a/src/extras/TextureLoader.js#L81) it is required. For the component to work correctly it needs to be an equirectangular image.
- alt: an aria-label applied to the element, this defaults to "Panoramic View" and can be ignored.

## Usage

### Svelte

```
<script>
  import Panorama from 'svelte-panorama-component';
</script>

<Panorama src="some-equirectangular-360-image.jpg" alt="Pretty Sky" />
```

### Anything else as a web component

[custom elements everywhere](https://custom-elements-everywhere.com/)

Add .js or .mjs file however you want, either in a bundler or directly to the page via Script tag, then...

```
<svelte-panorama src="some-equirectangular-360-image.jpg" alt="Pretty Sky"></svelte-panorama>
```
