import * as THREE from 'three';

var i;
export var gridPoints = [];
for (i = -5; i < 6; i++) {
  if (i !== 0) {
    gridPoints.push(new THREE.Vector3(-5, i, 0));
    gridPoints.push(new THREE.Vector3(5, i, 0));
    gridPoints.push(new THREE.Vector3(0, i, -5));
    gridPoints.push(new THREE.Vector3(0, i, 5));
    gridPoints.push(new THREE.Vector3(i, -5, 0));
    gridPoints.push(new THREE.Vector3(i, 5, 0));
    gridPoints.push(new THREE.Vector3(i, 0, -5));
    gridPoints.push(new THREE.Vector3(i, 0, 5));
    gridPoints.push(new THREE.Vector3(-5, 0, i));
    gridPoints.push(new THREE.Vector3(5, 0, i));
    gridPoints.push(new THREE.Vector3(0, -5, i));
    gridPoints.push(new THREE.Vector3(0, 5, i));
  } else {
    gridPoints.push(new THREE.Vector3(-5, i, 0));
    gridPoints.push(new THREE.Vector3(0, i, 0));
    gridPoints.push(new THREE.Vector3(0, i, -5));
    gridPoints.push(new THREE.Vector3(0, i, 0));
    gridPoints.push(new THREE.Vector3(i, -5, 0));
    gridPoints.push(new THREE.Vector3(i, 0, 0));
    gridPoints.push(new THREE.Vector3(i, 0, -5));
    gridPoints.push(new THREE.Vector3(i, 0, 0));
    gridPoints.push(new THREE.Vector3(-5, 0, i));
    gridPoints.push(new THREE.Vector3(0, 0, i));
    gridPoints.push(new THREE.Vector3(0, -5, i));
    gridPoints.push(new THREE.Vector3(0, 0, i));
  }
}

export var gridPointsO = [];
for (i = -5; i < 6; i++) {
  gridPointsO.push(new THREE.Vector3(-5, i, 0));
  gridPointsO.push(new THREE.Vector3(5, i, 0));
  gridPointsO.push(new THREE.Vector3(0, i, -5));
  gridPointsO.push(new THREE.Vector3(0, i, 5));
  gridPointsO.push(new THREE.Vector3(i, -5, 0));
  gridPointsO.push(new THREE.Vector3(i, 5, 0));
  gridPointsO.push(new THREE.Vector3(i, 0, -5));
  gridPointsO.push(new THREE.Vector3(i, 0, 5));
  gridPointsO.push(new THREE.Vector3(-5, 0, i));
  gridPointsO.push(new THREE.Vector3(5, 0, i));
  gridPointsO.push(new THREE.Vector3(0, -5, i));
  gridPointsO.push(new THREE.Vector3(0, 5, i));
}

export var axisPointsY = [];
axisPointsY.push(new THREE.Vector3(0, 0, 0));
axisPointsY.push(new THREE.Vector3(0, 5, 0));

export var axisPointsX = [];
axisPointsX.push(new THREE.Vector3(0, 0, 0));
axisPointsX.push(new THREE.Vector3(5, 0, 0));

export var axisPointsZ = [];
axisPointsZ.push(new THREE.Vector3(0, 0, 0));
axisPointsZ.push(new THREE.Vector3(0, 0, 5));
