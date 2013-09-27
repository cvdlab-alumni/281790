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