import {
    square,
    list,
    head,
    tail,
    attach_tag,
    put,
    pair,
} from "../general/index";

function install_rectangular_package() {
    // internal functions
    function real_part(z) { return head(z); }
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

