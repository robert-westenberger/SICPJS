
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
// list back to native array, so can use destructuring. Seems like Source uses
// destructuring for their apply_in_underlying_javascript builtin func
const listToArray = (the_list) => {
    const return_value = [];
    for_each((item) => {
        return_value.push(item);
    }, the_list);
    return return_value;
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

function length(items) {
    return is_null(items)
        ? 0
        : 1 + length(tail(items));
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

const accumulate_n = (op, initial, seqs) => {
    if (is_null(head(seqs))) {
        return null;
    }
    return pair(accumulate(op, initial, map((item) => head(item), seqs)),
        accumulate_n(op, initial, map((item) => tail(item), seqs)));
}

// Similar to accumulate, except that it combines elements working
// in the opposite direction (left to right)
const fold_left = (op, initial, sequence) => {
    const iter = (result, rest) => {
        if (is_null(rest)) {
            return result;
        }
        return iter(op(result, head(rest)), tail(rest));
    }
    return iter(initial, sequence);
}

const enumerate_interval = (low, high) => {
    if (low > high) {
        return null;
    }
    return pair(low, enumerate_interval(low + 1, high));
}

const plus = (x, y) => x + y;
const divide =  (x, y) => x / y;
const subtract =  (x, y) => x - y;
const multiply = (x, y) => x * y;
const divides = (a, b) => a % b === 0;
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
/**
 * sec 2.2.3
 * @param f
 * @param seq
 * @returns {*}
 */
const flatmap = (f, seq) => accumulate(
    append, null, map(f, seq)
)



// TODO: convert to iterative recursive
function find_divisor(n, test_divisor) {
    if (square(test_divisor) > n ) {
        return n;
    }
    if (divides(test_divisor, n)) {
        return test_divisor;
    }
    return find_divisor(n, test_divisor + 1);
}

function smallest_divisor(n) {
    return find_divisor(n, 2);
}

function is_prime(n) {

    const is_prime = n === smallest_divisor(n);
    return is_prime;
}

const is_prime_sum = (the_pair) => {
    return is_prime(head(the_pair) + head(tail(the_pair)));
}


const remove = (item, sequence) => filter(
    x => !(x === item),
    sequence
);


const make_pair_sum = (p) => list(
    head(p), head(tail(p)),
    head(p) + head(tail(p))
);

/**
 * section 2.3.1 returns the sublist of the list beginning
 * with the first occurrence of the string if string is in the
 * sequence, otherwise return null
 * @param item
 * @param seq
 * @returns {Pair | null}
 */
const member = (item, seq) => {
    if (is_null(seq)) {
        return null;
    }
    return item === head(seq) ? seq : member(item, tail(seq));
}

const is_string = xs => typeof xs === "string";
const is_variable = is_string;
const is_undefined = xs => typeof xs === "undefined";
const is_boolean = xs => typeof xs === "boolean";
const is_function= xs => typeof xs === "function";
const is_NaN= x => isNaN;
const has_own_property = Object.hasOwnProperty;
const is_object = xs => typeof xs === "object" || is_function(xs);
const equal = (a, b) => {
    if (is_pair(a) && is_pair(b)) {
        return equal(tail(a), tail(b)) && equal(head(a), head(b));
    }
    return a === b;
}

function set_tail(xs, x) {
    if (is_pair(xs)) {
        xs.tail = x;
        return undefined;
    } else {
        throw new Error(
            'set_tail(xs,x) expects a pair as argument xs, but encountered ' + JSON.stringify(xs)
        )
    }
}
function assoc(key, records) {
    return is_null(records)
        ? undefined
        : equal(key, head(head(records)))
            ? head(records)
            : assoc(key, tail(records));
}

function make_table() {
    const local_table = list("*table*");
    function lookup(key_1, key_2) {
        const subtable = assoc(key_1, tail(local_table));
        if (subtable === undefined) {
            return undefined;
        } else {
            const record = assoc(key_2, tail(subtable));
            if (record === undefined) {
                return undefined;
            } else {
                return tail(record);
            }
        }
    }
    function insert(key_1, key_2, value) {
        const subtable = assoc(key_1, tail(local_table));
        if (subtable === undefined) {
            set_tail(local_table,
                pair(list(key_1, pair(key_2, value)),
                    tail(local_table)));
        } else {
            const record = assoc(key_2, tail(subtable));
            if (record === undefined) {
                set_tail(subtable,
                    pair(pair(key_2, value),
                        tail(subtable)));
            } else {
                set_tail(record, value);
            }
        }
    }
    function dispatch(m) {
        return m === "lookup"
            ? lookup
            : m === "insert"
                ? insert
                : console.error(m, "Unknown operation -- table");
    }
    return dispatch;
}

const operation_table = make_table();

const get = operation_table("lookup");
const put = operation_table("insert");

function attach_tag(type_tag, contents) {
    return pair(type_tag, contents);
}
function type_tag(datum) {
    return is_pair(datum)
        ? head(datum)
        : console.error(datum, "bad tagged datum -- type_tag");
}
function contents(datum) {
    return is_pair(datum)
        ? tail(datum)
        : console.error(datum, "bad tagged datum -- contents");
}


let coercion_list = null;

function clear_coercion_list() {
    coercion_list = null;
}

function put_coercion(type1, type2, item) {
    if (is_null(get_coercion(type1, type2))) {
        coercion_list = pair(list(type1, type2, item),
            coercion_list);
    } else {
        return coercion_list;
    }
}

function get_coercion(type1, type2) {
    function get_type1(list_item) {
        return head(list_item);
    }
    function get_type2(list_item) {
        return head(tail(list_item));
    }
    function get_item(list_item) {
        return head(tail(tail(list_item)));
    }
    function get_coercion_iter(items) {
        if (is_null(items)) {
            return undefined;
        } else {
            const top = head(items);
            return equal(type1, get_type1(top)) &&
            equal(type2, get_type2(top))
                ? get_item(top)
                : get_coercion_iter(tail(items));
        }
    }
    return get_coercion_iter(coercion_list);
}

const apply = (fun, args) => fun(...listToArray(args));
// function apply_generic(op, args) {
//     const type_tags = map(type_tag, args);
//     const fun = get(op, type_tags);
//
//     return fun !== undefined
//         ? apply(fun, map(contents, args))
//         : console.error(list(op, type_tags),
//             "No method for these types in apply_generic");
// }
function apply_generic(op, args) {
    const type_tags = map(type_tag, args);
    const fun = get(op, type_tags);
    if (!is_undefined(fun)) {
        return apply(fun, map(contents, args));
    } else {
        if (length(args) === 2) {
            const type1 = head(type_tags);
            const type2 = head(tail(type_tags));
            const a1 = head(args);
            const a2 = head(tail(args));
            const t1_to_t2 = get_coercion(type1, type2);
            const t2_to_t1 = get_coercion(type2, type1);
            if (! is_undefined(t1_to_t2)) {
                return apply_generic(op,list(t1_to_t2(a1),
                    a2));
            } else if (! is_undefined(t2_to_t1)) {
                return apply_generic(op, list(a1,
                    t2_to_t1(a2)));
            } else {
                return console.error(list(op, type_tags),
                    "No method for these types");
            }
        } else {
            return console.error(list(op, type_tags),
                "No method for these types");
        }
    }
}
function is_same_variable(v1, v2) {
    return is_variable(v1) &&
        is_variable(v2) && v1 === v2;
}
const math_atan = Math.atan;
const math_sqrt = Math.sqrt;
const math_exp = Math.exp;







module.exports = {
    math_atan, math_sqrt,
    is_same_variable,
    length,
    apply,
    attach_tag,
    apply_generic,
    type_tag,
    assoc,
    contents,
    set_tail,
    is_string,
    is_variable,
    is_object,
    has_own_property,
    is_NaN,
    is_boolean,
    is_undefined,
    list_length,
    count_leaves,
    list,
    head,
    tail,
    is_pair,
    is_null,
    pair,
    append,
    member,
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
    accumulate_n,
    plus,
    enumerate_tree,
    enumerate_interval,
    fib,
    is_even,
    multiply,
    subtract,
    divide,
    divides,
    fold_left,
    flatmap,
    is_prime_sum,
    remove,
    make_pair_sum,
    get, put, equal,
    put_coercion,
    get_coercion,
    math_exp
}