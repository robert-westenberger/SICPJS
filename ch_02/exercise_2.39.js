import {
    tail, head,
    list,
    is_null,
    display,
    pair,
    divide,
    accumulate,
    fold_left,
    append
} from "../general";
// fold "towards"
const fold_right = accumulate;

const reverse_right = (sequence) => fold_right((x, y) => {
    return append(y, list(x));
}, null, sequence);

const reverse_left = (sequence) => fold_left((x, y) => {
    return append(pair(y, null), x);
}, null, sequence);

const reverse_leftBookAnswer = (sequence) => fold_left((x, y) => {
    return pair(y, x);
}, null, sequence);

const test_0 = reverse_right(list(1, 2, 3));
const test_1 = reverse_left(list(1, 2, 3));
