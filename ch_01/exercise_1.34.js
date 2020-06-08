function square(n) {
  return n * n;
}
function f(g) {
  return g(2);
}
//f(square)
//square(2)
//4

//f(z => z * (z+1));
//2 * (2 + 1 )
// 6

//f(f); what happens?
//f(f);
//f(2)
//2(2) -> error, cant call number as func (in actuality, g is not a function)
f(f);