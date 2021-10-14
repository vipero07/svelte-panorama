<svelte:options tag="svelte-panorama" />

<script context="module">
  // import "@babylonjs/core/Helpers/sceneHelpers";
  // import { ActionManager } from "@babylonjs/core/Actions/actionManager";
  // import { Action } from "@babylonjs/core/Actions/action";

  import "@babylonjs/core/Materials/standardMaterial";
  import { Scene } from "@babylonjs/core/scene";
  import { Engine } from "@babylonjs/core/Engines/engine";
  import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
  import { PhotoDome } from "@babylonjs/core/Helpers/photoDome";
  import { Vector3 } from "@babylonjs/core/Maths/math.vector";
  import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents";

  const halfPi = Math.PI / 2;
  const options = { resolution: 32, size: 1000, useDirectMapping: false };
</script>

<script>
  import { onMount } from "svelte";

  let className = "";
  export let alt = "Panoramic View";
  export { className as class };
  export let src;

  /** @type {number} */
  let clientHeight;

  /** @type {number} */
  let clientWidth;

  /** @type {HTMLCanvasElement} */
  let canvas;

  /** @type {Engine} */
  let engine;

  /** @type {number} */
  let zoomLevel = 1;

  $: aspect = clientWidth / clientHeight;
  $: if (aspect) {
    engine.resize();
  }

  // /**
  //  *
  //  * @param scene {Scene}
  //  */
  // function addVr(scene) {
  //   const vrHelper = scene.createDefaultVRExperience();
  //   scene.actionManager = new ActionManager(scene);
  //   scene.actionManager.registerAction(
  //     Action.ExecuteCodeAction(
  //       {
  //         trigger: ActionManager.OnKeyDownTrigger,
  //         parameters: "s",
  //       },
  //       vrHelper.enterVR
  //     )
  //   );
  //   scene.actionManager.registerAction(
  //     Action.ExecuteCodeAction(
  //       { trigger: ActionManager.OnKeyDownTrigger, parameters: "e" },
  //       () => {
  //         vrHelper.exitVR();
  //         document.exitFullscreen();
  //       }
  //     )
  //   );
  // }

  function createScene() {
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
      "Camera",
      -halfPi,
      halfPi,
      5,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);
    camera.inputs.attached.mousewheel.detachControl(canvas);
    const dome = new PhotoDome(alt, src, options, scene);

    scene.registerAfterRender(() => {
      dome.fovMultiplier = zoomLevel;
    });

    scene.onPointerObservable.add((e) => {
      if (dome === undefined) {
        return;
      }
      const newZoom = zoomLevel + e.event.wheelDelta * -0.0005;
      zoomLevel = Math.min(Math.max(newZoom, 0.6), 2);
    }, PointerEventTypes.POINTERWHEEL);

    return scene;
  }

  onMount(() => {
    engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });
    const scene = createScene();
    //addVr(scene);
    engine.runRenderLoop(() => scene.render());
    return () => engine.stopRenderLoop();
  });
</script>

<canvas
  aria-label={alt}
  class={className}
  bind:clientHeight
  bind:clientWidth
  bind:this={canvas}
/>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
