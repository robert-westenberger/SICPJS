import {
    is_element_of_set, is_null, pair, head, tail, list, display, append
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

function union_set(set1, set2) {
    if (is_null(set1) || is_null(set2)) {
        return null;
    }
    // if (is_element_of_set(head(set1), set2)) {
    //     return pair(head(set1), union_set(tail(set1), tail(set2)));
    // }

    const head1 = head(set1);
    const head2 = head(set2);
    if ((!is_element_of_set(head1, set2)) && (!is_element_of_set(head2, set1))) {
        console.log(`adding both ${head1} and ${head2}`);
        return pair(head1, pair(head2, union_set(tail(set1), tail(set2))));
    }
    if (!is_element_of_set(head1, set2)) {
        console.log(`adding ${head1}`);
        return pair(head1, union_set(tail(set1), tail(set2)));
    }
    if (!is_element_of_set(head2, set1)) {
        console.log(`adding ${head2}`);
        return pair(head2, union_set(tail(set1), tail(set2)));
    }
    console.log(head1, head2);
    console.log(is_element_of_set(head1, set2), is_element_of_set(head2, set1));
    return pair(head1, pair(head2, union_set(tail(set1), tail(set2))));
}

const set_1 = list(10, 20, 30);
const set_2 = list(20, 15, 10);
display(set_1);
display(set_2);
// const intersection_1 = intersection_set(set_1, set_2);
// display(intersection_1);

const union_1 = union_set(set_1, set_2);
display(union_1); // should display 10, 15, 20, 30