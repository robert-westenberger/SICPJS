const add = (a) => ((b) => (a + b));

const brooks_curried = (argList) => {
    const current_val = argList.shift();
    if (typeof current_val === "function") {
        return brooks_curried([current_val(argList[0]), ...argList.slice(1)]);
    }
    return current_val;
}
// brooks_curried([add, 3, 4])
// console.log(brooks_curried([add, 3, 4]));

const brooks = (curry_func, argList) => {
    const current_val = curry_func(argList.shift());
    if (typeof current_val === "function") {
        return brooks(current_val, argList);
    }
    return current_val;
}

// console.log(brooks_curried([brooks_curried, [add, 3, 4]]));
// console.log(brooks_curried([brooks_curried, [brooks_curried,
//     [add, 3, 4]]]));

//
// console.log(brooks(add, [3, 4])); // 7


