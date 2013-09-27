//LAMP

function CIRCLE_BEZIER(r,z){
	var rot_domain = DOMAIN([[0,1],[0,2*PI]])([40,40]);
	
	var p1 = [[r,0,z],[r*COS(PI/12),r*SIN(PI/12),z], [r*COS(PI/6),r*SIN(PI/6),z], [r*COS(PI/4),r*SIN(PI/4),z], [r*COS(PI/3),r*SIN(PI/3),z], [r*COS(5*PI/12),r*SIN(5*PI/12),z], [0,r,z]];
	
	var c1 = BEZIER(S0)(p1);
	
	return c1;
};

function arc(alpha, r, R, h) {
  var domain = DOMAIN([[0,alpha],[r,R]])([50,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  
  var arco = EXTRUDE([h])(model);
  return arco;
};

function lamp1(){
	var domain = INTERVALS(1)(32);
	var dom2D = PROD1x1([domain,domain]);

	var c0 = CIRCLE_BEZIER(3,0);
	var c1 = CIRCLE_BEZIER(5,1);
	var c2 = CIRCLE_BEZIER(4,1.5);
	var c3 = CIRCLE_BEZIER(3.8,3);
	var c4 = CIRCLE_BEZIER(3.5,5);
	var c4 = CIRCLE_BEZIER(3,7);

	var s0 = BEZIER(S1)([c0,c1,c2,c3,c4]);

	var r0 = MAP(s0)(dom2D);
	var r1 = R([0,1])([PI/2])(r0);
	var r2 = R([0,1])([PI/2])(r1);
	var r3 = R([0,1])([PI/2])(r2); 

	var lamp = STRUCT([r0,r1,r2,r3]);
	var c_lamp = COLOR([1,1,1])(lamp)

	var ring = arc(2*PI, 0.3, 3, 0.3);
	var c_ring = COLOR([0,0,0])(ring);

	lamp = STRUCT([T([2])([7])(c_ring),c_lamp]);
	

	return lamp;
};


function lamp2(){
	var domain = INTERVALS(1)(32);
	var dom2D = PROD1x1([domain,domain]);

	var c0 = CIRCLE_BEZIER(7,0);
	var c1 = CIRCLE_BEZIER(6,3);
	var c2 = CIRCLE_BEZIER(5.5,4);
	var c3 = CIRCLE_BEZIER(4.5,6);
	var c4 = CIRCLE_BEZIER(3,8);

	var s0 = BEZIER(S1)([c0,c1,c2,c3,c4]);

	var r0 = MAP(s0)(dom2D);
	var r1 = R([0,1])([PI/2])(r0);
	var r2 = R([0,1])([PI/2])(r1);
	var r3 = R([0,1])([PI/2])(r2); 

	var lamp = STRUCT([r0,r1,r2,r3])

	var c_lamp = COLOR([1,1,1])(lamp)

	return c_lamp;
};


function light_wire(){

	var d = DISK([0.1])([32]);
	var wire = EXTRUDE([20])(d);
	var c_wire = COLOR([0,0,0])(wire);

	//ROTATIONAL
	var domain = DOMAIN([[0,1],[0,2*PI]])([20,20]);
	var profile = BEZIER(S0)([[0,0,0],[0.5,0,0.5],[2,0,2],[2,0,4],[0,0,5]]);
	var mapping = ROTATIONAL_SURFACE(profile);
	var surface = MAP(mapping)(domain);
	var c_surface = COLOR([1,1,1,0.3])(surface);

	var lw = STRUCT([c_surface, T([2])([5])(c_wire)]);

	return lw;

}

function lamp(){

	var lw = light_wire();
	var l1 = lamp1();
	var l2 = lamp2();

	var lamp = STRUCT([lw, l2, T([2])([8.5])(l1)]);

	return lamp;

}



