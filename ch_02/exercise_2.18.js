/* Define a function reverse that takes a list of arguments and
* returns the same elements in reverse order */
import { list, head, tail, is_null, pair, print_list, append } from "../general";

// Why doesnt is_pair(the_list) ? pair(reverse(tail(the_list)), head(the_list)) : null; work?
// const reverse = (the_list) => {
//     return is_pair(the_list) ? pair(reverse(tail(the_list)), head(the_list)) : null;
//
// }
/**

 * @param the_list
 * @returns the_list in reverse order
 */
const reverse = (the_list) => {

    return is_null(the_list) ? null : append( reverse(tail(the_list)), pair(head(the_list), null));
}

const reverse_iter = (items) => {
    function reverse_iter_impl(items, result) {
        return is_null(items) ? result : reverse_iter_impl(tail(items), pair(head(items), result));
    }
    return reverse_iter_impl(items, null);
}

export const answer_218 = () => {
    const the_list = list(1, 4, 9, 16, 25, 255, 255, 255, 123); // [1, [4, [9, [16, [25, null]]]]]
    const reversed = reverse_iter(the_list); // [25, [16, [9, [4, [1, null]]]]]
    print_list(reversed);

    return reverse(the_list);
}
