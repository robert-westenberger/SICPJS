import {
    list,
    flatmap,
    map,
    enumerate_interval,
    filter,
    head,
    tail,
    plus,
    is_prime_sum,
    make_pair_sum,
    display, is_null, pair, remove
} from "../general";


const unique_triples = (n) => {
    return flatmap(i => flatmap(j => map(k => list(i, j, k),
        enumerate_interval(1, j - 1)),
        enumerate_interval(1, i - 1)),
        enumerate_interval(1, n));
}

const does_sum_to_s = (item, s) => {
    const first_integer = head(item);
    const second_integer = head(tail(item));
    const third_integer = head(tail(tail(item)));
    return plus(first_integer, plus(second_integer, third_integer)) === s;
}
/**
 * Returns all ordered triples of distinct positive integers
 * that are all less than or equal to n and sum to a given integer s.
 * @param n
 * @param s
 */
const uniqueSumTriples = (n, s) => {
    const triples = unique_triples(n);
    return filter((item) => {
        return does_sum_to_s(item, s);
    }, triples);
}

// display(uniqueSumTriples(6, 6));