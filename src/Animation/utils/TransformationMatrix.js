import { Matrix3, Matrix4 } from "three";

export default class TransformationMatrix extends Matrix4 {
  constructor() {
    super();
    let original = this.elements;

    this.getFrame = (frame, len) => {
      const animationMatrix = new Matrix4();

      return new Matrix4().fromArray(
        animationMatrix.elements.map(function (item, index) {
          return item + ((original[index] - item) / len) * frame;
        })
      );
    };

    this.getElements = () => {
      return [
        this.transpose().elements.slice(0, 3),
        this.transpose().elements.slice(4, 7),
        this.transpose().elements.slice(8, 11),
      ];
    };

    this.setElements = (values) => {
      this.setFromMatrix3(new Matrix3().set(...values));

      return this.getElements();
    };
  }
}
