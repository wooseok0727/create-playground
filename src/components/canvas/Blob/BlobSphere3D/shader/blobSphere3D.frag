uniform samplerCube uCubeTexture;
uniform float uColorFactor;

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {
  vec4 reflectedColor = textureCube( uCubeTexture, vec3( -vReflect.x, vReflect.yz ) );
  vec4 refractedColor = vec4( 1.0 );

  refractedColor.r = textureCube( uCubeTexture, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;
  refractedColor.g = textureCube( uCubeTexture, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;
  refractedColor.b = textureCube( uCubeTexture, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;

  vec4 finalColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );

  float gray = 0.21 * finalColor.r + 0.71 * finalColor.g + 0.07 * finalColor.b;
  gl_FragColor = vec4( finalColor.rgb * ( 1.0 - uColorFactor ) + ( gray * uColorFactor ), finalColor.a );

}