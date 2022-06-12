import React from 'react';

import type { Mesh, MeshStandardMaterial, PlaneGeometry, Texture } from 'three';

type RefType = Mesh<PlaneGeometry, MeshStandardMaterial> | null;

interface Props {
  z: number;
  displacement: Texture;
}

export const Terrain = React.forwardRef<RefType, Props>((props, ref) => {
  const { z, displacement } = props;

  return (
    <mesh ref={ref} rotation={[-Math.PI * 0.5, 0, 0]} position={[0, 0, z]}>
      <planeGeometry args={[1, 2, 24, 24]} />
      <meshStandardMaterial
        displacementMap={displacement}
        displacementScale={0.4}
        wireframe
        transparent={true}
        opacity={0}
      />
    </mesh>
  );
});

Terrain.displayName = 'Terrain';
