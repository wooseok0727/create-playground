import { PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import { useEffect, useRef, useState } from 'react';
import { PerspectiveCamera as PerspectiveCameraImpl } from 'three';

export const PCamera = () => {
  const [height, setHeight] = useState(0);
  const cameraRef = useRef<PerspectiveCameraImpl | null>(null);
  const { set } = useThree();

  const handleResize = () => setHeight(window.innerHeight);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current });
    }
  }, [set]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 900]}
      near={0.1}
      far={2000}
      fov={2 * Math.atan(height / 2 / 900) * (180 / Math.PI)}
    />
  );
};
