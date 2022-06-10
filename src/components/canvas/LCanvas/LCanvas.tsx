import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Camera } from '../Camera/Camera';
import * as S from './LCanvs.styles';

interface Props {
  children: React.ReactNode;
}

type Frameloop = 'always' | 'demand' | 'never';

export const LCanvas = (props: Props) => {
  const { children } = props;
  const [frameloop, setFrameloop] = useState<Frameloop>('always');

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setFrameloop('never');
    } else {
      setFrameloop('always');
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <S.CanvasWrapper>
      <Canvas
        gl={{ powerPreference: 'default', alpha: true, antialias: true }}
        frameloop={frameloop}
        resize={{ debounce: 300 }}
      >
        <Camera />
        <OrbitControls enableDamping={true} enableZoom={false} enablePan={false} />
        {children}
      </Canvas>
    </S.CanvasWrapper>
  );
};
