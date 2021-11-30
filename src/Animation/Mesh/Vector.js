import {
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from 'three';

import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import Label from '../utils/label';

const axis_reference = new Vector3(0, 1, 0);
const stemGeometry = new CylinderGeometry(0.08, 0.08, 1, 16, 1);
const tipGeomertry = new CylinderGeometry(0.0, 0.15, 0.2, 8, 1);

stemGeometry.translate(0, 0.5, 0);

export default class Vector extends Group {
  constructor(vec3, color) {
    super();

    this.vec3 = vec3;
    const material = new MeshBasicMaterial({ color: color });
    const stemMesh = new Mesh(stemGeometry, material);
    const tipMesh = new Mesh(tipGeomertry, material);

    this.toString = () => {
      return '[' + this.vec3.toArray().join(' ') + ']';
    };

    this.vectorLabel = new Label(color, this.toString(), 'vectorLabel');
    tipMesh.add(this.vectorLabel);

    const updateGeometry = () => {
      this.clear();

      if (this.vec3.length === 0) return;

      stemMesh.scale.y = this.vec3.length() - 0.2;
      tipMesh.position.y = this.vec3.length() - 0.1;
      this.add(tipMesh);
      this.add(stemMesh);

      this.quaternion.setFromUnitVectors(
        axis_reference,
        this.vec3.clone().normalize()
      );

      this.vectorLabel.changeText(this.toString());
    };

    updateGeometry();

    this.transform = (transformationMatrix) => {
      const vec3Transformed = this.vec3
        .clone()
        .applyMatrix4(transformationMatrix);
      this.children[1].scale.y = vec3Transformed.length() - 0.2;
      this.children[0].position.y = vec3Transformed.length() - 0.1;
      this.quaternion.setFromUnitVectors(
        axis_reference,
        vec3Transformed.clone().normalize()
      );
    };

    this.onChange = (idx, val) => {
      let newVector = this.vec3.toArray();
      newVector[idx] = val;
      this.vec3 = new Vector3(...newVector);
      updateGeometry();
      return this.parent.getVectors();
    };
  }
}
