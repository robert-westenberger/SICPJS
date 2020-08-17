import {
    display,
    map,
    filter,
    square,
    is_odd,
    is_even,
    pair,
    list,
    plus,
    accumulate,
    enumerate_tree,
    enumerate_interval,
    fib,
    is_prime_sum,
    flatmap,
    head,
    tail,
    is_null,
    remove
} from "../general/index";

const filterOdd = (items) => filter(is_odd, items);
const filterTheList = filterOdd(list(1, 2, 3,4,5,6,7));
const accumulateAdd = (items) => accumulate(plus, 0, items);
// const accumulateAddTheList = accumulateAdd(list(1,2,3,4,5,6));
const accumulatePair = (items) => accumulate(pair, null, items);
// const accumulatePairTheList = accumulatePair(list(1,2,3,4,5));


const sumOddSquares = (tree) => accumulate(plus, 0, map(square, filter(is_odd, enumerate_tree(tree))));
const evenFibs = (n) => accumulate(pair, null, filter(is_even, map(fib, enumerate_interval(0, n))));

const personnel_records = list(list("Linus", "programmer", 30000),
    list("Richard", "programmer", 25000),
    list("Bill", "manager", 2500000));

const is_programmer = record => head(tail(record)) === "programmer";
const salary = record => head(tail(tail(record)));

const salary_of_highest_paid_programmer = records => accumulate(math_max,
    0,
    map(salary,
        filter(is_programmer, records)));

// display(evenFibs(9));
// display(accumulatePairTheList);
// console.log(accumulateAddTheList);
// display(filterTheList);

//nested mappings
const make_pair_sum = (p) => list(
    head(p), head(tail(p)),
    head(p) + head(tail(p))
);

const prime_sum_pairs = n => {
    const sequenceOfOrderedPairsToN = flatmap(i => map(j => list(i, j),
        enumerate_interval(1, i - 1)),
        enumerate_interval(1, n));
    const pairSumsThatArePrime = filter(is_prime_sum, sequenceOfOrderedPairsToN);
    return map(make_pair_sum, pairSumsThatArePrime);
}

/**
 * For each item x in S, recursively generate the sequence of permutations
 * of S - X, and adjoin x to the front of each one. This yields,
 * for each x in S, the sequence of permutatons S 
 * that begin with x. Combining these sequences for all
 * x gives all the permutations of S. 
 * @param s
 */
const permutations = s => {
    if (is_null(s)) {
        return list(null);
    }
    return flatmap(x =>
        map(p => pair(x, p),
        permutations(remove(x, s))), s);
}
// display(permutations(list(1, 2, 3)));
// display(prime_sum_pairs(6));


