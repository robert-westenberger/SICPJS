import {
    list,
    plus,
    multiply,
    accumulate_n,
    accumulate,
    display,
    pair,
    map
} from "../general";

const dot_product = (n_tuple_1, n_tuple_2) => {
    return accumulate(plus, 0,
        accumulate_n(multiply, 1, list(n_tuple_1, n_tuple_2)));
}
const test_1 = dot_product(list(1, 7), list(3, 5));

const vector_01 = list(2, 1, 0);
const matrix_01 = list(
    list(1, -1, 2),
    list(0, -3, 1)
    );
/**
 * Map over rows of matrix, returning dot_product of
 * the row and vector.
 * @param matrix
 * @param vector
 * @returns {null|Pair}
 */
const matrix_times_vector = (matrix, vector) => {
    return map((row) => {
        return dot_product(row, vector);
    }, matrix);
}

const test_2 = matrix_times_vector(matrix_01, vector_01);
// display(test_2);
const transpose = (matrix) => accumulate_n(pair, null, matrix);

const matrix_02 = list(
    list(1, 7),
    list(2, 4)
);
const matrix_03 = list(
    list(3, 3),
    list(5, 2)
);
const matrix_times_matrix = (matrix_1, matrix_2) => {
    const cols = transpose(matrix_2);
    return map((row) => {
        return map((col) => {
            return dot_product(row, col);
        }, cols);
    }, matrix_1);
}
const test_3 = matrix_times_matrix(matrix_02, matrix_03);
display(test_3);