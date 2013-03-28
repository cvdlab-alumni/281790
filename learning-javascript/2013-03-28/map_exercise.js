
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


//EX5: toroide con raggio di circonferenza 1
// http://it.wikipedia.org/wiki/Toro_(geometria)

var dtoro = DOMAIN([[0,2*PI],[0,2*PI]])([72,72]);
//R = distanza dal centro, > raggio circonferenza
var R = 3;

var mapping = function(v){
	var p = v[0];
	var t = v[1];

	var fc1 = [(R + COS(p)) * COS(t)];

	var fc2 = [(R + COS(p)) * SIN(t)];

	var fc3 = [SIN(p)];

	return [fc1,fc2,fc3];
};

var toro = MAP(mapping)(dtoro);

DRAW(toro);


//EX5: toroide con raggio di circonferenza e distanza dal centro qualsiasi (R>r)
// http://it.wikipedia.org/wiki/Toro_(geometria)

var dtoro = DOMAIN([[0,2*PI],[0,2*PI]])([72,72]);
//R = distanza dal centro, > raggio circonferenza

var mapping = function(R,r){
	
	return function(v){
		var p = v[0];
		var t = v[1];

		var fc1 = [(R + r*COS(p)) * COS(t)];

		var fc2 = [(R + r*COS(p)) * SIN(t)];

		var fc3 = [r*SIN(p)];

		return [fc1,fc2,fc3];
	};

};

var toro = MAP(mapping(5,1))(dtoro);

DRAW(toro);

