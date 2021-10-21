import { Renderer } from "ogl";

export default function makeRenderer(canvas, width, height) {
    return new Renderer({
        canvas: canvas,
        width: width,
        height: height,
    });
}