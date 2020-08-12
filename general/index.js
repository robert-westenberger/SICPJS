
class Pair {
    constructor(head, tail) {
        this.head = head;
        this.tail = tail;
    }
    toString() {
        return `[${this.head}, ${this.tail}]`
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
const is_null = (item) => item === null;
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
    return console.log(x.toString());
}
const is_number = (x) => {
    return typeof x === "number";
}

const map = (cb, items) => {
    if (is_null(items)) {
        return null;
    }
    return pair(cb(head(items)), map(cb, tail(items)));
}



/**
 * Returns a tree with all the leaves multiplied by factor
 * @param tree - A tree whos leaves are numbers
 * @param factor
 * @returns {Pair|null|number}
 */
const scale_tree = (tree, factor) => {
    if (is_null(tree)) {
        return null;
    }
    if (!is_pair(tree)) {
        return tree * factor;
    }
    return pair(
        scale_tree(head(tree), factor),
        scale_tree(tail(tree), factor)
    );
}
/**
 * Another way of scaling the tree is recursively
 * mapping over the tree, treating it as a sequence
 * of subtrees.
 * @param tree
 * @param factor
 * @returns {null|Pair}
 */
const scale_tree_map = (tree, factor) => {
    return map((sub_tree) => {
        if (is_pair(sub_tree)) {
            return scale_tree_map(sub_tree, factor);
        }
        return sub_tree * factor;
    }, tree);
}



const is_odd = (x) => x % 2 === 1;
const is_even = (x) => x % 2 === 0;

/****For sequence operations****/
const filter = (predicate, sequence) => {
    if (is_null(sequence)) {
        return null;
    }
    if (predicate(head(sequence))) {
        return pair(head(sequence), filter(predicate, tail(sequence)));
    }
    return filter(predicate, tail(sequence));
}

const accumulate = (op, initial, sequence) => {

    if (is_null(sequence)) {
        return initial;
    }
    return op(head(sequence),
        accumulate(op, initial, tail(sequence)));
}

const enumerate_interval = (low, high) => {
    if (low > high) {
        return null;
    }
    return pair(low, enumerate_interval(low + 1, high));
}

const plus = (x, y) => x + y;

const fib = n => {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}
const enumerate_tree = (tree) => {
    if (is_null(tree)) {
        return null;
    }
    if (!is_pair(tree)) {
        return list(tree);
    }
    return append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
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
    square,
    display,
    is_number,
    map,
    scale_tree,
    scale_tree_map,
    filter,
    is_odd,
    accumulate,
    plus,
    enumerate_tree,
    enumerate_interval,
    fib,
    is_even
}