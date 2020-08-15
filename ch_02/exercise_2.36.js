import {
    is_null,
    list,
    pair,
    is_pair,
    head,
    tail,
    map,
    plus,
    display,
    multiply
} from "../general";


const accumulate = (op, initial, sequence) => {

    if (is_null(sequence)) {
        return initial;
    }
    return op(head(sequence),
        accumulate(op, initial, tail(sequence)));
}

const accumulate_n = (op, initial, seqs) => {
    if (is_null(head(seqs))) {
        return initial;
    }
    return pair(accumulate(op, initial, map((item) => head(item), seqs)),
        accumulate_n(op, initial, map((item) => tail(item), seqs)));
}

const matrix = list(
    list(1,  2,  3),
    list(4,  5,  6),
    list(7,  8,  9),
    list(10, 11, 12)
);

const t0 = accumulate_n(plus, 0, matrix);
