//Contemporary Table

function leg(){

	var points = [[0,0], [10,0], [5,10], [0,0]];
	var cells  = [[0,1,2,3]];
	var tri = SIMPLICIAL_COMPLEX(points)(cells);
	var leg = EXTRUDE([70])(tri);
	var c_leg = COLOR([0,0,0])(leg);
	var s_leg = S([0,1,2])([1/10,1/10,1/10])(c_leg);
	return s_leg;
}

function legs(){
	var l = leg();
	var leg1 = R([1,2])(PI/3)(l);
	//var all_legs = STRUCT(REPLICA(3)([r_leg, R([0,1])(3*PI/2)]))
	
	var r_leg2 = R([0,1])(2*PI/3)(leg1);
	var leg2 = T([0,1])([-1,-3.5])(r_leg2);

	var r_leg3 = R([0,1])(2*PI/3)(leg2);
	var leg3 = T([0,1])([-1,-3.5])(r_leg3);	

	var all_legs = STRUCT([leg1, leg2, leg3]) ;
	
	return all_legs;
}

function arc(alpha, r, R, h) {
  var domain = DOMAIN([[0,alpha],[r,R]])([32,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  
  var arco = EXTRUDE([h])(model);
  return arco;
}


function plane(){
	var ext = arc(2*PI,30, 55, 6);
	//var intn =  arc(2*PI,0, 50, 6);
	var d = DISK([30])([50]);
	var intn = EXTRUDE([6])(d);
	var c_ext = COLOR([0,0,0])(ext);
	var c_int = COLOR([0,0.2,0.6,0.5])(intn);
	var plane = STRUCT([c_ext,c_int]);
	return S([0,1,2])([1/12,1/12,1/12])(plane);
}

function table(){

	var basis = legs();
	var t_basis = T([0,1])([-0.5,2])(basis);
	var top = plane();
	var t_top = T([2])([4])(top);
	var table = STRUCT([t_basis, t_top]);

	return table;
}