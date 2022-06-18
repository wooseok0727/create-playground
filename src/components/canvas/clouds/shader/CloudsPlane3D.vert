attribute vec3 iPos;
attribute float iRot;

uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying float vAlpha;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}

void main() {
  vUv = uv;

  float depth = 5.0;

  vec3 newPos = position;

  
  newPos = rotate(newPos, vec3(0.0, 0.0, 1.0), iRot);
  newPos += iPos;

  newPos.z = -mod(newPos.z - uTime * 0.2, 5.0);

  vPosition = newPos;
  vAlpha = smoothstep(-5.0, -4.0, newPos.z);

  gl_Position = projectionMatrix * modelViewMatrix  * vec4( newPos, 1.0 );
}