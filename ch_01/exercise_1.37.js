

//calculate continuous fraction, recursive
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

const contFracIterative = (n, d, k) => {
  const frac = (i, current) => {
    if (i === 0) {
      return current;
    }
    return frac(i - 1, n(i) / (d(i) + current));
  }
  return frac(k, 0);
}


// appproximate (1 / goldenRatio) by using
console.log(contFracRecursive((i) => 1, (i) => 1.0, 20));
console.log(contFracIterative((i) => 1, (i) => 1.0, 20));
