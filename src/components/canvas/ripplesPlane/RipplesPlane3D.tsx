import vertexShader from './shader/RipplesPlane3D.vert';
import fragmentShader from './shader/RipplesPlane3D.frag';
import { useTexture } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Mesh, PlaneGeometry, ShaderMaterial, Vector2, VideoTexture } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export const RipplesPlane3D = () => {
  const mesh = useRef<Mesh<PlaneGeometry, ShaderMaterial> | null>(null);
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
      uCircleScale: { value: 0.5 },
      uImage: { value: texture },
      uViewport: { value: new Vector2(window.innerWidth, window.innerHeight) },
      uVideo: { value: videoTexture },
    }),
    [videoTexture, texture]
  );

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value += delta * 0.5;
    }
  });

  useEffect(() => {
    void video.play();
  }, [video]);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.material.uniforms.uViewport.value = new Vector2(size.width, size.height);
    }
  }, [size]);

  return (
    <mesh ref={mesh}>
      <planeGeometry />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
