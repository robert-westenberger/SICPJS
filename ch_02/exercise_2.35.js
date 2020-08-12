import {is_null, list, pair, is_pair,head, tail, accumulate, map} from "../general";

const x = pair(pair(1, pair(2,null)), pair(3, pair(4,null)));

const count_leaves = (x) => {
    if (is_null(x)) {
        return 0;
    }
    if (!is_pair(x)) {
        return 1;
    }
    return count_leaves(head(x)) + count_leaves(tail(x));
}


const count_leaves_accumulate = (x) => accumulate(
    (leaves, total) => leaves + total, 0,
    map((node) => {
        if (is_pair(node)) {
            return count_leaves_accumulate(node);
        }
    return 1;
}, x));

const lengthAccumulate = (sequence) => accumulate((x, y) => {
    return y + 1;
}, 0, sequence);


