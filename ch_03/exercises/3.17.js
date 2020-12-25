import {
    list,
    is_pair,
    pair,
    head, make_cycle,
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

const z1 = pair(1, null);
const z3 = list(1, 2, 3);
const z4 = pair(z1, pair(z1, null));
const z3_count = count_pairs(z3);
const zx = pair(z1, z1);
const z7 = pair(zx,zx);
const z_infinite = make_cycle(z3);
console.log(z3_count);
console.log(count_pairs(z4));
console.log(count_pairs(z7));
// console.log(count_pairs(z_infinite));