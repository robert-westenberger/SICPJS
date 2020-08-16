import {
    tail, head,
    list,
    is_null,
    display,
    divide,
    accumulate
} from "../general";

// function fold_left(op, initial, sequence) {
//     function iter(result, rest) {
//         return is_null(rest)
//             ? result
//             : iter(op(result, head(rest)),
//                 tail(rest));
//     }
//     return iter(initial, sequence);
// }

/**
 *
 * @param op
 * @param initial
 * @param sequence
 * @returns {*}
 */
const fold_left = (op, initial, sequence) => {
    const iter = (result, rest) => {
        if (is_null(rest)) {
            return result;
        }
        return iter(op(result, head(rest)), tail(rest));
    }
    return iter(initial, sequence);
}
// commutative / associative operations (plus, multiply) will produce
// identical results for any sequence with fold_left / fold_right
// const test_1 = fold_left(list, null, list(1, 2, 3));
// const test_2 = accumulate(divide, 1, list(1, 2, 3));
// const test_3 = fold_left(divide, 1, list(1, 2, 3));
// const test_4 = accumulate(list, null, list(1, 2, 3));
// const test_5 = fold_left(list, null, list(1, 2, 3));

