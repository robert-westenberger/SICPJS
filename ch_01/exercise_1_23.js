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
function find_divisor(n, test_divisor) {
  return square(test_divisor) > n ? n : divides(test_divisor, n) ? test_divisor : find_divisor(n, test_divisor + 1);
}
function smallest_divisor(n) {
  return find_divisor(n, 2);
}
function is_prime(n) {
  console.time(n);
  const is_prime = n === smallest_divisor(n);
  console.timeEnd(n);
  return is_prime;
}
//Just assume end > start
function search_for_primes(start, end) {
  const startAdjusted = start % 2 === 0 ? start + 1 : start;
  const endAdjusted = end % 2 === 0 ? end - 1 : end;
  const primesArray = [];
  for(i = startAdjusted; i <= endAdjusted; i +=2) {
    if (primesArray.length >= 3) {
      return primesArray;
    }
    if(is_prime(i)) {
      primesArray.push(i);
    }
  }
  return primesArray;
}

const t0 = search_for_primes(100000, 200000);

