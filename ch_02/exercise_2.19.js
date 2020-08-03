import { list, head, tail, is_null, pair, print_list, append } from "../general";

const us_coins = list(50, 25, 10, 5, 1);
const uk_coins = list(100, 50, 20, 10, 5, 2, 1, 0.5);


const no_more = (coin_values) => {
    return is_null(coin_values);
}
const first_denomination = (coin_values) => {
    return head(coin_values);
}
const except_first_denomination = (coin_values) => {
    return tail(coin_values);
}


const cc = (amount, coin_values) => {

    return amount === 0 ///
        ? 1
        : amount < 0 || no_more(coin_values)
            ? 0
            : cc(amount,
            except_first_denomination(coin_values))
            +
            cc(amount - first_denomination(coin_values),
                coin_values);
}

// console.log(cc(49, us_coins));
// Exercise 2.19 - Define funcs no_more,
// except_first_denomination, first_denomination