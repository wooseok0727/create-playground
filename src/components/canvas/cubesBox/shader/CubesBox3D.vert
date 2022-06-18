attribute float random;
attribute float depth;
attribute vec3 pos;

uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying float vDepth;
varying float vHidden;

#pragma glslify: snoise = require('glsl-noise/simplex/4d')

void main() {
  vUv = uv;
  vDepth = depth;

  float noise = snoise(vec4( pos * 2.0, uTime / 3.0 ));
  
  noise = step(noise, 0.2);
  vHidden = noise;

  // vec3 newPos = position * abs( sin( pos.x * 3.0 + pos.y * 3.0 + pos.z * 3.0 + uTime ));
  vec3 newPos = position;

  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4( newPos, 1.0 );
}