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
  const blobScale = useRef(1.4);
  const colorFactor = useRef(1);
  const [isBlobAnimated, setIsBlobAnimated] = useState(false);
  const { size } = useThree();
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

  const setSize = (size: number) => {
    if (mesh.current) {
      mesh.current.scale.set(size, size, size);
    }
  };

  const setColorFactor = (value: number) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uColorFactor.value = value;
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

  const animateColorFactor = useCallback(() => {
    if (isBlobAnimated) return;
    const obj = { value: 1 };
    gsap.to(obj, {
      value: 0,
      duration: 2,
      delay: 0.5,
      ease: Expo.easeInOut,
      onUpdate: () => {
        colorFactor.current = obj.value;
        setColorFactor(colorFactor.current);
      },
    });
  }, [isBlobAnimated]);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = delta * 0.001;
      mesh.current.visible = false;
      cubeCamera.update(state.gl, state.scene);
      mesh.current.visible = true;
    }
  });

  useEffect(() => {
    animateScale(size.width);
    animateColorFactor();
  }, [animateScale, animateColorFactor, size.width]);

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

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uCubeTexture: { value: cubeRenderTarget.texture },
          uColorFactor: { value: colorFactor.current },
          uRefractionRatio: { value: 1.02 },
          uFresnelBias: { value: 0.1 },
          uFresnelScale: { value: 4.0 },
          uFresnelPower: { value: 2.0 },
        }}
      />
    </mesh>
  );
};
