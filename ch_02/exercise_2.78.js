import {
    list,
  display,
    set_tail,
    apply,map, is_number,
    assoc, tail, pair,
    is_pair, head
} from "../general/index";
/*
* EXERCISE 2.78 EDIT ATTACH_TAG, CONTENTS, AND ATTACH_TAG
* so that the generic system takes advantage of
* internal javascript type system. That is to say,
* the system should work as before except that ordinary
* numbers should be represented simply as JavaScript
* numbers rather than as pairs whose head is the
* string "javascript_number".
* */
function attach_tag(type_tag, contents) {
    return pair(type_tag, contents);
}
function type_tag(datum) {
    return is_pair(datum)
        ? head(datum)
        : is_number(datum) ? "javascript_number" : null;
}
function contents(datum) {
    return is_pair(datum)
        ? tail(datum)
        : datum;
}

function apply_generic(op, args) {
    const type_tags = map(type_tag, args);
    const fun = get(op, type_tags);

    return fun !== undefined
        ? apply(fun, map(contents, args))
        : console.error(list(op, type_tags),
            "No method for these types in apply_generic");
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

function add(x, y) {
    return apply_generic("add", list(x, y));
}
function sub(x, y) {
    return apply_generic("sub", list(x, y));
}
function mul(x, y) {
    return apply_generic("mul", list(x, y));
}
function div(x, y) {
    return apply_generic("div", list(x, y));
}
function install_javascript_number_package() {
    function tag(x) {
        return attach_tag("javascript_number", x);
    }
    put("add", list("javascript_number", "javascript_number"),
        (x, y) => tag(x + y));
    put("sub", list("javascript_number", "javascript_number"),
        (x, y) => tag(x - y));
    put("mul", list("javascript_number", "javascript_number"),
        (x, y) => tag(x * y));
    put("div", list("javascript_number", "javascript_number"),
        (x, y) => tag(x / y));
    put("make", "javascript_number",
        x => tag(x));
    return "done";
}
install_javascript_number_package();
function make_javascript_number(n) {
    return get("make", "javascript_number")(n);
}

const n1 = make_javascript_number(4);
const n2 = make_javascript_number(5);



// console.log(add(4, 5));
// console.log(add(n1, n2));


