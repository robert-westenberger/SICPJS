const e = Math.E;

const contFracRecursive = (n, d, k) => {
  const frac = (i) => {
    if (i > k) {
      return 0;
    }

    return n(i) / (d(i) + frac(i + 1));
  }
  // Return
  return frac(1);
}
const computeDth = (i) => {
  // if the term index is preceding term index divisible by 3
  if ((i + 1) % 3 < 1) {
    return (2 * ( i + 1 )) / 3;
  }
  return 1;
}
console.log(2 + contFracRecursive((i) => 1,computeDth, 20));