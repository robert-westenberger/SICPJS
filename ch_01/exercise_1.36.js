const tolerance = 0.00001;
let fixedPointStepCounter = 0;
let averageDampenedFixedPointStepCounter = 0;
const closeEnough = (x, y) => Math.abs(x - y) < tolerance;
const countStep = (isAverageDampened) => {

  if (isAverageDampened) {
    averageDampenedFixedPointStepCounter = averageDampenedFixedPointStepCounter + 1;
  } else {
    fixedPointStepCounter = fixedPointStepCounter + 1;
  }
}
const tryFixedPoint = (f, guess, isAverageDampened) => {
  const next = f(guess);
  countStep(isAverageDampened);
  if (closeEnough(guess, next)) {
    return next;
  } else {
    return tryFixedPoint(f, next, isAverageDampened);
  }
}
const fixedPoint = (fun, firstGuess, isAverageDampened) => {
  return tryFixedPoint(fun, firstGuess, isAverageDampened);
}

const average = (a, b) => (a + b) / 2;

const t0 = fixedPoint((x) => Math.log(1000) / Math.log(x), 1.2, false);
const t1 = fixedPoint((x) => average(x,Math.log(1000) / Math.log(x)), 103, true);
console.log(t0, fixedPointStepCounter);
console.log(t1, averageDampenedFixedPointStepCounter);