const COLOR_LIST = [
  '#e57373',
  '#9575cd',
  '#4fc3f7',
  '#81c784',
  '#fff176',
  '#ff8a65',
  '#90a4ae',
  '#f06292',
];

export default function colorIterator() {
  let index = 0;
  return {
    next: function () {
      return {
        value: COLOR_LIST[index++],
        done: false,
      };
    },
  };
}
