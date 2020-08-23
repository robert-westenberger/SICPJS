import {
    list,
    map,
    enumerate_interval,
    filter,
    head,
    tail,
    display,
    is_null,
    pair,
    remove,
    append
} from "../general";

const accumulate = (op, initial, sequence) => {

    if (is_null(sequence)) {
        return initial;
    }
    return op(head(sequence),
        accumulate(op, initial, tail(sequence)));
}
const flatmap = (f, seq) => accumulate(
    append, null, map(f, seq)
)
const empty_board = null;
const is_safe = (k, positions) => {
    const first_row = head(head(positions));
    const first_col = tail(head(positions));
    return accumulate((position, so_far) => {
        const row = head(position);
        const col = tail(position);

        return so_far &&
            first_row - first_col !==
            row - col &&
            first_row + first_col !==
            row + col &&
            first_row !== row;
    }, true, tail(positions));
};
/**
 *
 * @param new_row
 * @param new_col
 * @param rest_of_queens
 * @returns {Pair}
 */
const adjoin_position = (new_row, new_col, rest_of_queens) => {

    return pair(pair(new_row, new_col), rest_of_queens);
}
/**
 * Only need to record the row and position of each placed
 * piece. First
 * @param board_size
 * @returns {Pair|null}
 */
function queens(board_size) {
    function queen_cols(k) {
        return k === 0
            ? list(empty_board)
            : filter(
                positions => is_safe(k, positions),
                flatmap(rest_of_queens =>
                        map(new_row => adjoin_position(
                            new_row, k,
                            rest_of_queens),
                            enumerate_interval(1,
                                board_size)),
                    queen_cols(k - 1)));
    }
    debugger;
    return queen_cols(board_size);
}

const t0 = queens(4);

