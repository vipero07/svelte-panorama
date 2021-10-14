<svelte:options tag="svelte-panorama" />

<script context="module">
  import {
    Renderer,
    Program,
    Mesh,
    Camera,
    TextureLoader,
    Sphere,
    Orbit,
  } from "ogl";
  import fragment from "./shaders/fragment.glsl";
  import vertex from "./shaders/vertex.glsl";
</script>

<script>
  import { onMount } from "svelte";

  let className = "";
  export let alt = "Panoramic View";
  export { className as class };
  export let fov = 30;
  export let src;

  let clientHeight;
  let clientWidth;
  let wrapper;
  let canvas;

  let renderer;
  let raf;
  let gl;

  $: aspect = clientWidth / clientHeight;
  $: camera = gl && wrapper && makeCamera();
  $: controls = camera && canvas && makeControls();
  $: scene = src && gl && makeScene();
  $: if (renderer && aspect) {
    renderer.setSize(clientWidth, clientHeight);
  }
  $: if (camera && aspect) {
    camera.perspective({ aspect: aspect });
  }

  function makeCamera() {
    const camera = new Camera(gl, {
      fov: fov,
      aspect: wrapper.clientWidth / wrapper.clientHeight,
    });
    camera.position.set(0, 0, 1);
    return camera;
  }

  function makeControls() {
    return new Orbit(camera, {
      enablePan: false,
      enableZoom: true,
      element: canvas,
      maxDistance: 1,
      minDistance: 0,
    });
  }

  function makeScene() {
    return new Mesh(gl, {
      geometry: new Sphere(gl, {
        radius: 2,
        widthSegments: 64,
      }),
      program: new Program(gl, {
        cullFace: gl.FRONT,
        uniforms: {
          tex: {
            value: TextureLoader.load(gl, {
              src: src,
            }),
          },
        },
        vertex: vertex,
        fragment: fragment,
      }),
    });
  }

  function update() {
    controls.update();
    renderer.render({ scene: scene, camera: camera });
    raf = requestAnimationFrame(update);
  }

  onMount(() => {
    renderer = new Renderer({
      canvas: canvas,
      width: wrapper.clientWidth,
      height: wrapper.clientHeight,
    });

    gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  });
</script>

<div
  aria-label={alt}
  class={className}
  bind:clientHeight
  bind:clientWidth
  bind:this={wrapper}
>
  <canvas bind:this={canvas} />
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
