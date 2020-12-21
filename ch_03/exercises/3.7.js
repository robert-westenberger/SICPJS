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
        switch(m) {
            case "withdraw":
                return withdraw;
            case "deposit":
                return deposit;
            case "check password":
                return () => true; // passes password check up above
            default:
                console.error(m, "Unknown request -- make_account");
        }

    }
    return dispatch;
}

/***
 *
 * @param password_protected_account
 * @param password
 * @param new_password
 */
function make_joint(password_protected_account, password, new_password) {
    const new_pass = new_password;
    return (message, pw) => {
        if (pw !== new_pass) {
            return () => "Wrong joint account password";
        }
        const access_linked = password_protected_account(message, password);
        // still using here, the dispatch methods of original password_protected_account
        if (access_linked(0) === "Incorrect Password") {
            return () => "Wrong linked account password";
        }
        return access_linked;
    };
}
const peter_account = make_account(100, "secret_password");
const paul_account = make_joint(peter_account, "secret_password", "rosebud");

console.log(peter_account("deposit", "secret_password")(100));
console.log(paul_account("deposit", "rosebud")(100));
// console.log(paul_account("deposit", "secret_password")(100));
