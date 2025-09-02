function create3DArray(x, y, z) {
  let array3D = [];
  for (let i = 0; i < x; i++) {
    array3D[i] = [];
    for (let j = 0; j < y; j++) {
      array3D[i][j] = [];
      for (let k = 0; k < z; k++) {
        array3D[i][j][k] = null;
      }
    }
  }
  return array3D;
}

module.exports = create3DArray;