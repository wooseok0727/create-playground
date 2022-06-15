import { EffectComposer, RenderPass, ShaderPass } from 'three-stdlib';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { DotScreenShader } from './customShader';

extend({ EffectComposer, RenderPass, ShaderPass });

export const Effect = () => {
  const { scene, gl, size, camera } = useThree();
  const composer = useRef<EffectComposer | null>(null);
  const renderPass = useMemo(() => new RenderPass(scene, camera), [scene, camera]);
  const shaderPass = useMemo(() => new ShaderPass(DotScreenShader), []);

  useEffect(() => {
    composer.current?.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    composer.current?.render();
  }, 1);

  return <effectComposer ref={composer} args={[gl]} passes={[renderPass, shaderPass]} />;
};
