import {
    list,
    append,
    pair,
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

const z1 = list("a", "b", "c");
const z2 = last_pair(z1);
display(z1);
display(z2);
debugger;
const z3 = make_cycle(z1);




