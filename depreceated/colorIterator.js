const COLOR_LIST = [
  '#f44336',
  '#3f51b5',
  '#009688',
  '#ffeb3b',
  'hotpink',
  'dodgerblue',
  'gold',
  'ivory',
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
