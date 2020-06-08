//todo: the rest of this exercise lol
function square(n) {
  return n * n;
}
function cube(n) {
  return n*n*n;
}
function sum(term, a, next, b) {
  return a > b
    ? 0
    : term(a) + sum(term, next(a), next, b);
}

function integral(f, a, b, dx) {
  function add_dx(x) {
    return x + dx;
  }

  return sum(f, a + dx / 2, add_dx, b) * dx;
}


/**
 * Computes value of the integral of function f between a and b
 * @param {function} f - a function on which integration is performed
 * @param {number} a - start
 * @param {number} b - end
 * @param {number} n - Some even integer. Higher, the more accurate approximation
 * @returns {number}
 */
function simpsonsRule(f, a, b, n) {
  const h = (b - a) / n;

}
// console.log(integral(cube, 0, 1, 0.01));

const myFun = x => x + 4;
console.log(myFun(5));