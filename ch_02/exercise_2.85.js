import {
    square,
    list,
    head,
    tail,
    attach_tag,
    put,
    pair,
    get,
    divide,
    math_exp,
    contents,
    display, is_null, equal,
    math_sqrt,
    math_atan,
    is_undefined, map, length, apply, type_tag,
    put_coercion,
    get_coercion, accumulate, index_of, is_number, list_index_exists,
    contains
} from "../general/index";
import {list_ref} from "../general";


function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function add(...args) {
    return apply_generic("add", list(...args));
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

function real_part(z) {
    return apply_generic("real_part", list(z));
}
function imag_part(z) {
    return apply_generic("imag_part", list(z));
}
function magnitude(z) {
    return apply_generic("magnitude", list(z));
}
function angle(z) {
    return apply_generic("angle", list(z));
}



function install_rectangular_package() {
    // internal functions
    function real_part(z) { return head(z); }
    function imag_part(z) { return tail(z); }
    function make_from_real_imag(x, y) { return pair(x, y); }
    function magnitude(z) {
        return math_sqrt(square(real_part(z)) +
            square(imag_part(z)));
    }
    function angle(z) {
        return math_atan(imag_part(z), real_part(z));
    }
    function make_from_mag_ang(r, a) {
        return pair(r * math_cos(a), r * math_sin(a));
    }

    // interface to the rest of the system
    function tag(x) {
        return attach_tag("rectangular", x);
    }
    put("real_part", list("rectangular"), real_part);
    put("imag_part", list("rectangular"), imag_part);
    put("magnitude", list("rectangular"), magnitude);
    put("angle", list("rectangular"), angle);
    put("make_from_real_imag", "rectangular",
        (x, y) => tag(make_from_real_imag(x, y)));
    put("make_from_mag_ang", "rectangular",
        (r, a) => tag(make_from_mag_ang(r, a)));
    return "done";
}

install_rectangular_package();

function install_polar_package() {
    // internal functions
    function magnitude(z) { return head(z); }
    function angle(z) { return tail(z); }
    function make_from_mag_ang(r, a) { return pair(r, a); }
    function real_part(z) {
        return magnitude(z) * math_cos(angle(z));
    }
    function imag_part(z) {
        return magnitude(z) * math_sin(angle(z));
    }
    function make_from_real_imag(x, y) {
        return pair(math_sqrt(square(x) + square(y)),
            math_atan(y, x));
    }

    // interface to the rest of the system
    function tag(x) { return attach_tag("polar", x); }
    put("real_part", list("polar"), real_part);
    put("imag_part", list("polar"), imag_part);
    put("magnitude", list("polar"), magnitude);
    put("angle", list("polar"), angle);
    put("make_from_real_imag", "polar",
        (x, y) => tag(make_from_real_imag(x, y)));
    put("make_from_mag_ang", "polar",
        (r, a) => tag(make_from_mag_ang(r, a)));
    return "done";
}

install_polar_package();

function install_complex_package() {
    // imported functions from rectangular and polar packages
    function make_from_real_imag(x, y) {
        return get("make_from_real_imag", "rectangular")(x, y);
    }
    function make_from_mag_ang(r, a) {
        return get("make_from_mag_ang", "polar")(r, a);
    }

    // internal functions
    function add_complex(z1, z2) {
        return make_from_real_imag(real_part(z1) + real_part(z2),
            imag_part(z1) + imag_part(z2));
    }
    function sub_complex(z1, z2) {
        return make_from_real_imag(real_part(z1) - real_part(z2),
            imag_part(z1) - imag_part(z2));
    }
    function mul_complex(z1, z2) {
        return make_from_mag_ang(magnitude(z1) * magnitude(z2),
            angle(z1) + angle(z2));
    }
    function div_complex(z1, z2) {
        return make_from_mag_ang(magnitude(z1) / magnitude(z2),
            angle(z1) - angle(z2));
    }

    // interface to rest of the system
    function tag(z) {
        return attach_tag("complex", z);
    }
    put("add", list("complex", "complex"),
        (z1, z2) => tag(add_complex(z1, z2)));
    put("sub", list("complex", "complex"),
        (z1, z2) => tag(sub_complex(z1, z2)));
    put("mul", list("complex", "complex"),
        (z1, z2) => tag(mul_complex(z1, z2)));
    put("div", list("complex", "complex"),
        (z1, z2) => tag(div_complex(z1, z2)));
    put("make_from_real_imag", "complex",
        (x, y) => tag(make_from_real_imag(x, y)));
    put("make_from_mag_ang", "complex",
        (r, a) => tag(make_from_mag_ang(r, a)));
    return "done";
}

install_complex_package();

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
    put("exp", list("javascript_number", "javascript_number"),
        // (x, y) => tag((math_exp(x, y))));
        (x, y) => tag((Math.exp(x + y))));
    return "done";
}
install_javascript_number_package();
function javascript_number_to_complex(n) {
    return make_complex_from_real_imag(contents(n), 0);
}
function make_complex_from_real_imag(x, y){
    return get("make_from_real_imag", "complex")(x, y);
}

