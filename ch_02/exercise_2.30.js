import { map, list, display, is_pair } from "../general/index";

const tree1 = list(1, 2, 3, 4);
const tree2 = list(list(1, 4), tree1, list(6, 7));

const square_tree = (items) => {
    return map((item) => {
        if (is_pair(item)) {
            return square_tree(item);
        }
        return item * item;
    }, items)
}
// display(square_tree(tree2));