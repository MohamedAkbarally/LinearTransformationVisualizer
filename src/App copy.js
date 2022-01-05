import { Matrix3, Matrix4, WebGLRenderer } from "three";
import React, { useEffect, useRef } from "react";

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

const ANIMATION_LENGTH = 100;
const ANIMATION_STOP = -1;
const ANIMATION_START = 0;

const MENU_WIDTH = 450;

export default function App() {
  const rendererEl = useRef(null);

  var scene = new MyScene();
  scene.addVector(1, 1, 1);

  var camera = new MyCamera();

  var renderer = new WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xe8e8e8);

  let labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = "labelRenderer";

  const controls = new OrbitControls(camera, renderer.domElement);

  let transformationMatrix = new TransformationMatrix();

  let frame = ANIMATION_STOP;

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();

    if (frame <= ANIMATION_LENGTH && frame >= ANIMATION_START) {
      frame++;
      console.log(transformationMatrix.matrices);
      scene.transform(transformationMatrix.getFrame(frame, ANIMATION_LENGTH));
    }

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  };

  useEffect(() => {
    rendererEl.current.appendChild(labelRenderer.domElement);
    rendererEl.current.appendChild(renderer.domElement);
    controls.domElement = rendererEl.current;

    renderer.setSize(
      rendererEl.current.clientWidth,
      rendererEl.current.clientHeight
    );
    labelRenderer.setSize(
      rendererEl.current.clientWidth,
      rendererEl.current.clientHeight
    );

    renderer.render(scene, camera);
    animate();
  });

  const resetAnimation = () => {
    scene.transform(new Matrix3());
    frame = ANIMATION_STOP;
  };

  const playAnimation = () => {
    console.log(transformationMatrix.matrices);
    frame = ANIMATION_START;
  };

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
          <div ref={rendererEl} style={{ height: "100%" }} />
        </Box>
      </Box>
    </>
  );
}
