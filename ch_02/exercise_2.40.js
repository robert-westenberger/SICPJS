import {
    list,
    flatmap,
    map,
    enumerate_interval,
    filter,
    is_prime_sum,
    make_pair_sum,
    display, is_null, pair, remove
} from "../general";

// Use unique_pairs to simplify the definition
// of prime_sum_pairs.



const permutations = s => {
    if (is_null(s)) {
        return list(null);
    }
    return flatmap(x =>
        map(p => pair(x, p),
            permutations(remove(x, s))), s);
}

/**
 * Generates sequence of pairs (i, j) with
 * 1 <= j < i <=n.
 * @param n
 */
const unique_pairs = n => {
    return flatmap(i => map(j => list(i, j),
        enumerate_interval(1, i - 1)),
        enumerate_interval(1, n));
}

const prime_sum_pairs = n => {
    const sequenceOfOrderedPairsToN = unique_pairs(n);
    const pairSumsThatArePrime = filter(is_prime_sum, sequenceOfOrderedPairsToN);
    return map(make_pair_sum, pairSumsThatArePrime);
}
