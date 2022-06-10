import vertexShader from './shader/sphere3D.vert';
import fragmentShader from './shader/sphere3D.frag';
import React, { useEffect, useRef } from 'react';
import { BackSide, Mesh, ShaderMaterial, SphereGeometry } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export const Sphere3D = () => {
  const mesh = useRef<Mesh<SphereGeometry, ShaderMaterial> | null>(null);
  const { size } = useThree();
  const backGround = useRef({
    color1: [94 / 255, 224 / 255, 221 / 255],
    color2: [106 / 255, 71 / 255, 199 / 255],
    colorAccent: [166 / 255, 134 / 255, 247 / 255],
  });

  const setSize = (size: number) => {
    if (mesh.current) {
      mesh.current.scale.set(size, size, size);
    }
  };

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = delta * 0.001;
    }
  });

  // camera Z 위치로 인해 1000 ( camera를 감싸야 하기 때문에 더 커야 함)
  useEffect(() => {
    setSize(1000);
  }, [size]);

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        side={BackSide}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: backGround.current.color1 },
          uColor2: { value: backGround.current.color2 },
          uColorAccent: { value: backGround.current.colorAccent },
        }}
        wireframe={false}
      />
    </mesh>
  );
};
