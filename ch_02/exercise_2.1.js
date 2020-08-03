// Exercise 2.1 Define a better version of make_rat that handles both
// positive and negative arguments. The function make_rat should normalize
// the sign so that if the rational number is positive, both the numerator
// and denominator are positive, and if the rational number is negative,
//     only the numerator is negative.

//Custom implementation of Pair
class Pair {
    constructor(head, tail) {
        this.head = head;
        this.tail = tail;
    }
    getHead() {
        return this.head;
    }
    getTail() {
        return this.tail;
    }
}

const gcd = (a, b) => {
    return b === 0 ? a : gcd(b, a % b);
}

class RationalNumber extends Pair {
    constructor(numerator, denominator) {
        super(numerator, denominator);
        const greatestCommonDenominator = gcd(numerator, denominator);
        const reducedNumerator = numerator / greatestCommonDenominator;
        const reducedDenominator = denominator / greatestCommonDenominator;

        this.numerator = reducedNumerator;
        this.denominator = reducedDenominator;
    }
    getNumerator() {
        return this.numerator;
    }
    getDenominator() {
        return this.denominator;
    }
    print() {
        console.log(`${this.numerator} / ${this.denominator}`);
    }
}

const x = new Pair(1, 2);
const y = new Pair(3, 4);
const z = new RationalNumber(6, -9);
z.print();
// console.log(z.getHead().getTail());

//
// function make_rat(n, d) {
//     const g = gcd(n, d);
//     return pair(n / g, d / g);
// }
//
// make_rat(4, 6);