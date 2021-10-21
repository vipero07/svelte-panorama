import { Sphere } from "ogl";

export default function makeSphere(gl) {
    return new Sphere(gl, {
        radius: 1,
        widthSegments: 64,
    });
}