
//EX: disegnare circonferenza di raggio 1

var d0 = DOMAIN([[0,2*PI]])([72]);

var x = function(v){
	return [COS(v[0])];
};

var y = function(v){
	return [SIN(v[0])];
};

var mappings = [x,y];

var circonferenza = MAP(mappings)(d0);

DRAW(circonferenza);

//EX2: circonferenza raggio qualsiasi


var d0 = DOMAIN([[0,2*PI]])([72]);
var r = 2;
var mapping = function(v){
	return [r*COS(v[0]), r*SIN(v[0])];
};

var circonferenza2 = MAP(mapping)(d0);

DRAW(circonferenza);

//EX3
var circle = function(r){
	return function(v){
		return [r*COS(v[0]), r*SIN(v[0])];
	};
};

var mapping = circle(3);
var circonferenza3 = MAP(mapping)(d0);


//EX4: sfera
//il dominio deve essere tra due elementi, a = da 0 a Pi, b = da 0 a 2*PI

var dsfera = DOMAIN([[0,PI],[0,2*PI]])([120,120]);

var mapping = function(v){
	return [ [SIN(v[0])*COS(v[1])], [SIN(v[0])*SIN(v[1])], [COS(v[0])]	]
};

var sphere = MAP(mapping)(dsfera);

DRAW(sphere);