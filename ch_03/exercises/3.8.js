

const make_f = () => {
    let has_been_called = false;

    return (n) => {
        if (!has_been_called) {
            has_been_called = true;
            return n;
        }

        return 0;
    }
}
const f = make_f();

// console.log(f(0) + f(1)); // return 0
// console.log(f(1) + f(0)); // return 1