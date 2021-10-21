<svelte:options tag="svelte-panorama" />

<script context="module">
  import {
    loadTextureAsync,
    makeRenderer,
    makeSphere,
    makeCamera,
    makeControls,
    makeProgram,
    makeScene,
  } from "./gl";
</script>

<script>
  import { onMount } from "svelte";

  let className = "";
  export let alt = "Panoramic View";
  export { className as class };
  export let fov = 30;
  export let src;

  let wrapper;
  let canvas;
  let raf;

  onMount(() => {
    const loader = loadTextureAsync(src);
    const { clientWidth, clientHeight } = wrapper;
    const renderer = new makeRenderer(canvas, clientWidth, clientHeight);

    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    const sphere = makeSphere(gl);
    const camera = makeCamera(gl, fov, clientWidth, clientHeight);
    const controls = makeControls(camera, canvas);

    const resizeObserver = new ResizeObserver((entries) =>
      entries.every(({ target: { clientWidth, clientHeight } }) => {
        renderer.setSize(clientWidth, clientHeight);
        camera.perspective({ aspect: clientWidth / clientHeight });
      })
    );
    resizeObserver.observe(wrapper);

    loader.then((loaded) => {
      const texture = loaded(gl);
      const program = makeProgram(gl, texture);
      const scene = makeScene(gl, sphere, program);

      function update() {
        controls.update();
        renderer.render({ scene: scene, camera: camera });
        raf = requestAnimationFrame(update);
      }

      raf = requestAnimationFrame(update);
    });

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.unobserve(wrapper);
      resizeObserver.disconnect();
    };
  });
</script>

<div aria-label={alt} class={className} bind:this={wrapper}>
  <canvas bind:this={canvas} />
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
