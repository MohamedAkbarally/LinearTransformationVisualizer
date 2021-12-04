import MatrixInput from "./Inputs/MatrixInput";
import React from "react";
import { Typography } from "@mui/material";

export default function MatrixMenu({ transformationMatrix }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom component="div">
        Transformation Matrix
      </Typography>
      <MatrixInput transformationMatrix={transformationMatrix} />
    </div>
  );
}
