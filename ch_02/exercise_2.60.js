import {
    is_null, pair,equal, head, tail, list, display, append, adjoin_set
} from "../general/index";
// exercise 2.60 Design functions is_element_of_set, adjoin_set,
// union_set, and intersection_set that operate on set
// representation that is an unordered list that allows duplicates.

const set_1 = list(2, 3, 2, 1, 3, 2, 2); // set { 1, 2, 3 }


// function is_element_of_set(x, set) {
//
//     return is_null(set)
//         ? false
//         : equal(x, head(set))
//             ? true
//             : is_element_of_set(x, tail(set));
// }
//
// const in_set_1 = is_element_of_set(1, set_1);
