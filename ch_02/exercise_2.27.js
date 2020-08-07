import {append, head, is_null, pair, is_pair, tail, list, print_list} from "../general";

const reverse = (the_list) => {
    return is_null(the_list) ? null : append( reverse(tail(the_list)), pair(head(the_list), null));
}


const reverse_iter = (items) => {

    function reverse_iter_impl(items, result) {
        return is_null(items) ? result : reverse_iter_impl(tail(items), pair(head(items), result));
    }
    return reverse_iter_impl(items, null);
}



const deep_reverse = (the_list) => {

    if (is_null(the_list)) {
        return null;
    }
    if (is_pair(the_list)) {
        return append(
            deep_reverse(tail(the_list),),
            pair(deep_reverse(head(the_list)))
        );
    }
    return the_list;
}
