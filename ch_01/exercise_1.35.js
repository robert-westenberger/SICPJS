//Show that the golden ratio is a fixed point of the transformation x -> 1 + 1 / x,
// and use this fact to compute the golden ratio by means of the fixed_point function

//Golden ratio is (1 + sqrt(5) / 2 ), roughly equal to 1.6180

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

