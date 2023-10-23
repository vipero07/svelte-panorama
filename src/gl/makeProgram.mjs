import { Program } from "ogl";

export default function makeProgram(gl, texture) {
    return new Program(gl, {
        cullFace: gl.FRONT,
        uniforms: {
            tex: {
                value: texture,
            },
        },
        vertex: /* glsl */`
        attribute vec2 uv;
        attribute vec3 position;
        
        uniform mat4 modelViewMatrix, projectionMatrix;
        
        varying vec2 vUv;
        void main(){
            vUv = vec2(1.0 - uv.s, uv.t);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
        fragment: /* glsl */`
        #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision highp float;
            precision highp int;
        #else
            precision mediump float;
            precision mediump int;
        #endif

        uniform sampler2D tex;
        varying vec2 vUv;

        void main(){
            gl_FragColor = texture2D(tex, vUv);
        }
        `,
    });
}