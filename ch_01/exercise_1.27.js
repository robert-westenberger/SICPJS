function is_even(n) {
  return n % 2 === 0;
}
function square(x) {
  return x * x;
}

// tests whether a^n is congruent (positive integer that is the area of a right triangle
// with 3 rational sides) to a modulo n for every a < n.
function carmichael(n) {
  //
  function expmod(base, exp, m) {
    return exp === 0
      ? 1
      : is_even(exp)
        ? square(expmod(base, exp / 2, m)) % m
        : (base * expmod(base, exp - 1, m)) % m;
  }
  function fermat_test(n, a) {
    return expmod(a, n, n) === a;
  }
  function iter(n, i) {
    return i === n
      ? true
      : fermat_test(n, i)
        ? iter(n, i + 1)
        : false;
  }
  return iter(n, 2);
}

console.log(carmichael(561));