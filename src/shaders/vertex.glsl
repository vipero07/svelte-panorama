attribute vec2 uv;
attribute vec3 position;
attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;
void main(){
    vUv = vec2(1.0 - uv.s, uv.t);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}