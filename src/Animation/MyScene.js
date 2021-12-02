import Grid from './Mesh/Grid';
import { Scene } from 'three';
import UnitCube from './Mesh/UnitCube';
import Vector from './Mesh/Vector';
import colorIterator from './utils/colorIterator';
import randomVector from './utils/randomVector';

export default class MyScene extends Scene {
  constructor() {
    super();
    this.colorIterator = colorIterator();
    this.unitCube = new UnitCube();

    this.add(
      new Grid(3, 0.1, 0xdbdbdb),
      new Grid(3, 1, 0x8c8c8c),
      this.unitCube
    );

    this.getVectors = () => {
      return this.children
        .filter((obj) => obj instanceof Vector)
        .map((vec) => {
          return vec;
        });
    };

    this.addVector = () => {
      const newVector = new Vector(
        randomVector(),
        this.colorIterator.next().value
      );
      this.add(newVector);
      return this.getVectors();
    };

    this.deleteVector = (vec) => {
      this.remove(vec);
      return this.getVectors();
    };

    this.transform = (transformationMatrix) => {
      this.children.forEach((obj) => obj.transform(transformationMatrix));
    };
  }
}
