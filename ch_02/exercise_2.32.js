// 2.32 finish function subsets
import { map,
    list,
    append,
    tail,
    display,
    pair,
    head,
    is_null } from "../general/index";



/**
 * Algorithm for finding the powerset ( set of all subsets)
 * @param s
 * @returns {Pair}
 */
const subsets = (s) => {
    if (is_null(s)) {
        return list(null);
    }
    const rest = subsets(tail(s));

    return append(rest, map((item) => {
        // display(pair(head(s), item));
        return pair(head(s), item);
    }, rest));
}
const x = list(1, 2, 3, 4);
const t0 = subsets(x);
// display(t0);