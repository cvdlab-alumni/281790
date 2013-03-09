//Exercise 01

/* exercise01a
*  write a function that pushes into an array the first n natural numbers
*/

function n_natural(n){

	var a = [];
	for(var i=1; i<= n; i++)
		a[i-1] = i;

	return a;
}

var f = n_natural(10);


/*exercise01b
* filter out odd number and return the even ones
*/

var filterOdds = f.filter(function(item, index, array){
	return !(item % 2);
});

/* exercise01c
*double each even number obtained
*/

var doubleEvery = filterOdds.map(function(item, index, array){
	return (item *2);
});


/* exercise01d
*  return only numbers divisible by four
*/

var div_four = doubleEvery.filter(function(item, index, array){
	return !(item%4);
});


/* exercise01e
*  sum all the remaining numbers
*/

var sum_all= div_four.reduce(function(prev, cur, index, array){
	return (prev + cur);
});