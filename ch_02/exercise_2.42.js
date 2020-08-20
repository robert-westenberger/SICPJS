import {
    list,
    flatmap,
    map,
    enumerate_interval,
    filter,
    head,
    tail,
    plus,
    is_prime_sum,
    make_pair_sum,
    display, is_null, pair, remove
} from "../general";

const empty_board = null;
const is_safe = (k, positions) => {
    return false;
};
const adjoin_position = (new_row, k, rest_of_queens) => {

    return null;
}

const queens = (board_size) => {
    const queen_cols = k => {
        if (k === 0) {
            return list(empty_board);
        }
        const queensMap = flatmap(rest_of_queens => {
            return map(new_row => {
                return adjoin_position(
                    new_row, k,
                    rest_of_queens);
                }, enumerate_interval(1, board_size));
        }, queen_cols(k - 1));

        return filter(positions => is_safe(k, positions),
            queensMap);
    }

    return queen_cols(board_size);
}

queens(8);