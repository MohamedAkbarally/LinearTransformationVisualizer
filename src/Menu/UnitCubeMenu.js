import { IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function UnitCubeMenu({ setSceneVisibility }) {
  const [showUnitCube, setShowUnitCube] = useState(false);

  const toggleUnitCube = () => {
    setShowUnitCube(setSceneVisibility(!showUnitCube));
  };
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={0}>
        <Typography variant="h6" component="div">
          Unit Cube
        </Typography>
        <div>
          <IconButton
            aria-label="delete"
            onClick={toggleUnitCube}
            color="default"
          >
            {showUnitCube ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </div>
      </Stack>
    </div>
  );
}
