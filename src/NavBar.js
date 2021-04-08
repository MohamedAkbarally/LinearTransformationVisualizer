import { AppBar, Toolbar, Typography } from '@material-ui/core';

import React from 'react';
import imgNav from './xyz.png';

export default function NavBar() {
  return (
    <AppBar position="static" style={{ zIndex: 1000 }} elevation={0}>
      <Toolbar>
        <img src={imgNav} width={32} style={{ marginRight: 8 }} />
        <Typography variant="h6" color="inherit">
          Linear Transformation Visualizer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
