import { Box } from '@mui/system';
import MatrixMenu from './MatrixMenu';
import React from 'react';
import UnitCubeMenu from './UnitCubeMenu';
import VectorMenu from './VectorMenu';

export default function Menu({ addVectorScene }) {
  return (
    <div>
      <MatrixMenu />
      <Box sx={{ m: 2 }} />
      <VectorMenu addVectorScene={addVectorScene} />
      <Box sx={{ m: 2 }} />
      <UnitCubeMenu />
      <Box sx={{ m: 2 }} />
    </div>
  );
}
