uniform float uTime;
uniform sampler2D uVideo;
uniform sampler2D uImage;
uniform vec2 uViewport;
uniform float uCircleScale;
uniform float uSwirl;

varying vec2 vUv;

mat2 rot2d (in float angle) {
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

float r (in float a, in float b) { return fract(sin(dot(vec2(a,b),vec2(12.9898,78.233)))*43758.5453); }
float h (in float a) { return fract(sin(dot(a,dot(12.9898,78.233)))*43758.5453); }

float noise (in vec3 x) {
  vec3 p  = floor(x);
  vec3 f  = fract(x);
  f       = f*f*(3.0-2.0*f);
  float n = p.x + p.y*57.0 + 113.0*p.z;
  return mix(mix(mix( h(n+0.0), h(n+1.0),f.x),
                 mix( h(n+57.0), h(n+58.0),f.x),f.y),
             mix(mix( h(n+113.0), h(n+114.0),f.x),
                 mix( h(n+170.0), h(n+171.0),f.x),f.y),f.z);
}

// http://www.iquilezles.org/www/articles/morenoise/morenoise.htm
// http://www.pouet.net/topic.php?post=401468
vec3 dnoise2f (in vec2 p) {
  float i = floor(p.x), j = floor(p.y);
  float u = p.x-i, v = p.y-j;
  float du = 30.*u*u*(u*(u-2.)+1.);
  float dv = 30.*v*v*(v*(v-2.)+1.);
  u=u*u*u*(u*(u*6.-15.)+10.);
  v=v*v*v*(v*(v*6.-15.)+10.);
  float a = r(i,     j    );
  float b = r(i+1.0, j    );
  float c = r(i,     j+1.0);
  float d = r(i+1.0, j+1.0);
  float k0 = a;
  float k1 = b-a;
  float k2 = c-a;
  float k3 = a-b-c+d;
  return vec3(k0 + k1*u + k2*v + k3*u*v,
              du*(k1 + k3*v),
              dv*(k2 + k3*u));
}

float fbm (in vec2 uv) {
  vec2 p = uv;
  float f, dx, dz, w = 0.5;
  f = dx = dz = 0.0;
  for(int i = 0; i < 3; ++i){        
    vec3 n = dnoise2f(uv);
    dx += n.y;
    dz += n.z;
    f += w * n.x / (1.0 + dx*dx + dz*dz);
    w *= 0.86;
    uv *= vec2(1.36);
    uv *= rot2d(1.25 * noise(vec3(p * 0.1, 0.12 * uTime)) +
                0.75 * noise(vec3(p * 0.1, 0.20 * uTime)));
  }
  return f;
}

float fbmLow (in vec2 uv) {
  float f, dx, dz, w = 0.5;
  f = dx = dz = 0.0;
  for(int i = 0; i < 3; ++i){        
    vec3 n = dnoise2f(uv);
    dx += n.y;
    dz += n.z;
    f += w * n.x / (1.0 + dx*dx + dz*dz);
    w *= 0.95;
    uv *= vec2(3);
  }    
  return f;
}

float circle( vec2 uv, float radius, float sharp ) {

  return 1.0 - smoothstep(
    radius - radius * sharp,
    radius + radius * sharp,
    dot( uv, uv ) * 7.0
  );
}

void main() {
  float videoAspect = 1280.0 / 720.0;
  float screenAspect = uViewport.x / uViewport.y;
  vec2 multiplier = vec2( 1.0 );
  vec2 centerVector = vUv - vec2( 0.5 );

  if ( videoAspect > screenAspect ) {
    multiplier = vec2( screenAspect / videoAspect, 1.0 );
  }

  // multiplier = vec2( screenAspect / videoAspect, 1.0 );

  vec2 newUV = ( vUv - vec2( 0.5 ) ) * multiplier + vec2( 0.5 );

  /// ripples
  vec2 noiseUV = ( vUv  - vec2( 0.5 ) ) / vec2( uViewport.y / uViewport.x, 1.0 );

  noiseUV *= rot2d( uTime * 10.5 );

  float swirl = 10.0 * fbm( 
    noiseUV * fbmLow( vec2( length( noiseUV ) - uTime ) )
  );

  noiseUV *= rot2d( -uTime * 4.5 );
  vec2 swirlDistort = fbmLow( noiseUV * swirl ) * centerVector * 15.0;


  // end of ripples

  float circleProgress = circle( noiseUV, uCircleScale , 0.25 + 0.25 * uCircleScale );
  vec2 insideUV = newUV + 0.5 * centerVector * ( 2.0 - uCircleScale );
  vec2 backgroundUV = newUV + uSwirl * 0.1 * swirlDistort - centerVector * circleProgress - 0.5 * centerVector * uCircleScale;

  vec4 video = texture2D( uVideo, insideUV );
  vec4 image = texture2D( uImage, backgroundUV );

  vec4 final = mix( image, video, circleProgress );

  // gl_FragColor = vec4(vUv, 0.0, 1.0);

  // gl_FragColor = vec4( fbm( vUv * 100.0 ), 0.0, 0.0, 1.0 );
  // gl_FragColor = vec4( swirl, 0.0, 0.0, 1.0 );
  // gl_FragColor = vec4( swirlDistort, 0.0, 1.0 );
  gl_FragColor = final;
  // gl_FragColor = video;
  // gl_FragColor = vec4( noiseUV, 0.0, 1.0 );
  // gl_FragColor = vec4( vec3( circleProgress ), 1.0 );
}