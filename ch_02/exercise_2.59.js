import {
    is_element_of_set, is_null, pair, head, tail, list, display, append, adjoin_set
} from "../general/index";
// Exercise 2.59 Implement the union_set operation for the
// unordered-list representation of sets.

function intersection_set(set1, set2) {
    if (is_null(set1) || is_null(set2)) {
        return null;
    }
    if (is_element_of_set(head(set1), set2)) {
        return pair(head(set1), intersection_set(tail(set1), set2));
    }
    return intersection_set(tail(set1), set2);
}
// merge set1 into set2...
function union_set(set1, set2) {
    if (is_null(set1) || is_null(set2)) {
        return set2;
    }
    const h1 = head(set1);
    if (is_element_of_set(h1, set2)) {
        return union_set(tail(set1), set2);
    }
    return union_set(tail(set1), adjoin_set(h1, set2))
}

const set_1 = list(10, 20, 30);
const set_2 = list(20, 15, 10);

const union_1 = union_set(set_1, set_2);
display(union_1); // should display 10, 15, 20, 30