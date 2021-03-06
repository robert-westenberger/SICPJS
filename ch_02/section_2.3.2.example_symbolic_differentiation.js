import {
    is_number,
    is_variable,
    is_pair,
    display,
    list,head, tail
} from "../general/index";


function is_same_variable(v1, v2) {
    return is_variable(v1) &&
        is_variable(v2) && v1 === v2;
}

function is_sum(x) {
    return is_pair(x) && head(x) === "+";
}





function addend(s) {
    return head(tail(s));
}

function augend(s) {
    return head(tail(tail(s)));
}

function is_product(x) {
    return is_pair(x) && head(x) === "*";
}

function multiplier(s) {
    return head(tail(s));
}

function multiplicand(s) {
    return head(tail(tail(s)));
}

function number_equal(exp, num) {
    return is_number(exp) && exp === num;
}

function make_product(m1, m2) {
    return number_equal(m1, 0) || number_equal(m2, 0)
        ? 0
        : number_equal(m1, 1)
            ? m2
            : number_equal(m2, 1)
                ? m1
                : is_number(m1) && is_number(m2)
                    ? m1 * m2
                    : list("*", m1, m2);
}

function make_sum(a1, a2) {
    return number_equal(a1, 0)
        ? a2
        : number_equal(a2, 0)
            ? a1
            : is_number(a1) && is_number(a2)
                ? a1 + a2
                : list("+", a1, a2);
}

const error = (msg) => {
    console.error(msg);
}


const deriv = (expression, variable) => {

    if (is_number(expression)) {
        return 0;
    }
    if (is_variable(expression)) {
        if (is_same_variable(expression, variable)) {
            return 1;
        }
        return 0;
    }
    if (is_sum(expression)) {
        return make_sum(deriv(addend(expression), variable),
            deriv(augend(expression), variable));
    }
    if (is_product(expression)) {
        return make_sum(make_product(multiplier(expression),
            deriv(multiplicand(expression),
                variable)),
            make_product(deriv(multiplier(expression),
                variable),
                multiplicand(expression)));
    }
    return error(expression,
        "unknown expression type in deriv");
}


debugger;
const derivation_01 = deriv(list("*", list("*", "x", "y"), list("+", "x", 3)), "x");
// display(derivation_01);


