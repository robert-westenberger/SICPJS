import {accumulate, list, pair, display } from "../general";

const l1 = list(1, 2, 3);
const l2 = list(4, 5, 6);
const mapAccumulate = (fn, sequence) =>
    accumulate((x, y) => pair(fn(x), y), null, sequence);


const appendAccumulate = (seq1, seq2) =>
     accumulate(pair, seq2, seq1);

const lengthAccumulate = (sequence) => accumulate((x, y) => {
    return y + 1;
}, 0, sequence);

// const t1 = lengthAccumulate(l1);

