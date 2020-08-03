// Exercise 2.4 Here is an alternative functional representation of
// pairs. For this representation, verify that head(pair(x, y))
// yields x for any objects x and y.

function pair(x, y) {
    return m => m(x, y);
}
function head(z) {
    return z((p, q) => p);
}

const x = pair(1, 2);
console.log(head(x));


// What is the corresponding definition of tail?
//     (Hint: To verify that this works, make use of the
// substitution model of section 1.1.5.)
function tail(z) {
    return z((p, q) => q);
}

