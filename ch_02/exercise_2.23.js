/**
 * @param cb
 * @param elements
 */
const for_each = (cb, elements) => {
    return (elements.length) ? [cb(elements.shift()), for_each(cb, elements)] : [];
};

for_each(x => {console.log(x);}, [55, 53, 1010]);