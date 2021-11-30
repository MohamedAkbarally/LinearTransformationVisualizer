import { PerspectiveCamera, Vector3 } from 'three';

const FIELD_OF_VIEW = 75;
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const NEAR = 0.1;
const FAR = 1000;

export default class MyCamera extends PerspectiveCamera {
  constructor() {
    super(FIELD_OF_VIEW, ASPECT_RATIO, NEAR, FAR);
    this.position.z = -5;
    this.lookAt(new Vector3(0, 0, 0));
  }
}
