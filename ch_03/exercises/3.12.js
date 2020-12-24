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

const test = new_pair(new_pair(1, 2), 4);
const x = list("a", "b");
const y = list("c", "d");
const z = append(x,y);
// first response tail(x) -> [b, null]
const w = append_mutator(x, y);
display(w);
display(tail(w));
