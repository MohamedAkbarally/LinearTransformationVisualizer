import { identity } from "lodash";
import { Matrix3 } from "three";

export default class TransformationMatrix {
  constructor() {
    this.matrices = [new Matrix3()];
    const eye = new Matrix3().toArray();

    this.getFrame = (frame, len) => {
      return new Matrix3().fromArray(
        this.matrices[0]
          .toArray()
          .map((e, i) => (e - eye[i]) * (frame / len) + eye[i])
      );
    };

    this.updateMatrix = (idx, newMatrix) => {
      this.matrices[idx] = newMatrix;
      return this.matrices[idx];
    };
  }
}
