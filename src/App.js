import { Matrix4, WebGLRenderer } from 'three';
import React, { useEffect, useRef } from 'react';

import { Box } from '@mui/system';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import Menu from './Menu/Menu.js';
import MyCamera from './Animation/MyCamera';
import MyScene from './Animation/MyScene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SceneContext } from './SceneContext.js';
import TransformationMatrix from './Animation/utils/TransformationMatrix';

const ANIMATION_LENGTH = 100;
const ANIMATION_STOP = -1;
const ANIMATION_START = 0;

export default function App() {
  const rendererEl = useRef(null);

  var scene = new MyScene();
  scene.addVector(1, 1, 1);
  var camera = new MyCamera();

  var renderer = new WebGLRenderer({ antialias: true });

  let labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = 'labelRenderer';
  const controls = new OrbitControls(camera, renderer.domElement);

  const transformationMatrix = new TransformationMatrix([
    1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2,
  ]);

  let frame = ANIMATION_STOP;
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();

    if (frame <= ANIMATION_LENGTH && frame >= ANIMATION_START) {
      frame++;
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
    renderer.setClearColor(0xe8e8e8);

    animate();
  });

  const resetAnimation = () => {
    scene.transform(new Matrix4());
    frame = ANIMATION_STOP;
  };

  const playAnimation = () => {
    frame = ANIMATION_START;
  };

  return (
    <>
      <SceneContext.Provider value={scene}>
        <Box sx={{ flexGrow: 1 }} style={{ height: '100vh' }}>
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Box p={2} style={{ width: 450 }}>
              <Menu
                playAnimation={playAnimation}
                resetAnimation={resetAnimation}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: '100%',
                position: 'relative',
                borderRadius: 100,
              }}
              p={2}
            >
              <div
                ref={rendererEl}
                style={{ height: '100%', borderRadius: 100 }}
              />
            </Box>
          </Box>
        </Box>
      </SceneContext.Provider>
    </>
  );
}
