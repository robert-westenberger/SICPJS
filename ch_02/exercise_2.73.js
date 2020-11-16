import {
    list,
    head,
    tail,
    get,
    is_number,
    is_variable,
    is_pair, display, square, attach_tag, put,
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


const regDeriv = (exp, variable) => {
    return is_number(exp)
        ? 0
        : is_variable(exp)
            ? (is_same_variable(exp, variable) ? 1 : 0)
            : is_sum(exp)
                ? make_sum(regDeriv(addend(exp), variable),
                    regDeriv(augend(exp), variable))
                : is_product(exp)
                    ? make_sum(make_product(multiplier(exp),
                        regDeriv(multiplicand(exp),
                            variable)),
                        make_product(regDeriv(multiplier(
                            exp),
                            variable),
                            multiplicand(exp)))
                    : error(exp,
                        "unknown expression type in deriv");
}

function operator(exp) {
    return head(exp);
}
function operands(exp) {
    return tail(exp);
}


function install_symbolic_differentiation_package() {
    // internal functions
    function mult(expression, variable) {
        const plier = head(expression);
        const plicand = head(tail(expression));

        return make_sum(make_product(plier,
            data_directed_deriv(plicand,
                variable)),
            make_product(data_directed_deriv(plier,
                variable),
                plicand));
    }
    function add(expression, variable) {
        const addend_value = head(expression);
        const augend_value = head(tail(expression));

        return make_sum(data_directed_deriv(addend_value, variable),
            data_directed_deriv(augend_value, variable))
    }

    put("deriv", "*", mult);
    put("deriv", "+", add);
    return "done";
}

install_symbolic_differentiation_package();


const data_directed_deriv = (expression, variable) => {
    if (is_number(expression)) {
        return 0;
    }
    if (is_variable(expression)) {
        if (is_same_variable(expression, variable)) {
            return 1;
        }
        return 0;
    }

    return get("deriv", operator(expression))(operands(expression), variable);
}

const expr = list("*", "x", 4);
const expr2 = list("*", list("*", "x", "y"), list("+", "x", 4));
const t0 = data_directed_deriv( expr2, "x");
const t1 = regDeriv(expr2, "x");
display(t0);
display(t1);
