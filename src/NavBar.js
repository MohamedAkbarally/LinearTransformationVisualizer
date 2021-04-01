import { AppBar, Toolbar, Typography } from '@material-ui/core';

import React from 'react';

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Linear Transformation Visaulizer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
