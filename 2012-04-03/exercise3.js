// Luigi Trapassi 281790
// exercise3

// defining floor thickness
var thick = 1;


//building 3d floor (with support methods)

//function createBlock -> given a starting point (x0,y0) creates a 1x1 block
var createUnary3DBlock = function(point){
	var x = point[0];
	var y = point[1];
	
	return SIMPLEX_GRID([  [-x,1], [-y,1], [thick] ]);
}


//function createGrid -> given a starting point(x0,y0), an ending x point, an ending y point
//creates a grid of blocks
var createFloor = function(startPoint, endx, endy){

	var startx = startPoint[0];
	var starty = startPoint[1];
	var floorx = STRUCT([]);
	var floory = STRUCT([]);
	for(var i=startx; i<endx; i++){
		floorx = STRUCT([floorx, createUnary3DBlock([i, starty])]);
		for(var j=starty; j<endy; j++)
			floory = STRUCT([floory, createUnary3DBlock([i, j])]);
	}
	return STRUCT([floorx,floory]);
}


// var grid1 = STRUCT([createGrid([0,0],21,1), createBlock([0,1])]);
// var grid2 = STRUCT([createGrid([1,10],21,17), createGrid([1,17],9,22)]);
// var grid3 = createGrid([21,0],39,17);
// var grid4 = createGrid([39,4],47,16);
// var grid5 = STRUCT([createGrid([47,4],52,5), createBlock([51,5])]);
// var fullGrid = STRUCT([grid1, grid2, grid3, grid4, grid5]);

var floor1 = STRUCT([createFloor([0,0],21,1), createUnary3DBlock([0,1])]);
var floor2 = STRUCT([createFloor([1,10],21,17), createFloor([1,17],9,22)]);
var floor3 = createFloor([21,0],39,17);
var floor4 = createFloor([39,4],47,16);
var floor5 = STRUCT([createFloor([47,4],52,5), createUnary3DBlock([51,5])])
var fullFloor = STRUCT([floor1, floor2, floor3, floor4, floor5 ]);

// add color to the floor
var cFloor= COLOR([0.2,0.2,0.2])(fullFloor);

// defining floor thickness
var wthick = 3;

var exCreate3DWall = function(startPoint, endx, endy){
	var startx 	= startPoint[0];
	var starty 	= startPoint[1];
	var wall = SIMPLEX_GRID([ [-startx,endx-startx], [-starty, endy-starty], [-thick, wthick] ]);
	return wall;
}

var create3DWall = function(startPoint, endx, endy){
	var startx 	= startPoint[0];
	var starty 	= startPoint[1];
	var wall = SIMPLEX_GRID([ [-startx,endx-startx], [-starty, endy-starty], [thick, wthick] ]);
	return wall;
}

var thickWall1 = create3DWall([0.7,0.7],1,22);
var thickWall2 = create3DWall([0.7,0.7],8,1);
var thickWall3 = create3DWall([1,22],5,22.3);
var thickWall4 = create3DWall([8.7,17],9,19);
var thickWall5 = create3DWall([8.7,20],9,22);
var thickWall6 = create3DWall([6.7,15],25.3,15.3);
var thickWall7 = create3DWall([24.3,7.2],32.7,7.5);
var thickWall8 = create3DWall([37.7,16],51.3,16.3);
var thickWall9 = create3DWall([51,4.7],51.3,16);
var thickWall10 = create3DWall([41.3,4.7],51,5);
var thickWall11 = create3DWall([37.3,11.3],42.5,11.6);

var nwall1 = create3DWall([1,17],8.7,17.1);
var nwall2 = create3DWall([4.9,17.1],5,22);
var nwall3 = create3DWall([5,20.8],8.7,20.9);
var nwall4 = create3DWall([5,21.9],8.7,22);
var nwall5 = create3DWall([30,13.7],40,13.8);

// difining glass walls thickness 
var gthick = 0.3

var create3DGlassWall = function(startPoint, endx, endy){
	var startx 	= startPoint[0];
	var starty 	= startPoint[1];
	var gwall = SIMPLEX_GRID([ [-startx,endx-startx], [-starty, endy-starty], [thick, gthick] ]);
	return gwall;
}

var glassw1 = create3DGlassWall([31,7.5],32,13.7);
var glassw2 = create3DGlassWall([30,5],41.3,5.1);
var glassw3 = create3DGlassWall([40,13.8],40.1,16);
var glassw4 = create3DGlassWall([44.6,6.7],44.7,14.2);


var fulltWalls = STRUCT([thickWall1, thickWall2, thickWall3, thickWall4, thickWall5, thickWall6, thickWall8, thickWall9, thickWall10, thickWall11]);
var cTWalls = COLOR([0.2,0.2,0.1])(fulltWalls);
var blacWall = COLOR([0,0,0])(thickWall7);
var fullnWalls = STRUCT([nwall1, nwall2, nwall3, nwall4, nwall5 ]);
var cNWalls = COLOR([0.2,0.2,0.1])(fullnWalls);
var fullgWalls = STRUCT([glassw1, glassw2, glassw3, glassw4]);
var cGWalls = COLOR([0.2,0.3,0.3])(thickWall7);
var fullWalls = STRUCT([fulltWalls,fullnWalls,fullgWalls, blacWall]);

//defining roof thickness
var rthick = 0.6

var createRoof = function(startPoint, endx, endy){
	var startx 	= startPoint[0];
	var starty 	= startPoint[1];
	var roof = SIMPLEX_GRID([ [-startx,endx-startx], [-starty, endy-starty], [-(thick+wthick), rthick] ]);
	return roof;
}

var roof1 = createRoof([0,13.2],9.8,23);
var roof2 = createRoof([24,4],47,17);

var fullRoofs = STRUCT([roof1, roof2]);
var cRoof = COLOR([1,1,1])(fullRoofs);

//defining pool bottom thickness
var bthick = 0.2

var createPoolBottom = function(startPoint, endx, endy){
	var startx 	= startPoint[0];
	var starty 	= startPoint[1];
	var bottom = SIMPLEX_GRID([ [-startx,endx-startx], [-starty, endy-starty], [bthick] ]);
	return bottom;
}

var bpool1 = createPoolBottom([1,1],21,10);
var bpool2 = createPoolBottom([47,6],51,16);

var fullBPools = STRUCT([bpool1, bpool2]);
var cBPools = COLOR([0.2,0.3,0.3])(fullBPools);

//Creating entire structure

var cStructure = STRUCT([cFloor,fullWalls,createRoof,cBPools]);
