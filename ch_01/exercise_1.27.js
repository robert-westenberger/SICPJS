
function square(n) {
  return n^2;
}
function isEven(n) {
  return n % 2 === 0;
}
//Function that computes the exponential of a number modulo another number.
function expmod(base, exp, m) {
  if (exp === 0) {
    return 1;
  }
  if (isEven(exp)) {
    return square(expmod(base, exp / 2, m)) % m;
  }
  return base * expmod(base, exp - 1,m) % m;
}

function random(n) {
  return Math.ceil(Math.random() * (n));
}

function fermatTest(n) {
  function tryIt(x) {
    return expmod(x, n, n) === x;
  }
  return tryIt(1 + random(n - 1));
}

function fastPrimalityTest(n, times) {
  if (times === 0) {
    return true;
  }
  if (fermatTest(n)) {
    return fastPrimalityTest(n, times-1);
  }
  return false;
}

// carmichael numbers are numbers that fool the fermat test
const carmichaelNumbers = [561, 1105, 1729, 2465, 2821, 6601];
console.log(fastPrimalityTest(561, 5));