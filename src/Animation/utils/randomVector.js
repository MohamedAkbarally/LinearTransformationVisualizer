import { Vector3 } from 'three';

const randomNumber = (size, dec) => {
  return (Math.random() * 2 * size - size).toFixed(dec);
};

const DECIMAL_PLACES = 2;
const MAX_LENGTH = 3;

const randomVector = () => {
  return new Vector3(
    randomNumber(MAX_LENGTH, DECIMAL_PLACES),
    randomNumber(MAX_LENGTH, DECIMAL_PLACES),
    randomNumber(MAX_LENGTH, DECIMAL_PLACES)
  );
};

export default randomVector;
