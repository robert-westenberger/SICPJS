import {
    square,
    list,
    head,
    tail,
    attach_tag,
    put,
    pair,
    get,
    math_exp,
    accumulate,
    contents,
    display, is_null, equal,
    math_sqrt,
    math_atan,
    is_undefined,map,length,apply,type_tag,
    put_coercion,
    get_coercion
} from "../general/index";


/** Exercise 2.82 handle any number of arguments.
 * */
function apply_generic(op, args) {
    const type_tags = map(type_tag, args);
    const fun = get(op, type_tags);
    if (!is_undefined(fun)) {
        return apply(fun, map(contents, args));
    }

    const coercionData = accumulate((currentItem, currentValue) => {

        if (is_null(currentValue)) {
            return pair(type_tag(currentItem)); // type
        }

        const currentItemType = type_tag(currentItem);
        const currentValueType = type_tag(currentValue);

        if (currentValueType === currentItemType) {
            return currentValue;
        }

        const t1_to_t2 = get_coercion(currentValueType, currentItemType);
        const t2_to_t1 = get_coercion(currentItemType, currentValueType);

        if (t1_to_t2) {
            return pair(currentItemType, t1_to_t2);
        }
        if (t2_to_t1) {
            return pair(currentValueType, t2_to_t1);
        }

        return currentValue;
    }, null, args);

    const coerceTo = type_tag(coercionData);
    const coerceFunction = contents(coercionData);

    const newArgs = map((arg) => {
        const type = type_tag(arg);
        if (type === coerceTo) {
            return arg;
        }
        return coerceFunction(arg);
    }, args);
    return accumulate((currentItem, currentValue) => {
        if (is_null(currentValue)) {
            return currentItem;
        }
        return apply_generic(op, list(currentValue, currentItem));
    }, null, newArgs);
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




function make_javascript_number(n) {
    return get("make", "javascript_number")(n);
}


put_coercion("javascript_number", "complex",
    javascript_number_to_complex);
function exp(x, y) {
    return apply_generic("exp", list(x, y));
}
const c = make_complex_from_real_imag(222, 1);
const d = make_complex_from_real_imag(4, 55);
const e = make_javascript_number(7);
const f = make_javascript_number(2);
const ans = add(e, c, d);
// display(ans);