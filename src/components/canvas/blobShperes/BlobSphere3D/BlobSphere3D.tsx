import vertexShader from './shader/blobSphere3D.vert';
import fragmentShader from './shader/blobSphere3D.frag';
import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  CubeCamera,
  LinearMipMapLinearFilter,
  Mesh,
  RGBAFormat,
  ShaderMaterial,
  SphereGeometry,
  sRGBEncoding,
  WebGLCubeRenderTarget,
} from 'three';
import { breakpoints } from 'utils/media';
import gsap, { Expo } from 'gsap';

export const BlobSphere3D = () => {
  const mesh = useRef<Mesh<SphereGeometry, ShaderMaterial> | null>(null);
  const blobScale = useRef(0);

  const [isBlobAnimated, setIsBlobAnimated] = useState(false);
  const { size, camera } = useThree();
  const cubeRenderTarget = useMemo(
    () =>
      new WebGLCubeRenderTarget(256, {
        format: RGBAFormat,
        generateMipmaps: true,
        minFilter: LinearMipMapLinearFilter,
        encoding: sRGBEncoding,
      }),
    []
  );
  const cubeCamera = useMemo(() => new CubeCamera(0.1, 1200, cubeRenderTarget), [cubeRenderTarget]);

  const uniforms = useMemo(
    () => ({
      tCube: { value: cubeRenderTarget.texture },
      mRefractionRatio: { value: 1.02 },
      mFresnelBias: { value: 0.1 },
      mFresnelScale: { value: 4.0 },
      mFresnelPower: { value: 2.0 },
    }),
    [cubeRenderTarget]
  );

  const setSize = (size: number) => {
    if (mesh.current) {
      mesh.current.scale.set(size, size, size);
    }
  };

  const animateScale = useCallback(
    (width: number) => {
      if (isBlobAnimated) return;
      const obj = { value: blobScale.current };
      gsap.to(obj, {
        value: 1,
        duration: 2,
        delay: 1,
        ease: Expo.easeInOut,
        onUpdate: () => {
          blobScale.current = obj.value;
          let finalSize = width * 0.25;
          if (width >= breakpoints.tabletPortrait) {
            finalSize = width * 0.12;
          }
          setSize(finalSize * blobScale.current);
        },
        onComplete: () => setIsBlobAnimated(true),
      });
    },
    [isBlobAnimated]
  );

  useFrame(state => {
    if (mesh.current) {
      mesh.current.visible = false;
      cubeCamera.update(state.gl, state.scene);
      mesh.current.visible = true;
    }
  });

  useEffect(() => {
    animateScale(size.width);
  }, [animateScale, size.width]);

  useEffect(() => {
    if (!isBlobAnimated) {
      let finalSize = size.width * 0.25;
      if (size.width >= breakpoints.tabletPortrait) {
        finalSize = size.width * 0.12;
      }
      setSize(finalSize * blobScale.current);
    } else {
      setSize(size.width * 0.25);
      if (size.width >= breakpoints.tabletPortrait) {
        setSize(size.width * 0.12);
      }
    }
  }, [size, isBlobAnimated]);

  useEffect(() => {
    camera.position.set(0, 0, 900);
  }, [camera.position]);

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
