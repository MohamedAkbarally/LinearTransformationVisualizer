import { Button, Divider, Stack } from '@mui/material';

import React from 'react';

export default function AnimationControlMenu() {
  return (
    <>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Button fullWidth disableElevation variant="contained">
          Play
        </Button>
        <Button fullWidth disableElevation variant="contained">
          Reset
        </Button>
      </Stack>
    </>
  );
}
