import vertexShader from './shader/RipplesPlane3D.vert';
import fragmentShader from './shader/RipplesPlane3D.frag';
import { useTexture } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Mesh, PlaneGeometry, ShaderMaterial, Vector2, VideoTexture } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';

export const RipplesPlane3D = () => {
  const mesh = useRef<Mesh<PlaneGeometry, ShaderMaterial> | null>(null);
  const circleScale = useRef(0);
  const swirl = useRef(0.01);
  const downTl = useRef<GSAPTimeline | null>(null);
  const upTl = useRef<GSAPTimeline | null>(null);
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: '/images/black.mp4',
      crossOrigin: 'Anonymous',
      playsInline: true,
      preload: 'metadata',
      loop: true,
      muted: true,
    })
  );

  const { size } = useThree();

  const texture = useTexture('/images/tokyo.jpg', () => {});

  const videoTexture = useMemo(() => new VideoTexture(video), [video]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSwirl: { value: swirl.current },
      uCircleScale: { value: circleScale.current },
      uImage: { value: texture },
      uViewport: { value: new Vector2(window.innerWidth, window.innerHeight) },
      uVideo: { value: videoTexture },
    }),
    [videoTexture, texture]
  );

  const onPointerDown = () => {
    upTl.current?.kill();
    downTl.current = gsap.timeline();

    downTl.current.to(
      circleScale,
      {
        duration: 1.5,
        current: 2,
        overwrite: true,
        onUpdate: () => {
          if (mesh.current) {
            mesh.current.material.uniforms.uCircleScale.value = circleScale.current;
          }
        },
      },
      0
    );

    downTl.current.to(
      swirl,
      {
        duration: 1.5,
        current: 1,
        overwrite: true,
        onUpdate: () => {
          if (mesh.current) {
            mesh.current.material.uniforms.uSwirl.value = swirl.current;
          }
        },
      },
      0
    );
  };

  const onPointerUp = () => {
    downTl.current?.kill();
    upTl.current = gsap.timeline();

    upTl.current.to(
      circleScale,
      {
        duration: 0.75,
        current: 0,
        overwrite: true,
        onUpdate: () => {
          if (mesh.current) {
            mesh.current.material.uniforms.uCircleScale.value = circleScale.current;
          }
        },
      },
      0
    );

    upTl.current.to(
      swirl,
      {
        duration: 1.75,
        current: 0.01,
        overwrite: true,
        onUpdate: () => {
          if (mesh.current) {
            mesh.current.material.uniforms.uSwirl.value = swirl.current;
          }
        },
      },
      0
    );
  };

  useFrame((state, delta) => {
    if (mesh.current && !video.paused) {
      mesh.current.material.uniforms.uTime.value += delta * 0.5;
    }
  });

  useIsomorphicLayoutEffect(() => {
    void video.play();
  }, [video]);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.material.uniforms.uViewport.value = new Vector2(size.width, size.height);
    }
  }, [size]);

  return (
    <mesh ref={mesh} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      <planeGeometry />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
