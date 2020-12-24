import {
    list,
    append,
    is_null,
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

const v = list("a", "b", "c", "d");
// 1 - What does mystery fn do?
function mystery(x) {
    function loop(x, y) {
        if (is_null(x)) {
            return y;
        } else {
            const temp = tail(x);
            set_tail(x, y);
            return loop(temp, x);
        }
    }
    return loop(x, null);
}
// reverses order of w
const w = mystery(v);





