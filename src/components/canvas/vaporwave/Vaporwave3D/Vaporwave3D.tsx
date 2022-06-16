import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap, { Linear } from 'gsap';
import { useEffect, useRef } from 'react';
import type { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';
import { Light } from '../Light/Light';
import { Terrain } from '../Terrain/Terrain';

export const Vaporwave3D = () => {
  const terrain1Ref = useRef<Mesh<PlaneGeometry, MeshStandardMaterial> | null>(null);
  const terrain2Ref = useRef<Mesh<PlaneGeometry, MeshStandardMaterial> | null>(null);

  const speedUpTarget = useRef(0);
  const speedUp = useRef(0);
  const timeOffset = useRef(0);

  const { camera } = useThree();

  const displacement = useTexture('/images/displacement.png', () => {
    animateOpacity();
  });

  const animateOpacity = () => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: 1,
      duration: 1,
      ease: Linear.easeInOut,
      onUpdate: () => {
        if (!terrain1Ref.current || !terrain2Ref.current) return;
        terrain1Ref.current.material.opacity = obj.value;
        terrain2Ref.current.material.opacity = obj.value;
      },
    });
  };

  const lerp = (current: number, target: number, speed = 0.1, limit = 0.001) => {
    let change = (target - current) * speed;
    if (Math.abs(change) < limit) {
      change = target - current;
    }
    return change;
  };

  const onMouseDown = () => (speedUpTarget.current = 0.1);
  const onMouseUp = () => (speedUpTarget.current = 0);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    speedUp.current += lerp(speedUp.current, speedUpTarget.current, 0.1, 0.0001);
    timeOffset.current += speedUp.current;
    if (terrain1Ref.current && terrain2Ref.current) {
      terrain1Ref.current.position.z = ((elapsedTime + timeOffset.current) * 0.15) % 2;
      terrain2Ref.current.position.z = (((elapsedTime + timeOffset.current) * 0.15) % 2) - 2;
    }
  });

  useEffect(() => {
    camera.position.set(0, 0.06, 1.1);
    camera.rotation.set(0, 0, 0);
  }, [camera.position, camera.rotation]);

  return (
    <>
      <fog attach="fog" args={[0xffffff, 1, 2.5]} />
      <Light />

      <group onPointerDown={onMouseDown} onPointerUp={onMouseUp} onPointerOut={onMouseUp}>
        <Terrain ref={terrain1Ref} z={0} displacement={displacement} />
        <Terrain ref={terrain2Ref} z={-2} displacement={displacement} />
      </group>
    </>
  );
};
