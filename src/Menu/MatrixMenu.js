import MatrixInput from './Inputs/MatrixInput';
import React from 'react';
import { Typography } from '@mui/material';

export default function MatrixMenu() {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Transformation Matrix
      </Typography>
      <MatrixInput />
    </>
  );
}
