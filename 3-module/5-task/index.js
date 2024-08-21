function getMinMax(str) {
  let arr = str.split(' ');
  let min = arr[0];
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (Number(arr[i]) < min) {
      min = arr[i];
    }
    if (Number(arr[i]) > max) {
      max = arr[i];
    }
  }
  return { min: Number(min), max: Number(max) };
}