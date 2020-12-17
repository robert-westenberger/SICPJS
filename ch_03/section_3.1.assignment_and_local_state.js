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
    is_same_variable
} from "../general/index";


function make_withdraw(balance) {
    return amount => {
        if (balance >= amount) {
            balance = balance - amount;
            return balance;
        } else {
            return "Insufficient funds";
        }
    };
}

const W1 = make_withdraw(100);
const W2 = make_withdraw(100);

function make_account(balance) {
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
    function dispatch(m) {
        return m === "withdraw"
            ? withdraw
            : m === "deposit"
                ? deposit
                : error(m, "Unknown request -- make_account");
    }
    return dispatch;
}

const acc = make_account(100);

// acc("withdraw")(50);
// acc("withdraw")(50);