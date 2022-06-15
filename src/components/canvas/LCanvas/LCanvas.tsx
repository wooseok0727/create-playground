import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useUIStore } from 'store';
import { Camera } from '../Camera/Camera';
import * as S from './LCanvs.styles';

interface Props {
  children: React.ReactNode;
}

export const LCanvas = (props: Props) => {
  const { children } = props;
  const orbitEnabled = useUIStore(s => s.orbitEnabled);

  return (
    <S.CanvasWrapper>
      <Canvas
        gl={{ powerPreference: 'default', alpha: true, antialias: true }}
        resize={{ debounce: 300 }}
      >
        <Camera />
        <OrbitControls
          enableDamping={true}
          enableZoom={false}
          enablePan={false}
          enabled={orbitEnabled}
        />
        {children}
      </Canvas>
    </S.CanvasWrapper>
  );
};
