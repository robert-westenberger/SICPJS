
class Pair {
    constructor(head, tail) {
        this.head = head;
        this.tail = tail;
    }
}


const pair = (head, tail) => {
    return new Pair(head, tail);
}

const is_pair = (arg) => {
    return arg instanceof Pair;
}
// no validation.. just trust pair is a pair
const head = (pair) => {
    return pair.head;
}
const tail = (pair) => {
    return pair.tail;
}

const list = (...listItems) => {
    const listItem = listItems.shift();

    return listItems.length > 0 ? pair(listItem, list(...listItems)) : pair(listItem, null);
}
/**
 * Return nth item of items
 * @param items
 * @param n
 * @returns {Pair}
 */
const list_ref = (items, n) => {
    return n === 0 ? head(items) : list_ref(tail(items), n - 1);
}
const is_null = (item) => (item === null) || (item === undefined) || (typeof item === 'undefined');
const list_length = (items) => {
    return is_null(items) ? 0 : 1 + list_length(tail(items));
}


const append = (list1, list2) => {
    return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

const for_each = (fn, list) => {
    if (is_null(list)) {
        return null;
    } else {
        // console.log(list);
        fn(head(list));
        for_each(fn, tail(list));
    }
};

const print_list = (list) => {
    for_each(console.log, list);
}

const generate_list_recursive = (length, currIndex = 0) => {
    return currIndex === length - 1 ? pair(currIndex, null) : pair(currIndex, generate_list_recursive(length, currIndex + 1));
}

const generate_list_iter = (length, currIndex = 0) => {
    const generate_list_iter_impl = () => {

    }
}

const square = (x) => {
    return x*x;
}
/**
 *
 * @param x
 * @returns {Pair|Number}
 */
const count_leaves = (x) => {
    if (is_null(x)) {
        return 0;
    }
    if (!is_pair(x)) {
        return 1;
    }
    return count_leaves(head(x)) + count_leaves(tail(x));
}

const display = (x) => {
    
}

module.exports = {
    list_length,
    count_leaves,
    list,
    head,
    tail,
    is_pair,
    is_null,
    pair,
    append,
    for_each,
    print_list,
    square
}