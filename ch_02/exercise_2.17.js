// Exercise 2.17 Define a function last_pair that returns the list
//only the last element of a given (nonempty) list..
import { list, head, tail, is_pair } from "../general";



const last_pair = (the_list) => {
    return is_pair(tail(the_list)) ? last_pair(tail(the_list)) : the_list;
}

export const answer_217 = () => {
    const the_list = list(23, 72, 149, 34);
    return last_pair(the_list);
}