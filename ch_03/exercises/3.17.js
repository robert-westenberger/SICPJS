import {
    list,
    is_pair,
    pair,
    head,
    make_cycle,
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

