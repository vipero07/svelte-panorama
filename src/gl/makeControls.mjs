import { Orbit } from "ogl";

export default function makeControls(camera, canvas) {
    return new Orbit(camera, {
        enablePan: false,
        enableZoom: true,
        //zoomStyle: 0,
        element: canvas,
        maxDistance: 1,
        minDistance: 0,
    });
}