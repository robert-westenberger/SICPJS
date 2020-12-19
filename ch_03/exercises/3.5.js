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
    is_same_variable,
    accumulate,
    make_pair_sum,
    pseudo_rand,
    rand,gcd
} from "../../general/index";



function estimate_pi(trials) {
    return math_sqrt(6 / monte_carlo(trials, dirichlet_test));
}

function dirichlet_test() {
    return gcd(pseudo_rand(), pseudo_rand()) === 1;
}

function monte_carlo(trials, experiment) {
    function iter(trials_remaining, trials_passed) {
        if (trials_remaining === 0) {
            return trials_passed / trials;
        } else if (experiment()) {
            return iter(trials_remaining - 1,
                trials_passed + 1);
        } else {
            return iter(trials_remaining - 1,
                trials_passed);
        }
    }
    return iter(trials, 0);
}

const pi = estimate_pi(10000);

