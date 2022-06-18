import vertexShader from './shader/CloudsPlane3D.vert';
import fragmentShader from './shader/CloudsPlane3D.frag';
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { InstancedBufferGeometry, Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import { useTexture } from '@react-three/drei';

const PLANE_COUNT = 1500;

export const CloudsPlane3D = () => {
  const { camera, gl } = useThree();
  const mesh = useRef<Mesh<InstancedBufferGeometry, ShaderMaterial> | null>(null);
  const planeGeometry = useMemo(() => new PlaneGeometry(0.5, 0.5, 1, 1), []);
  const texture = useTexture('/images/cloud.png', () => {});

  const [iPos, iRot] = useMemo(() => {
    const iPosArray = new Float32Array(PLANE_COUNT * 3);
    const iRotArray = new Float32Array(PLANE_COUNT);
    const radius = 0.7;
    for (let i = 0; i < PLANE_COUNT; i++) {
      const theta = Math.random() * 2 * Math.PI;
      iPosArray.set(
        [Math.sin(theta) * radius, Math.cos(theta) * radius, -Math.random() * 5],
        3 * i
      );
      iRotArray.set([Math.random() * 2 * Math.PI], i);
    }
    return [iPosArray, iRotArray];
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uImage: { value: texture },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value += delta;
    }
  });

  useIsomorphicLayoutEffect(() => {
    camera.position.set(0, 0, 900);
    // gl.setClearColor(0xe7e2e2, 1);

    // return () => gl.setClearColor(0xffffff, 1);
  }, [camera.position, gl]);

  return (
    <mesh ref={mesh} position={[0, 0, 900]}>
      <instancedBufferGeometry attributes={planeGeometry.attributes} index={planeGeometry.index}>
        <instancedBufferAttribute attach="attributes-iPos" args={[iPos, 3]} />
        <instancedBufferAttribute attach="attributes-iRot" args={[iRot, 1]} />
      </instancedBufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};
