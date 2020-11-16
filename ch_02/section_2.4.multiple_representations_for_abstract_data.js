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
    display
} from "../general/index";

function install_rectangular_package() {
    // internal functions
    function real_part(z) {
        // display("real part...");
        // display(z);
        return head(z);
    }
    function imag_part(z) { return tail(z); }
    function make_from_real_imag(x, y) { return pair(x, y); }
    function magnitude(z) {
        return Math.sqrt(square(real_part(z)) +
            square(imag_part(z)));
    }
    function angle(z) {
        return Math.atan2(imag_part(z), real_part(z));
    }
    function make_from_mag_ang(r, a) {
        return pair(r * Math.cos(a), r * Math.sin(a));
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

function add_complex(z1, z2) {
    return make_from_real_imag(
        real_part(z1) + real_part(z2),
        imag_part(z1) + imag_part(z2));
}
function sub_complex(z1, z2) {
    return make_from_real_imag(
        real_part(z1) - real_part(z2),
        imag_part(z1) - imag_part(z2));
}
function mul_complex(z1, z2) {
    return make_from_mag_ang(
        magnitude(z1) * magnitude(z2),
        angle(z1) + angle(z2));
}
function div_complex(z1, z2) {
    return make_from_mag_ang(
        magnitude(z1) / magnitude(z2),
        angle(z1) - angle(z2));
}

function make_from_real_imag(x, y) {
    return get("make_from_real_imag", "rectangular")(x, y);
}
function make_from_mag_ang(r, a) {
    return get("make_from_mag_ang", "polar")(r, a);
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

const my_complex_number =
    make_from_real_imag(1.0, 4.5);


const result =
    add_complex(my_complex_number,
        my_complex_number);

display(result);

display(imag_part(result))