window.Utils = {
  // A util to flatten the nested arrays into a single dimensional array
  // Eg., [1,[1,2,[3]]] -> [1,1,2,3]
  flatten(arrays) {
    return arrays.reduce(
      (a, b) => a.concat(b instanceof Array ? Utils.flatten(b) : b),
      []
    );
  },

  // A util to return deep clone of an array (specific to this app)
  // Returns a new copy
  clone(array) {
    return array.map(row => row.slice());
  }
};