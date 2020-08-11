import {
    display,
    map,
    filter,
    square,
    is_odd,
    is_even,
    pair,
    list,
    plus,
    accumulate,
    enumerate_tree,
    enumerate_interval,
    fib
} from "../general/index";

const filterOdd = (items) => filter(is_odd, items);
const filterTheList = filterOdd(list(1, 2, 3,4,5,6,7));
const accumulateAdd = (items) => accumulate(plus, 0, items);
// const accumulateAddTheList = accumulateAdd(list(1,2,3,4,5,6));
const accumulatePair = (items) => accumulate(pair, null, items);
// const accumulatePairTheList = accumulatePair(list(1,2,3,4,5));


const sumOddSquares = (tree) => accumulate(plus, 0, map(square, filter(is_odd, enumerate_tree(tree))));
const evenFibs = (n) => accumulate(pair, null, filter(is_even, map(fib, enumerate_interval(0, n))));

const personnel_records = list(list("Linus", "programmer", 30000),
    list("Richard", "programmer", 25000),
    list("Bill", "manager", 2500000));

const is_programmer = record => head(tail(record)) === "programmer";
const salary = record => head(tail(tail(record)));

const salary_of_highest_paid_programmer = records => accumulate(math_max,
    0,
    map(salary,
        filter(is_programmer, records)));




// display(evenFibs(9));
// display(accumulatePairTheList);
// console.log(accumulateAddTheList);
// display(filterTheList);