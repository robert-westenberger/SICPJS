
import { list, head, tail, is_null, pair, print_list, append, square } from "../general";

// THIS IS NOT A CORRECT SOLUTION

function square_list_incorrect(items) {
    function iter(things, answer) {
        return is_null(things)
            ? answer
            : iter(tail(things),
                pair(square(head(things)),
                    answer));
    }
    return iter(items, null);
}

function square_list_correct(items) {
    function iter(things, answer) {
        console.log(things);
        return is_null(things)
            ? answer
            : pair(square(head(things)),iter(tail(things)));
    }
    return iter(items, null);
}

// console.log(square_list_correct(list(1, 2, 3, 4)));
// console.log(square_list_incorrect(list(1, 2, 3, 4)));