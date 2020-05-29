
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

function slowExpmod(base, exp, m) {
  if (exp === 0) {
    return 1;
  }
  if (isEven(exp)) {
    // NOTE DOUBLE CALL TO EXPMOD!!!!
    return expmod(base, exp / 2, m) * expmod(base, exp / 2, m) % m;
  }
  return base * expmod(base, exp - 1, m) % m;
}
/*The slowExpmod function calls expmod twice in the branch that checks whether
* the exp is even, making a branched call structure to this function. The expMod function
* is a linear recursive pprocess, but the slowExpMod is a tree recursive process.
*  In general, the number of steps requried by a tree-recursive process will be proportional to the maximum depth of the tree.  */