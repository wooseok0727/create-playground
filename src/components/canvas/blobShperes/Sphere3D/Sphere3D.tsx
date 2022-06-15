import vertexShader from './shader/sphere3D.vert';
import fragmentShader from './shader/sphere3D.frag';
import React, { useRef } from 'react';
import { BackSide, Mesh, ShaderMaterial, SphereGeometry } from 'three';
import { useFrame } from '@react-three/fiber';

export const Sphere3D = () => {
  const mesh = useRef<Mesh<SphereGeometry, ShaderMaterial> | null>(null);
  const backGround = useRef({
    color1: [120 / 255, 158 / 255, 113 / 255],
    color2: [224 / 255, 148 / 255, 66 / 255],
    colorAccent: [0 / 255, 0 / 255, 0 / 255],
  });

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh ref={mesh} scale={1000}>
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
      />
    </mesh>
  );
};
