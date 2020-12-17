import {
    square,
    list,
    head,
    tail,
    attach_tag,
    put,
    pair,
    get,
    apply_generic,
    contents,
    display, is_null, equal,
    math_sqrt,
    math_atan,
    put_coercion,
    get_coercion,
    is_same_variable,
    accumulate,
    make_pair_sum
} from "../../general/index";


/**
 *
 * @param initial_value
 * @returns {function(*): *}
 */
const make_accumulator = (initial_value) => {
    let current_value = initial_value;
    return (num) => {
        current_value += num;
        return current_value;
    }
}
const a = make_accumulator(5);

// console.log(a(10));