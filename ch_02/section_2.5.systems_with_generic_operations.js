import {
    square,
    list,
    head,
    tail,
    attach_tag,
    put,
    pair,
    get,
    apply_generic,
    contents,
    display, is_null, equal,
    math_sqrt,
    math_atan,
    put_coercion,
    get_coercion,
    is_same_variable
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

put_coercion("javascript_number", "complex",
    javascript_number_to_complex);
function make_javascript_number(n) {
    return get("make", "javascript_number")(n);
}

const c = make_complex_from_real_imag(4, 3);

const n = make_javascript_number(7);

// add(c, n);
function install_javascript_number_is_equal_to_zero() {
    put("is_equal_to_zero", list("javascript_number"),
        x => x === 0);
    return "done";
}
install_javascript_number_is_equal_to_zero();

function is_equal_to_zero(x) {
    return apply_generic("is_equal_to_zero", list(x));
}

function install_polynomial_package() {

    // internal functions

    // representation of poly
    function make_poly(variable, term_list) {
        return pair(variable, term_list);
    }
    function variable(p) { return head(p); }
    function term_list(p) { return tail(p); }

    // representation of terms and term lists
    function adjoin_term(term, term_list) {
        return is_equal_to_zero(coeff(term))
            ? term_list
            : pair(term, term_list);
    }
    const the_empty_termlist = null;
    function first_term(term_list) {
        return head(term_list);
    }
    function rest_terms(term_list) {
        return tail(term_list);
    }
    function is_empty_termlist(term_list) {
        return is_null(term_list);
    }
    function make_term(order, coeff) {
        return list(order, coeff);
    }
    function order(term) {
        return head(term);
    }
    function coeff(term) {
        return head(tail(term));
    }

    function add_poly(p1, p2) {
        return is_same_variable(variable(p1), variable(p2))
            ? make_poly(variable(p1),
                add_terms(term_list(p1),
                    term_list(p2)))
            : error(list(p1, p2),
                "Polys not in same var -- add_poly");
    }

    function add_terms(L1, L2) {
        if (is_empty_termlist(L1)) {
            return L2;
        }
        else if (is_empty_termlist(L2)) {
            return L1;
        }
        else {
            const t1 = first_term(L1);
            const t2 = first_term(L2);
            if (order(t1) > order(t2)) {
                return adjoin_term(t1, add_terms(rest_terms(L1), L2));
            } else if (order(t1) < order(t2)) {
                return adjoin_term(t2, add_terms(L1, rest_terms(L2)));
            } else {
                return adjoin_term(make_term(order(t1),
                    add(coeff(t1),
                        coeff(t2))),
                    add_terms(rest_terms(L1),
                        rest_terms(L2)));
            }
        }
    }

    function mul_poly(p1, p2) {
        return is_same_variable(variable(p1), variable(p2))
            ? make_poly(variable(p1),
                mul_terms(term_list(p1),
                    term_list(p2)))
            : error(list(p1, p2),
                "Polys not in same var -- mul_poly");
    }

    function mul_terms(L1, L2) {
        return is_empty_termlist(L1)
            ? the_empty_termlist
            : add_terms(mul_term_by_all_terms(
                first_term(L1), L2),
                mul_terms(rest_terms(L1), L2));
    }
    function mul_term_by_all_terms(t1, L) {
        if (is_empty_termlist(L)) {
            return the_empty_termlist;
        } else {
            const t2 = first_term(L);
            return adjoin_term(
                make_term(order(t1) + order(t2),
                    mul(coeff(t1), coeff(t2))),
                mul_term_by_all_terms(t1, rest_terms(L)));
        }
    }

    // interface to rest of the system
    function tag(p) {
        return attach_tag("polynomial", p);
    }
    put("add", list("polynomial", "polynomial"),
        (p1, p2) => tag(add_poly(p1, p2)));
    put("mul", list("polynomial", "polynomial"),
        (p1, p2) => tag(mul_poly(p1, p2)));
    put("make", "polynomial",
        (variable, terms) =>
            tag(make_poly(variable, terms)));
    return "done";
}
install_polynomial_package();

function make_polynomial(variable, terms) {
    return get("make", "polynomial")(variable, terms);
}
function make_term(order, coeff) {
    return list(order, coeff);
}
const p1 = make_polynomial("x",
    list(make_term(2, make_javascript_number(4)),
        make_term(1, make_javascript_number(3)),
        make_term(0, make_javascript_number(7))));
const p2 = make_polynomial("x",
    list(make_term(2, make_javascript_number(5)),
        make_term(1, make_javascript_number(2)),
        make_term(0, make_javascript_number(10))));

const t0 = mul(p1, p2);
display(t0);
