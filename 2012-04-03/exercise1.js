// Luigi Trapassi 281790
// exercise1

//function createBlock -> given a starting point (x0,y0) creates a 1x1 block
var createBlock = function(point){
	var x = point[0];
	var y = point[1];
	return POLYLINE([[x,y], [x+1,y], [x+1, y+1], [x, y+1], [x,y]])
}


//function createGrid -> given a starting point(x0,y0), an ending x point, an ending y point
//creates a grid of blocks
var createGrid = function(startPoint, endx, endy){

	var startx = startPoint[0];
	var starty = startPoint[1];
	var gridx = STRUCT([]);
	var gridy = STRUCT([]);
	for(var i=startx; i<endx; i++){
		gridx = STRUCT([gridx, createBlock([i, starty])]);
		for(var j=starty; j<endy; j++)
			gridy = STRUCT([gridy, createBlock([i, j])]);
	}
	return STRUCT([gridx,gridy]);
}

//defining the grid
var grid1 = STRUCT([createGrid([0,0],21,1), createBlock([0,1])]);
var grid2 = STRUCT([createGrid([1,10],21,17), createGrid([1,17],9,22)]);
var grid3 = createGrid([21,0],39,17);
var grid4 = createGrid([39,4],47,16);
var grid5 = STRUCT([createGrid([47,4],52,5), createBlock([51,5])]);
var fullGrid = STRUCT([grid1, grid2, grid3, grid4, grid5]);

// defining the two pools
var biggerPool 	= POLYLINE([ [1,1] , [21,1], [21,10], [1,10] , [1,1]  ]);
var smallerPool = POLYLINE([ [47,5], [51,5], [51,16], [47,16], [47,5] ]);	


//support for wall filling
var wallfilling = function(startPoint, endx, endy){
	var startx 	 = startPoint[0];
	var starty 	 = startPoint[1];
	// var xFilling = STRUCT([]);
	// var yFilling = STRUCT([]);
	// var step = 0.1;
	// for(var i = startx; i < endx; i+step)
	// 	xFilling = STRUCT([xFilling, POLYLINE([[i,starty],[i,endy]])]);
	// for(var j = starty; j < endy; j+step)
	// 	yFilling = STRUCT([yFilling, POLYLINE([[startx,j],[endx,j]])]);
	//return STRUCT([xFilling,yFilling]);
	var d1 = POLYLINE([[startx,starty],[endx,endy]]);
	var d2 = POLYLINE([[startx,endy],[endx,starty]]);
	return STRUCT([d1,d2]);
}

// createWall -> given a starting point(x0,y0),an ending x point, an ending y point
// creates a wall
var createWall = function(startPoint, endx, endy){
	var startx 	= startPoint[0];
	var starty 	= startPoint[1];
	var border 	= POLYLINE([ [startx,starty], [endx, starty], [endx,endy], [startx,endy], [startx,starty] ]);
	var filling = wallfilling(startPoint, endx, endy);
	var wall 	= COLOR([0,0,0])(STRUCT([border, filling]));
	return wall;
}


//defining walls,assuming thick walls thickness = 0.3m, normal walls thickness = 0.1m	
var thickWall1 = createWall([0.7,0.7],1,22);
var thickWall2 = createWall([0.7,0.7],8,1);
var thickWall3 = createWall([1,22],5,22.3);
var thickWall4 = createWall([8.7,17],9,19);
var thickWall5 = createWall([8.7,20],9,22);
var thickWall6 = createWall([6.7,15],25.3,15.3);
var thickWall7 = createWall([24.3,7.2],32.7,7.5);
var thickWall8 = createWall([37.7,16],51.3,16.3);
var thickWall9 = createWall([51,4.7],51.3,16);
var thickWall10 = createWall([41.3,4.7],51,5);
var thickWall11 = createWall([37.3,11.3],42.5,11.6);

var tWalls = STRUCT([thickWall1, thickWall2, thickWall3, thickWall4, thickWall5, thickWall6, thickWall7, thickWall8, thickWall9, thickWall10, thickWall11]);

var nwall1 = createWall([1,17],8.7,17.1);
var nwall2 = createWall([4.9,17.1],5,22);
var nwall3 = createWall([5,20.8],8.7,20.9);
var nwall4 = createWall([5,21.9],8.7,22);
var nwall5 = createWall([30,13.7],40,13.8);

var nWalls = STRUCT([nwall1, nwall2, nwall3, nwall4, nwall5 ]);

var glassw1 = createWall([31,7.5],32,13.7);
var glassw2 = createWall([30,5],41.3,5.1);
var glassw3 = createWall([40,13.8],40.1,16);
var glassw4 = createWall([44.6,6.7],44.7,14.2);

var gWalls = STRUCT([glassw1, glassw2, glassw3, glassw4]);


var fullWalls = STRUCT([tWalls,nWalls,gWalls]);


var createStairs = function(startPoint, endx, endy){

	var startx = startPoint[0];
	var starty = startPoint[1];
	var stairs = STRUCT([]);
	for(var i = startx; i < endx; i++){
		stairs = STRUCT([stairs, POLYLINE([[i,starty],[i,endy]])]);
	}
	return COLOR([0,0,0])(stairs);
}

var stairs = createStairs([36.5,1],39,4);


//create entire floor plant
var plant = STRUCT([fullGrid, fullWalls, stairs, biggerPool, smallerPool])