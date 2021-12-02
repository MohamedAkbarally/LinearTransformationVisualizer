import {
  BoxGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from 'three';

import Label from '../utils/label';

export default class UnitCube extends Mesh {
  constructor() {
    var cubeGeometry = new BoxGeometry(1, 1, 1);
    cubeGeometry.translate(0.5, 0.5, 0.5);
    const cubeMaterial = new MeshBasicMaterial({
      color: 0x00e676,
      opacity: 0.3,
      transparent: true,
    });

    var wireframeGeometry = new EdgesGeometry(cubeGeometry);
    var wireframeMaterial = new LineBasicMaterial({
      color: 0x00c853,
      linewidth: 1,
    });
    var wireframe = new LineSegments(wireframeGeometry, wireframeMaterial);
    wireframe.renderOrder = 1;

    super(cubeGeometry, cubeMaterial);
    this.add(wireframe);

    this.label = new Label(0x00ff00, '1.00', 'cubeLabel');
    this.label.position.set(0.5, 0.5, 0.5);

    this.add(this.label);

    this.setVisibility = (isVisible) => {
      this.visible = isVisible;
      this.label.visible = isVisible;
      return isVisible;
    };

    this.setVisibility(false);

    this.transform = (transformationMatrix) => {
      this.geometry = cubeGeometry.clone().applyMatrix4(transformationMatrix);
      this.children[0].geometry = wireframeGeometry
        .clone()
        .applyMatrix4(transformationMatrix);
      this.label.changeText(
        Math.abs(transformationMatrix.determinant()).toFixed(2)
      );
      this.label.position.set(
        ...new Vector3(0.5, 0.5, 0.5)
          .applyMatrix4(transformationMatrix)
          .toArray()
      );
    };
  }
}
