import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

export default class MyCube extends Mesh {
  constructor() {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    super(geometry, material);
  }
}
