function basis(){

	var points = [[0,0],[10,0],[10,1],[1.5,1],[0,0]];
	var cells = [[0,1,3,4],[1,2,3,1]];
	var basis = SIMPLICIAL_COMPLEX(points)(cells);
	var ex_basis = EXTRUDE([12])(basis);
	var r_basis = R([1,2])(PI/2)(ex_basis);
	return r_basis;
}

function stab(){
	var t = [[1.5,1],[2.5,1],[1.75,1.5],[1.5,1]];
	var cells = [[0,1,2,0]];
	var basis = SIMPLICIAL_COMPLEX(t)(cells);
	var ex_basis = EXTRUDE([12])(basis);
	var r_basis = R([1,2])(PI/2)(ex_basis);
	return r_basis;	
}


function mid(){

	var points = [[0,0],[1.5,1],[7.5,12],[0,12],[-1,11],[6,11],[0,0]];
	var cells = [[0,1,2,5,6],[2,3,4,5,2]];
	var basis = SIMPLICIAL_COMPLEX(points)(cells);
	var ex_basis = EXTRUDE([12])(basis);
	var r_basis = R([1,2])(PI/2)(ex_basis);
	return r_basis;

}

function upper(){

	var points = [[-1,11],[0,12],[0,20],[-1,20],[-1,11]];
	var cells = [[0,1,2,4],[2,3,4,2]];
	var basis = SIMPLICIAL_COMPLEX(points)(cells);
	var ex_basis = EXTRUDE([12])(basis);
	var r_basis = R([1,2])(PI/2)(ex_basis);
	return r_basis;

}

function chair(){
	var chair = STRUCT([basis(),mid(),upper()]);
	var c_chair = COLOR([0.7,0.5,0.08])(chair);
	var stb = COLOR([0,0,0])(stab());
	chair = STRUCT([c_chair,stb]); 
	return chair;
}

function chairs(){
	var c = S([0,1,2])([0.5,0.5,0.5])(chair());
	var r_chair = R([0,1])(PI)(c);
	var chairs = STRUCT([c, T([0,1])([20,-6])(R([0,1])(PI)(c))]);
	return chairs;		  
}

//Silver Coffee service first try

//Taking a look at the complete coffee-service i thought it would be useful to design first the simple "cilinder" block that it's part
//of all the elements of the service.

