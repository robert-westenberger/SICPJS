import {accumulate, list, pair} from "../general";

const l1 = list(1, 2, 3);
const l2 = list(1, 2, 3);
const mapAccumulate = (fn, sequence) =>
    accumulate((x, y) => pair(fn(x), y), null, sequence);

const appendAccumulate = (seq1, seq2) =>
    accumulate(pair, seq1);

const t0 = appendAccumulate(l1, l2);