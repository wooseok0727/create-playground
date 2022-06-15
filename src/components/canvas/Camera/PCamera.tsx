import { PerspectiveCamera } from '@react-three/drei';
import { useEffect, useState } from 'react';

export const PCamera = () => {
  const [height, setHeight] = useState(0);

  const handleResize = () => setHeight(window.innerHeight);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0, 900]}
      near={0.1}
      far={2000}
      fov={2 * Math.atan(height / 2 / 900) * (180 / Math.PI)}
    />
  );
};
