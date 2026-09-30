export const MAP_SAMPLE = `ngl Rep copies the function for each call
Map(f, r) vs Nil => f ~ Ghost, r ~ Nil
Map(f, r) vs Cons(x, s) => f ~ Rep(f1, f2), f1 ~ Fn(x, y), r ~ Cons(y, rest), s ~ Map(f2, rest)

main
  Cons(1, Cons(2, Cons(3, Nil))) ~ Map(Fn(Mul(2, r), r), doubled)
  doubled ~ ShowAll(world, Say['\\n'](Ghost))`