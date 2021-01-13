import {
    is_null, pair,equal, head, tail, list, display, append
} from "../general/index";
// exercise 2.60 Design functions is_element_of_set, intersection_set, adjoin_set,
// union_set that operate on set
// representation that is an unordered list that allows duplicates.

const set_1 = list(2, 3, 2, 1, 3, 2, 2); // set { 1, 2, 3 }
const set_2 = list(2, 3, 2, 1, 4, 2, 2, 4, 4, 3, 2, 4, 5); // set { 1, 2, 3 }

// is_element_of_set unchanged
function is_element_of_set(x, set) {
    return is_null(set)
        ? false
        : equal(x, head(set))
            ? true
            : is_element_of_set(x, tail(set));
}
// intersection_set unchanged
function intersection_set(set1, set2) {
    if (is_null(set1) || is_null(set2)) {
        return null;
    }
    if (is_element_of_set(head(set1), set2)) {
        return pair(head(set1), intersection_set(tail(set1), set2));
    }
    return intersection_set(tail(set1), set2);
}
// no longer check if its already in the set. just add it anyway cuz we dont give
// a CRAP about duplicates
function adjoin_set(x, set) {
    return pair(x, set);
}
// Again, just straight up appending the sets since duplicates are OK
function union_set(set1, set2) {
    return append(set1, set2);
}

// const adjoined_set_1 = adjoin_set(6, set_1);
// display(adjoined_set_1);
const union_set_1 = union_set(set_2, set_1);
display(union_set_1);
// const in_set_1 = is_element_of_set(1, set_1);
// display(intersection_set(set_1, set_2));