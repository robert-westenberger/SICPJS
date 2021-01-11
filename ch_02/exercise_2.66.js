import {
    is_number,
    is_variable,
    is_pair,
    display,
    accumulate,
    list,head, tail, pair,equal, is_null
} from "../general/index";

function make_record(key, data) {
    return pair(key, data);
}
function key(record) {
    return head(record);
}
function data(record) {
    return tail(record);
}

function lookup(given_key, set_of_records) {
    return is_null(set_of_records)
        ? false
        : equal(given_key, key(head(set_of_records)))
            ? head(set_of_records)
            : lookup(given_key, tail(set_of_records));
}

const record = lookup(3, list(make_record(2, "Venus"),
    make_record(5, "Jupiter"),
    make_record(4, "Mars"),
    make_record(3, "Earth"),
    make_record(6, "Saturn")));
//
// console.log(record);