function make_complex_from_mag_ang(r, a){
    return get("make_from_mag_ang", "complex")(r, a);
}


function install_rational_package() {
    // internal functions
    function numer(x) {
        return head(x);
    }
    function denom(x) {
        return tail(x);
    }
    function make_rat(n, d) {
        const g = gcd(n, d);
        return pair(n / g, d / g);
    }
    function add_rat(x, y) {
        return make_rat(numer(x) * denom(y) + numer(y) * denom(x),
            denom(x) * denom(y));
    }
    function sub_rat(x, y) {
        return make_rat(numer(x) * denom(y) - numer(y) * denom(x),
            denom(x) * denom(y));
    }
    function mul_rat(x, y) {
        return make_rat(numer(x) * numer(y),
            denom(x) * denom(y));
    }
    function div_rat(x, y) {
        return make_rat(numer(x) * denom(y),
            denom(x) * numer(y));
    }

    // interface to rest of the system
    function tag(x) {
        return attach_tag("rational", x);
    }
    put("add", list("rational", "rational"),
        (x, y) => tag(add_rat(x, y)));
    put("sub", list("rational", "rational"),
        (x, y) => tag(sub_rat(x, y)));
    put("mul", list("rational", "rational"),
        (x, y) => tag(mul_rat(x, y)));
    put("div", list("rational", "rational"),
        (x, y) => tag(div_rat(x, y)));
    put("make", "rational",
        (n, d) => tag(make_rat(n, d)));
    return "done";
}
install_rational_package();


function install_real_package() {
    function tag(x) {
        return attach_tag("real", x);
    }
    function numer(x) {
        return head(x);
    }
    function denom(x) {
        return tail(x);
    }

    put("make", "real",
        x => tag(numer(x) / denom(x)));

    return "done";
}
install_real_package();

function make_javascript_number(n) {
    return get("make", "javascript_number")(n);
}


put_coercion("javascript_number", "rational", x => get("make", "rational")(x, 1));


put_coercion("rational", "real", x => get("make", "real")(x));


put_coercion("real", "complex", x => get("make_from_real_imag", "complex")(x, 0));


put("raise", list("javascript_number"), x => get_coercion("javascript_number", "rational")(x));
put("raise", list("rational"), x => get_coercion("rational", "real")(x));
put("raise", list("real"), x => get_coercion("real", "complex")(x));

const types = list("javascript_number", "rational", "real", "complex");

/**
 * if target_type exists, will successively raise until z is at that target.
 * Just assume target_type and type of z are in tower.
 * @param z
 * @param target_type
 * @returns {null}
 */
function raise(z, target_type) {
    const type = type_tag(z);
    const type_index = index_of(types, type);
    const supertype_exists = is_number(type_index) ? list_index_exists(types, type_index + 1) : null;


    if (supertype_exists && target_type && type !== target_type) {
        return raise(apply_generic("raise", list(z)), target_type);
    }

    if (supertype_exists) {
        return apply_generic("raise", list(z));
    }
    if (target_type && type === target_type) {
        return z;
    }
    // throw error...?
    return null;
}

/**
 * inverse of raise. Will drop a type down (if possible).
 * @param z
 * @param target_type
 * @returns {null}
 */
function drop(z, target_type) {

    return null;
    const type = type_tag(z);
    const type_index = index_of(types, type);
    const subtype_exists = is_number(type_index) ? list_index_exists(types, type_index - 1) : null;


    if (subtype_exists && target_type && type !== target_type) {
        return raise(apply_generic("drop", list(z)), target_type);
    }

    if (subtype_exists) {
        return apply_generic("drop", list(z));
    }
    if (target_type && type === target_type) {
        return z;
    }
    // throw error...?
    return null;
}
function project(z, target_type) {

}
function find_highest_type(args) {
    const highest_index = accumulate((arg, cv) => {
        if (is_null(cv)) {
            return 0;
        }
        const arg_type = type_tag(arg);
        const arg_in_tower = contains(types, arg_type);
        const index_of_arg = arg_in_tower ? index_of(types, arg_type) : -1;
        if (index_of_arg > cv) {
            return index_of_arg;
        }
        return cv;
    }, null, args);
    return list_ref(types, highest_index);
}
function exp(x, y) {
    return apply_generic("exp", list(x, y));
}


// copy from exercise 2.82
function apply_generic(op, args) {
    const type_tags = map(type_tag, args);
    const fun = get(op, type_tags);
    if (!is_undefined(fun)) {
        return apply(fun, map(contents, args));
    }

    const highest_type = find_highest_type(args);

    const new_args = map(arg => raise(arg, highest_type), args);
    return accumulate((currentItem, currentValue) => {
        if (is_null(currentValue)) {
            return currentItem;
        }
        return apply_generic(op, list(currentValue, currentItem));
    }, null, new_args);
}

const c = make_complex_from_real_imag(222, 1);
const d = make_complex_from_real_imag(4, 55);
const e = make_javascript_number(7);
const f = make_javascript_number(2);
const ans = add(e, c, d, f);

