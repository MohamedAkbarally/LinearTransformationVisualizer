import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

export default class Label extends CSS2DObject {
  constructor(col, text, className) {
    const div = document.createElement('div');
    div.className = className;
    div.textContent = text; //'[' + vec3.toArray().join(' ') + ']';
    div.style.color = col;

    super(div);
    this.div = div;
    this.position.set(0, 0, 0);

    this.changeText = (text) => {
      this.div.textContent = text;
    };

    this.onDelete = () => {
      this.parent.remove(this);
    };
  }
}
