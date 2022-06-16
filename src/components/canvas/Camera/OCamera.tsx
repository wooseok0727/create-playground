import { OrthographicCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { OrthographicCamera as OrthographicCameraImpl } from 'three';

export const OCamera = () => {
  const { camera, set } = useThree();
  const cameraRef = useRef<OrthographicCameraImpl | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current });
      camera.updateProjectionMatrix();
    }
  }, [camera, set]);

  return (
    <OrthographicCamera
      ref={cameraRef}
      manual
      position={[0, 0, 2]}
      left={-0.5}
      right={0.5}
      top={0.5}
      bottom={-0.5}
      near={-1000}
      far={1000}
    />
  );
};
