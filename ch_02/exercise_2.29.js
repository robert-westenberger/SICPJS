import {append, head, is_number, tail,
    list, display} from "../general";

const make_mobile = (left, right) => (list(left, right));
const make_branch = (length, structure) => (list(length, structure));

const left_branch = head;
const branch_length = head;
const right_branch = (x) => { return head(tail(x));};
const branch_structure = (x) => { return head(tail(x));};

/**
 *
 * @param x
 * @returns {*}
 */
const total_weight = (x) => {
    if (is_number(x)) {
        return x;
    }

    return total_weight(branch_structure(left_branch(x))) +
        total_weight(branch_structure(right_branch(x)));
}


const list_01 = list(1, 2, 3, 4);
const list_02 = list(5, 6, 7);
const mobile_01 = make_mobile(list_01, list_02);
const branch_01 = make_branch(4, mobile_01);
const m = make_mobile(
    make_branch(10,
        make_mobile(make_branch(10, 2),
            make_branch(4, 5))),
    make_branch(10, 23));

