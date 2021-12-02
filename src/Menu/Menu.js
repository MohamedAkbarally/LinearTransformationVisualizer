import AnimationControlMenu from './AnimationControlMenu';
import { Box } from '@mui/system';
import MatrixMenu from './MatrixMenu';
import React from 'react';
import UnitCubeMenu from './UnitCubeMenu';
import VectorMenu from './VectorMenu';

export default function Menu({ playAnimation, resetAnimation }) {
  return (
    <div>
      <MatrixMenu />
      <Box sx={{ m: 2 }} />
      <VectorMenu />
      <Box sx={{ m: 2 }} />
      <UnitCubeMenu />
      <Box sx={{ m: 2 }} />
      <AnimationControlMenu
        playAnimation={playAnimation}
        resetAnimation={resetAnimation}
      />
    </div>
  );
}
