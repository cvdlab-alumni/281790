// Exercise02

/* exercise02a
*  write a function that pushes into an array n random integer numbers
*/

function n_random_nat(n, pow){     //where n = number of integer, pow = 10^pow max order

	var a = [];
	for(var i=0; i< n; i++)
		a[i] = Math.round((Math.random() * Math.pow(10,pow)));

	return a;
}

var rn = n_random_nat(15, 4);


/* exercise02b
*  filter even numbers and return the odd ones
*/

var filter_evens = rn.filter(function(item, index, array){
	return (item%2);
});


/* exercise02c
*  sort obtained numbers from the smallest to the largest+
*/

var compare_f = function(i1,i2){
	return i2 - i1;
};

filter_evens.sort(compare_f);