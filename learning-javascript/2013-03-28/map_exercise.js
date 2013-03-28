
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