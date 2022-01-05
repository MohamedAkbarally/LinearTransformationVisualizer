import { PerspectiveCamera, Vector3 } from "three";

const FIELD_OF_VIEW = 60;
const ASPECT_RATIO = 16 / 9;
const NEAR = 0.1;
const FAR = 1000;

export default class MyCamera extends PerspectiveCamera {
  constructor() {
    super(FIELD_OF_VIEW, ASPECT_RATIO, NEAR, FAR);
    this.position.z = -5;
    this.lookAt(new Vector3(0, 0, 0));
  }
}
