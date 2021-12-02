const roundArray = (arr) => {
  return arr.map((x) => Number.parseFloat(x).toFixed(2));
};
export default roundArray;
