import * as THREE from 'three';

import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/examples/jsm/renderers/CSS2DRenderer';
import React, { Component } from 'react';
import {
  axisPointsX,
  axisPointsY,
  axisPointsZ,
  gridPoints,
  gridPointsO,
} from './grids';
import {
  axisXDiv,
  axisYDiv,
  axisZDiv,
  determinantDiv,
  vectorDiv,
} from './labels';

import Box from '@material-ui/core/Box';
import { COLOR_LIST } from './colorList';
import { CssBaseline } from '@material-ui/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ReactDOM from 'react-dom';
import SideBar from './SideBar';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

var vectorList = [];
var scene = new THREE.Scene();
const axis = new THREE.Vector3(0, 1, 0);
var t = 0;

var standardGrid,
  transformedGrid,
  axisY,
  axisZ,
  axisX,
  axisYO,
  axisZO,
  axisXO,
  cube,
  cubeClone,
  determinantLabel,
  stepElements,
  animationMatrix;

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const vectorToString = function (vector) {
  return (
    '(' +
    vector.x.toFixed(1) +
    ', ' +
    vector.y.toFixed(1) +
    ', ' +
    vector.z.toFixed(1) +
    ')'
  );
};

const createVector = function (vector, n) {
  const geomCylinder = new THREE.CylinderGeometry(0.08, 0.08, 1, 16, 1);
  const geomTip = new THREE.CylinderGeometry(0.0, 0.15, 0.2, 8, 1);

  geomCylinder.translate(0, 0.5, 0);

  var tip = new THREE.Mesh(
    geomTip,
    new THREE.MeshPhongMaterial({
      color: COLOR_LIST[n],
    })
  );
  var cylinder = new THREE.Mesh(
    geomCylinder,
    new THREE.MeshPhongMaterial({
      color: COLOR_LIST[n],
    })
  );

  cylinder.scale.y = vector.length() - 0.2;
  tip.position.y = vector.length() - 0.1;

  const vectorGroup = new THREE.Group();
  vectorGroup.add(cylinder);
  vectorGroup.add(tip);
  vectorGroup.quaternion.setFromUnitVectors(axis, vector.clone().normalize());

  vectorDiv.textContent = vectorToString(vector);
  vectorDiv.style.color = COLOR_LIST[n];
  const vectorLabel = new CSS2DObject(vectorDiv);
  vectorLabel.position.set(0, 0, 0);
  tip.add(vectorLabel);

  const vectorDict = { mesh: vectorGroup, vector: vector, label: vectorLabel };

  return vectorDict;
};

const transformVector = function (vectorDict, matrix) {
  const tv = vectorDict.vector.clone().applyMatrix4(matrix);
  vectorDict.mesh.children[0].scale.y = tv.length() - 0.2;
  vectorDict.mesh.children[1].position.y = tv.length() - 0.1;
  vectorDict.mesh.quaternion.setFromUnitVectors(axis, tv.clone().normalize());
  vectorDict.label.element.innerText =
    '(' +
    tv.x.toFixed(1) +
    ', ' +
    tv.y.toFixed(1) +
    ', ' +
    tv.z.toFixed(1) +
    ')';
};

class App extends Component {
  constructor(props) {
    super(props);
    const transformationMatrix = new THREE.Matrix4();
    transformationMatrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    this.state = {
      vectors: [],
      transformationMatrix: transformationMatrix,
      play: 'INIT',
      auto: true,
      cube: false,
    };
  }

  updateVectors = (vectors) => {
    this.setState({ vectors: vectors });
  };

  setPlay = () => {
    this.setState({ play: 'PLAY' });
  };

