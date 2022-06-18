import vertexShader from './shader/CubesBox3D.vert';
import fragmentShader from './shader/CubesBox3D.frag';
import { useFrame, useThree } from '@react-three/fiber';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import React, { useEffect, useMemo, useRef } from 'react';
import { BoxGeometry, InstancedMesh, Object3D, ShaderMaterial } from 'three';
import { breakpoints } from 'utils/media';

const CUBE_COUNT = 20 * 2;

export const CubesBox3D = () => {
  const { camera, size } = useThree();
  const mesh = useRef<InstancedMesh<BoxGeometry, ShaderMaterial> | null>(null);
  const tempObject = useMemo(() => new Object3D(), []);
  const random = useMemo(() => new Float32Array(CUBE_COUNT ** 3), []);
  const depth = useMemo(() => new Float32Array(CUBE_COUNT ** 3), []);
  const pos = useMemo(() => new Float32Array(3 * CUBE_COUNT ** 3), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  const setSize = (size: number) => {
    if (mesh.current) {
      mesh.current.scale.set(size, size, size);
    }
  };

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.1;
      mesh.current.material.uniforms.uTime.value += delta;
    }
  });

  useEffect(() => {
    if (mesh.current) {
      setSize(size.width * 0.036);
      if (size.width >= breakpoints.tabletPortrait) {
        setSize(size.width * 0.018);
      }
    }
  }, [size]);

  useEffect(() => {
    camera.position.set(800, 1200, 900);
  }, [camera.position]);

  useIsomorphicLayoutEffect(() => {
    if (mesh.current) {
      let i = 0;
      let j = 0;
      for (let x = 0; x < CUBE_COUNT; x++) {
        for (let y = 0; y < CUBE_COUNT; y++) {
          for (let z = 0; z < CUBE_COUNT; z++) {
            tempObject.position.set(x - 20, y - 20, z - 20);
            tempObject.updateMatrix();

            random[i] = Math.random();
            depth[i] = y / CUBE_COUNT;

            pos[j] = x / CUBE_COUNT;
            j++;
            pos[j] = y / CUBE_COUNT;
            j++;
            pos[j] = z / CUBE_COUNT;
            j++;

            mesh.current.setMatrixAt(i++, tempObject.matrix);
          }
        }
      }
      // mesh.current.instanceMatrix.needsUpdate = true;
    }
  }, [tempObject]);

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, CUBE_COUNT ** 3]}>
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute attach="attributes-random" args={[random, 1]} />
        <instancedBufferAttribute attach="attributes-depth" args={[depth, 1]} />
        <instancedBufferAttribute attach="attributes-pos" args={[pos, 3]} />
      </boxGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </instancedMesh>
  );
};
