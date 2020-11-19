import {
    list,
    head,
    tail,
    get,
    is_number,
    is_variable,
    pair,
    math_atan, math_sqrt,
    is_pair, display, square, attach_tag, put,apply_generic
} from "../general/index";


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
    // put("add", list("javascript_number", "javascript_number"),
    //     (x, y) => tag(x + y));
    put("add", list("javascript_number", "javascript_number"),
        (x, y) => {
            console.log(x, y);
            return tag(x+y);
        });
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

debugger;
const t0 = add(n1, n2);

// display(t0);