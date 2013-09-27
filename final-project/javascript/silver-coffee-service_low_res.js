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