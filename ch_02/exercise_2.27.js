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

const deep_reverse_iter = (the_list) => {
    const deep_reverse_impl = (the_list, result) => {

        if (is_null(the_list)) {
            return result;
        }
        if (is_pair(the_list)) {
            return append(
                deep_reverse_impl(tail(the_list), null),
                pair(deep_reverse_impl(head(the_list)), null)
            );
        }
        return the_list;
    }
    return deep_reverse_impl(the_list, the_list);
}

const t1 = deep_reverse_iter(list(list(1, 2), list(3, 4), list(5, 6)));
console.log(t1);