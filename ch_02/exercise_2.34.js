import {accumulate, list, pair, display } from "../general";



const horner_eval = (x, coefficient_sequence) => accumulate(
    (this_coefficient, higher_terms) => {

        return x * higher_terms + this_coefficient;
    },
    0, coefficient_sequence);

// For example, to compute 1+3x+5x3+x5 at x=2 you would evaluate
horner_eval(2, list(1, 3, 0, 5, 0, 1));