  initGrid = () => {
    //Clear Grid Cube and Axis
    if (cube) {
      cube.remove(cube.children[1]);
    }
    scene.remove(cube);
    if (axisY) {
      axisY.remove(axisY.children[0]);
      axisZ.remove(axisZ.children[0]);
      axisX.remove(axisX.children[0]);
    }

    scene.remove(axisY);
    scene.remove(axisX);
    scene.remove(axisZ);

    scene.remove(standardGrid);
    scene.remove(transformedGrid);

    //Create new lines
    standardGrid = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(gridPointsO),
      new THREE.LineBasicMaterial({ color: 0x202436 })
    );
    transformedGrid = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(gridPoints),
      new THREE.LineBasicMaterial({ color: 0x5c5c5c })
    );
    axisY = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(axisPointsY),
      new THREE.LineBasicMaterial({ color: 0x323066 })
    );
    axisX = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(axisPointsX),
      new THREE.LineBasicMaterial({ color: 0x66303d })
    );
    axisZ = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(axisPointsZ),
      new THREE.LineBasicMaterial({ color: 0x306636 })
    );

    //Set Axis Labels
    const axisZLabel = new CSS2DObject(axisZDiv);
    axisZLabel.position.set(0, 0, 5);
    axisZ.add(axisZLabel);

    const axisXLabel = new CSS2DObject(axisXDiv);
    axisXLabel.position.set(5, 0, 0);
    axisX.add(axisXLabel);

    const axisYLabel = new CSS2DObject(axisYDiv);
    axisYLabel.position.set(0, 5, 0);
    axisY.add(axisYLabel);

    axisYO = axisY.clone();
    axisXO = axisX.clone();
    axisZO = axisZ.clone();

    //unit cube setup
    var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    cubeGeometry.translate(0.5, 0.5, 0.5);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      opacity: 0.3,
      transparent: true,
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    var wireframeGeometry = new THREE.EdgesGeometry(cube.geometry);
    var wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 4,
    });
    var wireframe = new THREE.LineSegments(
      wireframeGeometry,
      wireframeMaterial
    );
    wireframe.renderOrder = 1;
    cube.add(wireframe);
    cubeClone = cube.clone();

    determinantDiv.textContent = '1.00';
    determinantLabel = new CSS2DObject(determinantDiv);
    determinantLabel.element.innerText = '1.00';

    determinantLabel.position.set(0.5, 0.5, 0.5);

    //add Mesh to scene
    if (this.state.cube) {
      cube.add(determinantLabel);
      scene.add(cube);
    }

    scene.add(standardGrid);
    scene.add(transformedGrid);
    scene.add(axisY);
    scene.add(axisX);
    scene.add(axisZ);
  };

  //redraw all vectors
  initVectors = () => {
    var i;
    for (i = 0; i < vectorList.length; i++) {
      vectorList[i].mesh.children[1].remove(vectorList[i].label);
      scene.remove(vectorList[i].mesh);
    }
    vectorList = [];
    for (i = 0; i < this.state.vectors.length; i++) {
      if (
        this.state.vectors[i][0] !== '' &&
        this.state.vectors[i][1] !== '' &&
        this.state.vectors[i][2] !== ''
      ) {
        vectorList.push(
          createVector(new THREE.Vector3(...this.state.vectors[i]), i)
        );
      }
    }

    for (i = 0; i < vectorList.length; i++) {
      scene.add(vectorList[i].mesh);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    //if vectors changed
    if (prevState.vectors !== this.state.vectors) {
      this.initVectors();
    }

    //if matrix changed
    if (prevState.transformationMatrix !== this.state.transformationMatrix) {
      if (!this.state.transformationMatrix.elements.includes('')) {
        animationMatrix = new THREE.Matrix4();
        const transformationMatrix = this.state.transformationMatrix;
        stepElements = animationMatrix.elements.map(function (item, index) {
          return (transformationMatrix.elements[index] - item) / 100;
        });
      }
    }

    //if cube toggle changed
    if (prevState.cube !== this.state.cube) {
      if (this.state.cube) {
        cube.add(determinantLabel);
        scene.add(cube);
      } else {
        cube.remove(determinantLabel);
        scene.remove(cube);
      }
    }
  }

  //reset Animation
  reset = () => {
    const transformationMatrix = this.state.transformationMatrix;
    this.initVectors();
    this.initGrid();
    this.setState({ play: 'INIT' });
    animationMatrix = new THREE.Matrix4();
    stepElements = animationMatrix.elements.map(function (item, index) {
      return (transformationMatrix.elements[index] - item) / 100;
    });
    t = 0;
  };

  updateMatrix = (matrixElement) => {
    var newMatrix = this.state.transformationMatrix.clone();
    newMatrix.elements = matrixElement;
    this.setState({ transformationMatrix: newMatrix });
  };

  componentDidMount() {
    const { transformationMatrix } = this.state;

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
      camera.aspect = (window.innerWidth - 355) / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth - 355, window.innerHeight);
      labelRenderer.setSize(window.innerWidth - 355, window.innerHeight);
    }

    //WebGL Renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth - 355, window.innerHeight);

    this.mount.appendChild(renderer.domElement);

    //Label Renderer
    let labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth - 355, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    this.mount.appendChild(labelRenderer.domElement);

    //Scene intialization
    scene.background = new THREE.Color(0x050505);
    scene.rotation.z = Math.PI;
    var camera = new THREE.PerspectiveCamera(
      1000,
      (window.innerWidth - 355) / window.innerHeight,
      0.8,
      1000
    );

    const controls = new OrbitControls(camera, renderer.domElement);

    //Create the Grid
    this.initGrid();

    //Lighting
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    //Camera postion and movement
    camera.position.y = -2;
    camera.position.z = 15;
    controls.update();

    //Rotation animation
    function checkRotation() {
      var rotSpeed = 0.002;
      var x = camera.position.x,
        z = camera.position.z;
      camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
      camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
      camera.lookAt(0, 0, 0);
      controls.update();
    }

    animationMatrix = new THREE.Matrix4();
    stepElements = animationMatrix.elements.map(function (item, index) {
      return (transformationMatrix.elements[index] - item) / 100;
    });

    var animate = () => {
      if (this.state.auto) {
        checkRotation();
      }
      if (
        t <= 100 &&
        this.state.play !== 'INIT' &&
        this.state.play !== 'ERROR'
      ) {
        animationMatrix.elements = animationMatrix.elements.map(function (
          item,
          index
        ) {
          return stepElements[index] + item;
        });

        var i;
        for (i = 0; i < vectorList.length; i++) {
          transformVector(vectorList[i], animationMatrix);
        }

        transformedGrid.geometry = standardGrid.geometry
          .clone()
          .applyMatrix4(animationMatrix);

        //change color to red for negative determinant
        if (animationMatrix.determinant() < 0) {
          cube.material.color.setHex(0xff0000);
          cube.children[1].element.style.color = '#ff0000';
        }

        //adjust axes
        axisY.geometry = axisYO.geometry.clone().applyMatrix4(animationMatrix);
        axisX.geometry = axisXO.geometry.clone().applyMatrix4(animationMatrix);
        axisZ.geometry = axisZO.geometry.clone().applyMatrix4(animationMatrix);

        //change location of axis labels
        const newCoordsX = new THREE.Vector3(5, 0, 0).applyMatrix4(
          animationMatrix
        );
        const newCoordsY = new THREE.Vector3(0, 5, 0).applyMatrix4(
          animationMatrix
        );
        const newCoordsZ = new THREE.Vector3(0, 0, 5).applyMatrix4(
          animationMatrix
        );

        axisX.children[0].position.set(
          newCoordsX.x,
          newCoordsX.y,
          newCoordsX.z
        );
        axisY.children[0].position.set(
          newCoordsY.x,
          newCoordsY.y,
          newCoordsY.z
        );
        axisZ.children[0].position.set(
          newCoordsZ.x,
          newCoordsZ.y,
          newCoordsZ.z
        );

        //re-shape cube
        if (this.state.cube) {
          cube.geometry = cubeClone.geometry
            .clone()
            .applyMatrix4(animationMatrix);
          cube.children[0].geometry = cubeClone.children[0].geometry
            .clone()
            .applyMatrix4(animationMatrix);
          cube.children[1].element.innerText = animationMatrix
            .determinant()
            .toFixed(2);
          const newCoords = new THREE.Vector3(0.5, 0.5, 0.5).applyMatrix4(
            animationMatrix
          );
          cube.children[1].position.set(newCoords.x, newCoords.y, newCoords.z);
        }

        t++;
      }

      //set animation to done
      if (t === 100) {
        t++;
        this.setState({ play: 'DONE' });
      }

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };

    animate();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex">
          <Box>
            <SideBar
              reset={this.reset}
              auto={this.state.auto}
              toggleAuto={() => {
                this.setState({ auto: !this.state.auto });
              }}
              cube={this.state.cube}
              toggleCube={() => {
                this.setState({ cube: !this.state.cube });
              }}
              vectors={this.state.vectors}
              setPlay={this.setPlay}
              play={this.state.play}
              transformationMatrix={this.state.transformationMatrix}
              updateVectorMesh={this.updateVectors}
              updateMatrixParent={this.updateMatrix}
            />
          </Box>
          <Box flexGrow={1}>
            <div ref={(ref) => (this.mount = ref)} />
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
export default App;
