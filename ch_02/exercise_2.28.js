import {append, head, is_null, pair, is_pair, tail,
    list, display} from "../general";

const x = list(list(1, 2), list(3, 4));

const fringe = (tree) => {
    if (is_null(tree)) {
        return null;
    }
    if (is_pair(tree)) {
        return append(
            fringe(head(tree)),
            fringe(tail(tree))
        );
    }
    return list(tree);
}

const t1 = fringe(list(x, x));
// display(t1);