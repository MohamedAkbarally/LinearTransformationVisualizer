import { Matrix3, Matrix4, WebGLRenderer } from "three";
import React, { useEffect, useRef, useState } from "react";

import { Box } from "@mui/system";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import Menu from "./Menu/Menu.js";
import MyCamera from "./Animation/MyCamera";
import MyScene from "./Animation/MyScene";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TransformationMatrix from "./Animation/utils/TransformationMatrix";
import MatrixMenu from "./Menu/MatrixMenu.js";
import VectorMenu from "./Menu/VectorMenu.js";
import UnitCubeMenu from "./Menu/UnitCubeMenu.js";
import AnimationControlMenu from "./Menu/AnimationControlMenu.js";
import MatrixInput from "./Menu/Inputs/MatrixInput.js";


export default function App() {
  const [animation, setAnimation] = useState({
    vectors: [],
    unitCube: false,
    transformation: new Matrix3(),
    status = 'RESET'
  });
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box style={{ width: MENU_WIDTH }} p={2}>
          <Menu>
            <MatrixMenu>
              {transformationMatrix.matrices.map((matrix, idx) => (
                <MatrixInput
                  updateMatrix={(m) =>
                    transformationMatrix.updateMatrix(idx, m)
                  }
                  matrix={matrix}
                />
              ))}
            </MatrixMenu>

            <VectorMenu
              getVectorsInScene={scene.getVectors}
              addVectorToScene={scene.addVector}
            />
            <UnitCubeMenu setSceneVisibility={scene.unitCube.setVisibility} />
            <AnimationControlMenu
              playAnimation={playAnimation}
              resetAnimation={resetAnimation}
            />
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1 }} p={2}>
          <div style={{ height: "100%" }} />
        </Box>
      </Box>
    </>
  );
}
