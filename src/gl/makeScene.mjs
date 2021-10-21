import { Mesh } from "ogl";

export default function makeScene(gl, sphere, program) {
    return new Mesh(gl, {
        geometry: sphere,
        program: program,
    });
}