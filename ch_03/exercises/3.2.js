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


function make_monitored(fn) {
    let fn_count = 0;
    function dispatch(m) {
        if (m === "reset count") {
            fn_count = 0
        }
        if (m === "how many calls") {
            return fn_count;
        }

        fn_count++;
        return fn(m);

    }
    return dispatch;
}

const s = make_monitored(Math.sqrt);
//
// console.log(s(34));
// console.log(s(9));
// console.log(s(81));
// console.log(s("how many calls"));
