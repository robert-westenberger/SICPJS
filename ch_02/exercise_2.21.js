//Func square_list takes numbers as argument and returns a list
// of the squares of those numbers..
//Write it two ways,

const squareList1 = (items) => {
    return items.map((item) => {
        return item * item;
    });
}

const squareList2 = (items) => {
    const current_val = items.shift();
    return items.length === 0 ?
        [current_val * current_val] :
        [current_val * current_val, ...squareList2(items)];
}
// squareList1([1, 2, 3, 4]);
console.log(squareList2([1, 2, 3, 4]));