function cylinderBlock(){

	var disk = DISK([0.75])([32]);
	var main_cylinder = EXTRUDE([5])(disk);
	var surface = CYL_SURFACE([0.76,4.5])([48,2]);
	var col_surface = COLOR([1,0.6,0.4])(surface);
	var t_col_surface = T([2])([0.25])(col_surface);
	var block = STRUCT([main_cylinder, t_col_surface]);
	return block;
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

function spout(){
	var domain = INTERVALS(1)(16);
	var dom2D = PROD1x1([domain,domain]);
	var dom3D = PROD1x2([domain, dom2D]);
	
	//BASE EXTERNAL CONTROL POINTS
	var b_ext_cp_0 = [[0,2.5,0], [0.75-0.6,1.5,0], [1.25-0.6,0.5,0],[1.75-0.6,0.25,0],[2,0,0]];
	var b_ext_cp_1 = [[2,0,0], [0.75+2+0.6,0.25,0], [1.25+2+0.6,0.5,0], [1.75+2+0.6,1.5,0], [2+2+0.6,2.5,0]];

	//H EXTERNAL CONTROL POINTS
	var h_ext_cp_0 = [[0,2.5+2,3], [0.75-0.6,1.5+2,3], [1.25-0.6,0.5+2,3],[1.75-0.6,0.25+2,3],[2,0+2,3]];
	var h_ext_cp_1 = [[2,0+2,3], [0.75+2+0.6 ,0.25+2,3], [1.25+2+0.6,0.5+2,3], [1.75+2+0.6,1.5+2,3], [2+2+0.6,2.5+2,3]];
	
	//EXTERNAL BEZIER
	var ext_b_b = BEZIER(S0)(b_ext_cp_0);
	var ext_b_b1 = BEZIER(S0)(b_ext_cp_1);
	var ext_h_b = BEZIER(S0)(h_ext_cp_0);
	var ext_h_b1 = BEZIER(S0)(h_ext_cp_1);
	
	//EXTERNAL SURFACES
	var ext_s_0 = BEZIER(S1)([ext_b_b, ext_h_b]);
	var ext_s_1 = BEZIER(S1)([ext_b_b1, ext_h_b1]);

	
	//EXTERNAL MAPPED SURFACES
	var ext_surf_0 = MAP(ext_s_0)(dom2D);
	var ext_surf_1 = R([1,2])(PI)(ext_surf_0);
	ext_surf_1 = T([1,2])([7,3])(ext_surf_1);

	var ext_surf_h = STRUCT([ext_surf_0, ext_surf_1]);
	
	var ext_surf_0_1 = MAP(ext_s_1)(dom2D);
	var ext_surf_1_1 = R([1,2])(PI)(ext_surf_0_1);
	ext_surf_1_1 = T([1,2])([7,3])(ext_surf_1_1);

	var ext_surf_f = STRUCT([ext_surf_0_1, ext_surf_1_1]);

	//FINAL EXTERNAL SURFACE
	var ext_surf = STRUCT([ext_surf_h, ext_surf_f]);

	//THIS IS FOR THE SINGLE OBJECT
	//var disk = DISK([3])([32]);
	//var base = EXTRUDE([0.3])(disk);
	//var spout = STRUCT([T([0,1,2])([-2.5,-2.5,0.3])(ext_surf),base]);

	return ext_surf;
} 


function clove(){
	
	var domain = INTERVALS(1)(16);
	var dom2D = PROD1x1([domain,domain]);
	var dom3D = PROD1x2([domain, dom2D]);
	
	var cp0 = [[0,0,0], [6,0,0], [12,0,0]];
	var cp1 = [[0.2,3,0], [4,2,0], [8,2,0], [11.8,3,0]];
	var cp2 = [[2.5,5,0], [4,4,0], [5,3,0], [6,3,0], [7,3,0], [8,4,0], [9.5,5,0]];

	var cp01 = [[0,0,0.5], [6,0,0.5], [12,0,0.5]];
	var cp11 = [[1,3,0.5], [4,2,0.5], [8,2,0.5], [11,3,0.5]];
	var cp21 = [[3,5,0.5], [4,4,0.5], [5,3,0.5], [6,3,0.5], [7,3,0.5], [8,4,0.5], [9,5,0.5]];

	// var cp02 = [[0,0,2], [6,0,2], [12,0,2]];
	// var cp12 = [[1,3,2], [4,2,2], [8,2,2], [11,3,2]];
	// var cp22 = [[3,5,2], [4,4,2], [5,3,2], [6,3,2], [7,3,2], [8,4,2], [9,5,2]];

	var b0 = BEZIER(S0)(cp0);
	var b1 = BEZIER(S0)(cp1);
	var b2 = BEZIER(S0)(cp2);

	var b01 = BEZIER(S0)(cp01);
	var b11 = BEZIER(S0)(cp11);
	var b21 = BEZIER(S0)(cp21);

	//var b02 = BEZIER(S0)(cp02);
	//var b12 = BEZIER(S0)(cp12);
	//var b22 = BEZIER(S0)(cp22);

	//var f0 = MAP(b0)(domain);
	//var f1 = MAP(b1)(domain);

	var sb0 = BEZIER(S1)([b0,b1,b2]);
	var sb01 = BEZIER(S1)([b01,b11,b21]);
	//var sb02 = BEZIER(S1)([b02,b12,b22]);

	//var s = MAP(sb0)(dom2D);
	
	var vb = BEZIER(S2)([sb0,sb01])

	var s = MAP(vb)(dom3D);

	return s;

}



function circle_top(){
	var ring = arc(2*PI, 6, 7.5, 0.3);
	var half = arc(PI, 0, 6, 0.3);
	var cl = R([0,1])(PI)(clove());
	var sp = spout();
	var top = STRUCT([ring,half,T([0])([6])(cl),T([0])([-2.5])(sp), T([2])([0.2])(R([1,2])(3*PI/4)(half))]);

	return top;
}

function circle_top2(){
	var ring = arc(2*PI, 6, 7.5, 0.3);
	var full = arc(2*PI, 0, 5.9, 0.3);
	var half = arc(PI, 0, 5.9, 0.3);

	var top = STRUCT([ring,full, T([2])([0.2])(R([1,2])(3*PI/4)(half))]);

	return top;
}






function tray(){
	//basis
	var basis = CUBOID([43,25,0.7]);
	//block rows
	var block = cylinderBlock();
	var b_row = STRUCT(REPLICA(9)([block, T([0])([5])]));
	var h_row = STRUCT(REPLICA(4)([T([1])([5.75]), block]));
	var half_rows = STRUCT([T([0,1,2])([1.5,1,0.7])(b_row), T([0,1,2])([1.5,1,0.7])(h_row)]);
	var full_rows = STRUCT([half_rows, T([0,1])([43,25])(R([0,1])(PI)(half_rows))]);
	//uppper part
	var b_upper  = STRUCT([CUBOID([43,2,0.3]),T([1])([23])(CUBOID([43,2,0.3]))]);
	var h_upper = STRUCT([CUBOID([2,25,0.3]),T([0])([41])(CUBOID([2,25,0.3]))]);
	var upper = STRUCT([b_upper,h_upper]);
	var t_upper = T([2])([0.7+5])(upper);
	var tray = STRUCT([basis, full_rows, t_upper]);
	return tray;
}


function coffee(){
	//basis
		var disk = DISK([7.5])([32]);
		var basis = EXTRUDE([0.5])(disk);
		var column = STRUCT(REPLICA(5)([cylinderBlock(), T([2])([5])]));
		var t_col = T([1])([7.5-0.75])(column);
		//var r_col = R([0,1])(PI/4)(t_col);
		var col = STRUCT(REPLICA(6)([t_col, R([0,1])(PI/3)]));
		var container = arc(2*PI, 4.3,4.8,25);
	
		var coffee = STRUCT([basis, T([2])([0.5])(col), T([2])([0.5])(container), T([2])([25.5])(circle_top())]); 
		return coffee;
}


function tea(){
	///basis
		var disk = DISK([11.25])([32]);
		var basis = EXTRUDE([0.5])(disk);
		var column = STRUCT(REPLICA(3)([cylinderBlock(), T([2])([5])]));
		var t_col = T([1])([11.25-0.75])(column);
		//var r_col = R([0,1])(PI/4)(t_col);
		var col = STRUCT(REPLICA(6)([t_col, R([0,1])(PI/3)]));
		var container = arc(2*PI, 7,8,15);
		var top = circle_top();
		var s_top = S([0,1,2])([1.5,1.5,1.5])(top);
		var tea = STRUCT([basis, T([2])([0.5])(col), T([2])([0.5])(container), T([2])([15.5])(s_top)]); 
		return tea;
}


function sugar_container(){

	var dsfera = DOMAIN([[0,PI],[0,PI]])([60,60]);

	var mapping = function(v){
		return [ [SIN(v[0])*COS(v[1])], [SIN(v[0])*SIN(v[1])], [COS(v[0])]	]
	};

	var sphere = MAP(mapping)(dsfera);

	return sphere;
}

function sugar(){
	var disk = DISK([7.5])([32]);
	var basis = EXTRUDE([0.5])(disk);
	var column = cylinderBlock();
	var t_col = T([1])([7.5-0.75])(column);
	var col = STRUCT(REPLICA(4)([t_col, R([0,1])(PI/2)]));
	var container = sugar_container();
	var r_container = R([1,2])(-PI/2)(container);
	var s_container = S([0,1,2])([5,5,5])(r_container);
	var top = circle_top2();
	var sugar = STRUCT([basis, T([2])([0.5])(col), T([2])([5.5])(s_container), T([2])([5.5])(top)]); 

	return sugar;
}

function coffee_service(){

	var vassoio = S([0,1])([2,2])(tray());
	var caffettiera = coffee();
	var teiera = tea();
	var zuccheriera = sugar();

	var servizio = STRUCT([vassoio, T([0,1,2])([70, 30,0.7])(caffettiera), T([0,1,2])([45, 19,0.7])(teiera), T([0,1,2])([20, 25,0.7])(zuccheriera)]);

	return servizio;
}

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

function structure(){

	var t = S([0,1,2])([1.2,1.2,1.2])(table());
	var cs = S([0,1,2])([1/15,1/15,1/15])(coffee_service());
	var l = S([0,1,2])([1/2,1/2,1/2])(lamp());
	var c = S([0,1,2])([1.2,1.2,1.2])(chairs());

	var t_cs = STRUCT([t, T([0,1,2])([-2,0.3,5.4])(cs)]);
	var all = STRUCT([T([0,1])([-8,-2])(t_cs),T([0,2])([-8,15])(l),T([0])([-20])(c)]);

	var floor = COLOR([1,1,1])(CUBOID([50,50,0]));
	var w1 = 	COLOR([1,0,0])(CUBOID([0.01,50,30]));
	var r_w2 = R([0,1])(-PI/2)(w1);
	var w2 = T([1])([50])(r_w2);
	var w3 = T([0])([50])(w1);

	var room = STRUCT([floor, w1,w2,w3]);

	var ambient = STRUCT([T([0,1])([-35,-25])(room), all]);

	return ambient;


}


DRAW(structure());