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
    is_pair,
    is_prime_sum,
    flatmap,
    head,
    tail,
    is_null,
    remove
} from "../general/index";


const equal = (a, b) => {
    if (is_pair(a) && is_pair(b)) {
        return equal(tail(a), tail(b)) && equal(head(a), head(b));
    }
    return a === b;
}
