import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useUIStore } from 'store';
import { OCamera } from '../Camera/OCamera';
import { PCamera } from '../Camera/PCamera';
import * as S from './LCanvs.styles';

interface Props {
  children: React.ReactNode;
}

export const LCanvas = (props: Props) => {
  const { children } = props;
  const orbitEnabled = useUIStore(s => s.orbitEnabled);
  const selectCamera = useUIStore(s => s.selectCamera);

  return (
    <S.CanvasWrapper>
      <Canvas
        gl={{ powerPreference: 'default', alpha: true, antialias: true }}
        resize={{ debounce: 300 }}
      >
        {selectCamera === 'PCamera' ? <PCamera /> : <OCamera />}
        <OrbitControls
          enableDamping={true}
          enableZoom={false}
          enablePan={false}
          enabled={orbitEnabled}
        />
        {children}
        {/* <Stats showPanel={0} /> */}
      </Canvas>
    </S.CanvasWrapper>
  );
};
