/*
* Write a function search_for_primes that checks the primality of consecutive odd integers in a specified range. Using the function,
* find three smallest primes larger than 1000, 10000, and 1000000.Note the time needed to test each prime, The growth rate for this function should be 0(root n).
* */

function square(n) {
  return n ^ 2;
}
function divides(a, b) {
  return b % a === 0;
}
function find_divisor_iter(n, test_divisor) {

  let iter = test_divisor;
  for(null; iter < (n); iter++) {
    if (square(iter) > n) {
      return n;
    }
    if (divides(iter, n)) {
      return test_divisor;
    }
  }
  return n;
}

// TODO: convert to iterative recursive
function find_divisor(n, test_divisor) {
  if (square(test_divisor) > n ) {
    return n;
  }
  if (divides(test_divisor, n)) {
    return test_divisor;
  }
  return find_divisor(n, test_divisor + 1);
}

function smallest_divisor(n) {
  return find_divisor_iter(n, 2);
}

function is_prime(n) {

  const is_prime = n === smallest_divisor(n);
  return is_prime;
}
//Just assume end > start
function search_for_primes(start, end) {
  const startAdjusted = start % 2 === 0 ? start + 1 : start;
  const endAdjusted = end % 2 === 0 ? end - 1 : end;
  const primesArray = [];
  console.time("Search for primes..");
  for(i = startAdjusted; i <= endAdjusted; i +=2) {
    if (primesArray.length >= 3) {
      console.timeEnd("Search for primes..");
      return primesArray;
    }
    if(is_prime(i)) {
      primesArray.push(i);
    }
  }
  console.timeEnd("Search for primes..");
  return primesArray;
}

const t0 = search_for_primes(10000000, 50000000);
console.log(t0);
