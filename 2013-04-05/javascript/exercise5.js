// Exercise5
// Define with names stair1, stair2, and stair3 (from bottom up to top), 
// and insert within the building model, the 3 stair models of the building.


T = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
     return object.clone().translate(dims, values);
    };
  };
};
  
R = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });
   
  return function (angle) {
    return function (object) {
      return object.clone().rotate(dims, angle);
    };
  };
};
  
S = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
      return object.clone().scale(dims, values);
    };
  };
};

S3 = S2;
S2 = S1;
S1 = S0;

CYLINDER = CYL_SURFACE;

GRID = SIMPLEX_GRID;

NN = REPLICA;

VIEW = DRAW;

// stair
var depth = 0.26;
var raiser = 2.8/(10);
var step2D = SIMPLICIAL_COMPLEX([[0,0],[0,raiser],[depth,raiser],[depth,raiser]])([[0,2,1],[1,2,3]]);
var step3D = MAP([S0,S2,S1])(EXTRUDE([1])(step2D));
var ramp = STRUCT(REPLICA(10)([step3D,T([0,2])([depth,raiser])]));



//________________________________________________________________________________________________________________

//first stair (floor0)
var stair1 = T([1,2,])([2.5,5.75])(ramp);

//second stair (floor1)
var stair2 = T([1,2,3])([1.3,5.75,2.8])(ramp);

//third (floor2)
var stair3 = T([1,2,3])([5.7,5.75,5.6])(ramp);

