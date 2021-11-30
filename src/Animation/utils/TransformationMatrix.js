import { Matrix4 } from 'three';

export default class TransformationMatrix extends Matrix4 {
  constructor(elements) {
    super();
    this.elements = elements;
    this.set(...elements);

    this.getFrame = (frame, len) => {
      const animationMatrix = new Matrix4();
      return new Matrix4().fromArray(
        animationMatrix.elements.map(function (item, index) {
          return item + ((elements[index] - item) / len) * frame;
        })
      );
    };
  }
}
