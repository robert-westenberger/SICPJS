// Exercise 2.17 Define a function last_pair that returns the list
//only the last element of a given (nonempty) list..
import { list, head, tail, is_pair } from "../general";

const factorialLinearRecursive = (n, total = 1) => {
    if (n === 0) {
        return total;
    }
    return factorialLinearRecursive(n-1, n * total);
}

const factorialIterativeRecursive = (n) => {
    const factorialIterativeImplementation = (product, counter, max_count) => {
        return counter > max_count ? product : factorialIterativeImplementation(counter * product, counter + 1, max_count);
    }
    return factorialIterativeImplementation(1, 1, n);
}

const factorialTrueIterative = (n) => {
    let product = 1;
    for (let i = 1; i <= n; i++ ) {
        product = product * i;
    }
    return product;
}

// console.log(factorialTrueIterative(Math.pow(2, 22)));


export const notes_121 = () => {

}