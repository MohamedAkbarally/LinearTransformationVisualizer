import {
  BufferGeometry,
  LineBasicMaterial,
  LineSegments,
  Vector3,
} from 'three';

const createGridPoints = (lim, inc) => {
  const gridPoints = [];
  const n_lim = -1 * lim;
  for (var i = n_lim; i <= lim; i += inc) {
    gridPoints.push(new Vector3(n_lim, i, 0));
    gridPoints.push(new Vector3(lim, i, 0));

    gridPoints.push(new Vector3(0, i, n_lim));
    gridPoints.push(new Vector3(0, i, lim));

    gridPoints.push(new Vector3(i, n_lim, 0));
    gridPoints.push(new Vector3(i, lim, 0));

    gridPoints.push(new Vector3(i, 0, n_lim));
    gridPoints.push(new Vector3(i, 0, lim));

    gridPoints.push(new Vector3(n_lim, 0, i));
    gridPoints.push(new Vector3(lim, 0, i));

    gridPoints.push(new Vector3(0, n_lim, i));
    gridPoints.push(new Vector3(0, lim, i));
  }
  return gridPoints;
};

export default class Grid extends LineSegments {
  constructor(lim, inc, col) {
    const geometry = new BufferGeometry().setFromPoints(
      createGridPoints(lim, inc)
    );
    const material = new LineBasicMaterial({
      color: col,
      depthTest: false,
    });

    super(geometry, material);

    this.transform = (transformationMatrix) => {
      this.geometry = geometry.clone().applyMatrix4(transformationMatrix);
    };
  }
}
