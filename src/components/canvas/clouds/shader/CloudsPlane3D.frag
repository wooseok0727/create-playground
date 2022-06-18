uniform sampler2D uImage;

varying vec3 vPosition;
varying vec2 vUv;
varying float vAlpha;

void main() {

  vec3 color = vec3(0.835, 0.000, 0.564);
  vec4 map = texture2D(uImage, vUv);

  if(map.r < 0.4) discard;

  vec3 final = mix(vec3(1.0), color, 1.0 - map.r);

  float opacity = smoothstep(0.5, 1.0, length(vPosition.xy));

  // gl_FragColor = vec4(vUv,0.5,vAlpha);
  gl_FragColor = vec4(final, vAlpha * opacity * 0.5);
}