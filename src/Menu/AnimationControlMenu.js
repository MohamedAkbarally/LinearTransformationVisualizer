import { Button, Divider, Stack } from '@mui/material';

import React from 'react';

export default function AnimationControlMenu({
  playAnimation,
  resetAnimation,
}) {
  return (
    <>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Button
          fullWidth
          disableElevation
          variant="contained"
          onClick={playAnimation}
        >
          Play
        </Button>
        <Button
          onClick={resetAnimation}
          fullWidth
          disableElevation
          variant="contained"
        >
          Reset
        </Button>
      </Stack>
    </>
  );
}
