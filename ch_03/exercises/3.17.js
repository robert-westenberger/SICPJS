import {
    list,
    is_pair,
    is_null,
    pair,
    head,
    set_tail, set_head, tail, append_mutator,
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


function count_pairs_orig(x) {
    return !is_pair(x)
        ? 0
        : count_pairs_orig(head(x)) +
        count_pairs_orig(tail(x)) + 1;
}

function count_pairs(x) {
    let unique_pairs = null;

    const contains = (lst, item) => {
        if (is_null(lst)) {
            return false;
        }

        if (lst === item) {
            return true;
        }
        return contains(tail(lst), item);
    }

    const count_pairs_iter = (arg) => {
        if (is_pair(arg)) {
            if (is_null(unique_pairs)) {
                unique_pairs = list(arg);
                return count_pairs_iter(head(arg)) +
                    count_pairs_iter(tail(arg)) + 1;
            }
            if (!contains(unique_pairs, arg)) {
                append_mutator(unique_pairs, arg);
                return count_pairs_iter(head(arg)) +
                    count_pairs_iter(tail(arg)) + 1;
            }
        }
        return 0;
    }
    return count_pairs_iter(x);
}