import {
    list,
    is_pair,
    pair,
    head,
    set_tail, set_head, last_pair,
    display, tail, append_mutator
} from "../../general/index";

function get_new_pair() {
    return pair(undefined, undefined);
}

function new_pair(x, y) {
    const fresh = get_new_pair();
    set_head(fresh, x);
    set_tail(fresh, y);
    return fresh;
}


function count_pairs(x) {
    return !is_pair(x)
        ? 0
        : count_pairs(head(x)) +
        count_pairs(tail(x)) + 1;
}
const x = list("a", "b");
const two_p = list("a", "b");
const three_p = list("a", "b", "c")
const three_p_count = count_pairs(three_p);
const four_p = list(two_p, "d", "e");
const four_p_count = count_pairs(four_p);
// const never_return = c
// console.log(three_p_count, four_p_count);