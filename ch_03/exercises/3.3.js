import {
    square,
    list,
    head,
    tail,
    attach_tag,
    put,
    pair,
    get,
    apply_generic,
    contents,
    display, is_null, equal,
    math_sqrt,
    math_atan,
    put_coercion,
    get_coercion,
    is_same_variable,
    accumulate,
    make_pair_sum
} from "../../general/index";



function make_account(balance, password) {
    function withdraw(amount) {
        if (balance >= amount) {
            balance = balance - amount;
            return balance;
        } else {
            return "Insufficient funds";
        }
    }
    function deposit(amount) {
        balance = balance + amount;
        return balance;
    }
    function dispatch(m, pass) {
        if (pass !== password) {
            return () => { return "Incorrect password"}
        }
        return m === "withdraw"
            ? withdraw
            : m === "deposit"
                ? deposit
                : console.error(m, "Unknown request -- make_account");
    }
    return dispatch;
}

const acc = make_account(100, "secret_password");

// console.log(acc("withdraw", "secret_password")(50));