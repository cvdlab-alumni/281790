console.log("Exercise02" + "\n");


function fib_memo (i) {
  if (!(i in fib_memo)) {
    fib_memo[i] = fib_memo(i-1) + fib_memo(i-2);
  }
  return fib_memo[i];
}

fib_memo[0] = 0;
fib_memo[1] = 1;

fib_memo(8);