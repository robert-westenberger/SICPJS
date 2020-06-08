const tolerance = 0.00001;

const closeEnough = (x, y) => Math.abs(x - y) < tolerance;
const tryFixedPoint = (f, guess) => {
  const next = f(guess);
  console.log(next, guess);
  if (closeEnough(guess, next)) {
    return next;
  } else {
    return tryFixedPoint(f, next);
  }
}
const fixedPoint = (fun, firstGuess) => tryFixedPoint(fun, firstGuess);

// Will oscillate between 1 and 9 endlessly, since the numerator and denominator of the func just changes.
const sqrt = (x) => fixedPoint(y => x / y, 1);
// sqrt(9);

//Avoids infinite oscillation by averaging guesses in between.
const average = (a, b) => (a + b) / 2;
const sqrtAverage = (x) => fixedPoint(y => average(y, x/y), 1);


