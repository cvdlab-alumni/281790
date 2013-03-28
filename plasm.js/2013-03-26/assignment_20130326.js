//Assignment 260313 -> Traduzione da pyplasm

//definizione casa 2D
function House2D(){
	var wall = SIMPLICIAL_COMPLEX([[0,0],[8,0],[0,6],[8,6],[4,8]])([[0,1,2,3,4]]);
	var door = CUBOID([2,4]);
	var wind = CUBOID([1,2]);
	return STRUCT([wall, T([0])([2])(door), T([0,1])([5,2])(wind)]);
}

var h = House2D();

//fila di 3 case

function triplet(x){
	var transl = T([0])([12]);
	return STRUCT([x, transl(x),transl(transl(x))]);
};

var t = triplet(h);

//alberi

function Leaves(r){ return DISK(r)(18); };

function MyTree(h){
	return STRUCT([ T([0])([-h/24])(CUBOID([h/9,2*h/3])), T([1])([2*h/3])(Leaves(h/3)) ]);
};

function Trees(){
	return STRUCT([ MyTree(9), T([0])([2])(MyTree(11)) ])
};

function HouseTrees(){
	return STRUCT([ House2D(), T([0])([-0.75])(Trees()) ])
};

t = triplet(HouseTrees());

//reflection
function Mirror(dimension,x){
	return STRUCT([S([dimension])([-1])(x)])
};

function HouseTreesMirror(){
	return STRUCT([HouseTrees(), Mirror(0,HouseTrees())])
};


t = triplet(HouseTreesMirror());

//CarModel

function car(){
	var verts = [[0,0],[3,0],[7,0],[6,2],[4,2],[3,1],[1,1]];
	var cells = [[0,1,5,6],[1,2,3,4,5]];
	var pols  = [[1,2]];
	var body  = SIMPLICIAL_COMPLEX(verts)(cells);
	var wheel = S([0,1])([0.5,0.5])(DISK(1)([18,1]));
	return T([1])([0.5])(STRUCT([body, T([0])([1.5])(wheel), T([0])([6])(wheel)]));
};


//fila di auto
function carQueue(n){
	return STRUCT(REPLICA(n)([car(), T([0])([1.2 * 7])]));
};

var cq = carQueue(2);

//rotatedCarQueue
function rotatedCarQueue(n,degrees){
	var alpha = degrees * PI/180;
	var x = (1.2*7*n * (COS(alpha)));
	var y = (1.2*7*n * (SIN(alpha)));
	var basis = SIMPLICIAL_COMPLEX([[0,0],[x,0],[x,y]])([[0,1,2]]);
	return STRUCT([ basis, R([0,1])(alpha)(carQueue(n)) ]);
};

var rcq = rotatedCarQueue(5,8);


//Scena 2d
function InclinedTriple(degrees, ogg){
	x = 7.25;
	transf = T([0,1])([x, x * TAN((PI*degrees/180))]);
	return STRUCT([ogg, transf(ogg), transf(transf(ogg))]);
};


scene = STRUCT([InclinedTriple(8, HouseTreesMirror()), rotatedCarQueue(5,8)	]);

DRAW(scene);