varying vec2 vUv;
varying float vAlpha;

void main() {

  gl_FragColor = vec4(vUv,0.5,vAlpha);

}