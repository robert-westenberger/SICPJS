import {
    list,
    append,
    pair,
    set_tail, set_head,
    display, tail, append_mutator
} from "../general/index";

function get_new_pair() {
    return pair(undefined, undefined);
}

function new_pair(x, y) {
    const fresh = get_new_pair();
    set_head(fresh, x);
    set_tail(fresh, y);
    return fresh;
}

const x = list("a", "b");
const z1 = pair(x, x);
const z2 = pair(list("a", "b"), list("a", "b"));
// display(z1);
// display(z2);


