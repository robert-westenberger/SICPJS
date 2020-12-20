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


function estimate_pi_non_recurse(trials) {
    // function monte_carlo_non_recurse(trials, experiment) {
    //     function iter(trials_remaining, trials_passed) {
    //         if (trials_remaining === 0) {
    //             return trials_passed / trials;
    //         } else if (experiment()) {
    //             return iter(trials_remaining - 1,
    //                 trials_passed + 1);
    //         } else {
    //             return iter(trials_remaining - 1,
    //                 trials_passed);
    //         }
    //     }
    //     return iter(trials, 0);
    // }
    function monte_carlo_non_recurse(trials, experiment) {
        let trials_passed = 0;
        for (let i = 0; i <= trials; i++) {
            if (experiment()) trials_passed++;
        }

        return trials_passed / trials;
    }
    return math_sqrt(6 / monte_carlo_non_recurse(trials, dirichlet_test));
}

function dirichlet_test() {
    return gcd(pseudo_rand(), pseudo_rand()) === 1;
}
function estimate_pi(trials) {
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
    return math_sqrt(6 / monte_carlo(trials, dirichlet_test));
}



// const res = (a, b) => a && Math.abs(a - b) / a;
// const native_pi = Math.PI;
// // value the authors came up with.
// const sicp_author_source_pi = 3.1408877612819492;
// const sicp_native_delta = res(native_pi, sicp_author_source_pi);
// const num_trials = 10000;
// const pi = estimate_pi_non_recurse(num_trials);
// console.log(pi);
// const non_recurse_delta = res(pi, native_pi);
// const pi_estimation_at_num_trials_better_than_sicp = non_recurse_delta < sicp_native_delta;
// console.log(res(non_recurse_delta, sicp_native_delta));
// const pi_2 = estimate_pi(num_trials);
// console.log(pi_2, res(pi_2, native_pi));
// console.log(res(pi, pi_2));

function random(n) {
    return Math.random() * n;
}

function random_in_range(low, high) {
    const range = high - low;
    return low + random(range);
}


/***
 *
 * @param x1
 * @param x2
 * @param y1
 * @param y2
 * @param trials
 */
function estimate_integral(x1, x2, y1, y2, trials) {
    const circle_center_x = 0;
    const circle_center_y = 0;
    const circle_radius = 0.5;
    const predicate = (x, y) => {
        const a = ((x - circle_center_x)**2);
        const b = ((y - circle_center_y)**2);
        const c = circle_radius**2;
        return a + b <= c;
    };


    function monte_carlo_non_recurse(trials, experiment) {
        let trials_passed = 0;
        for (let i = 0; i <= trials; i++) {
            let random_point_x = random_in_range(x1, x2);
            let random_point_y = random_in_range(y1, y2);
            if (experiment(random_point_x, random_point_y)) trials_passed++;
        }
        return trials_passed / trials;
    }
    const width = Math.abs(x1 - x2);
    const length = Math.abs(y1 - y2);
    const area = width * length;
    const test = monte_carlo_non_recurse(trials, predicate);
    return (area * test) / circle_radius**2;

}


const a = estimate_integral(-1, 1, -1, 1, 10**7);
console.log(a);