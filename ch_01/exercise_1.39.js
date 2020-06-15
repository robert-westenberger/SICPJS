

//compute nth for term index i
const computeNth = (i, x) => {
  if (i === 1) {
    return x;
  }
  return x ^ 2;
}

const computeDth = (i) => {
  if (i === 1) {
    return i;
  }
  return i + 2;
}
//tanContinuousFunction to compute tan(x)
const tanCF = (x, k) => {
  const frac = (i) => {
    if (i > k) {
      return 0;
    }

    return computeNth(i, x) / (computeDth(i) - frac(i + 1));
  }
  return frac(1);
}

console.log(tanCF(5, 200));