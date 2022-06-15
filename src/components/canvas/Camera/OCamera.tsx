import { OrthographicCamera } from '@react-three/drei';

export const OCamera = () => {
  return (
    <OrthographicCamera
      makeDefault
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
