import {is_null, head, tail, is_pair, pair, map, list, display } from "../general";
//
// /**
//  * Returns a tree with all the leaves multiplied by factor
//  * @param tree - A tree whos leaves are numbers
//  * @param factor
//  * @returns {Pair|null|number}
//  */
// const scale_tree = (tree, factor) => {
//     if (is_null(tree)) {
//         return null;
//     }
//     if (!is_pair(tree)) {
//         return tree * factor;
//     }
//     return pair(
//         scale_tree(head(tree), factor),
//         scale_tree(tail(tree), factor)
//     );
// }
// /**
//  * Another way of scaling the tree is recursively
//  * mapping over the tree, treating it as a sequence
//  * of subtrees.
//  * @param tree
//  * @param factor
//  * @returns {null|Pair}
//  */
// const scale_tree_map = (tree, factor) => {
//     return map((sub_tree) => {
//         if (is_pair(sub_tree)) {
//             return scale_tree_map(sub_tree, factor);
//         }
//         return sub_tree * factor;
//     }, tree);
// }

// console.log(scale_tree_map(list(1, list(2, list(3, 4), 5), list(6, 7)),
//     10))