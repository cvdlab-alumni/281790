// Translating functions

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

GRID = SIMPLEX_GRID;

NN = REPLICA;

VIEW = DRAW;

//__________________________________________________________________

// Exercise01
// Define, with names pillars0, pillars1, pillars2, and pillars3, the models of pillars of the 4 house floors, 
// and put them into the STRUCT of an initial building model.

// PILLARS

// pillar
var pillar = CUBOID([0.25,0.25,2.5]);

// cylindrical pillar
var cyl_pill_surface = DISK(0.125)([32,1]);
var cyl_pill_3D = EXTRUDE([2.5])(cyl_pill_surface);


// PILLARS0
var center_tensor = T([1,2])([-0.125,-0.125]);

// pillars rows
var p0_first_row = STRUCT(NN(5)([cyl_pill_3D, T([1])([2.5])]));
var p0_second_row = STRUCT([cyl_pill_3D, T([1,2])([2.375,-0.125])(STRUCT(NN(3)([pillar, T([1])([2.5])])))]);

var pillars0 = STRUCT([p0_first_row, T([2])([5.5])(p0_second_row)]);


// PILLARS1

var p1_first_row_nont = STRUCT(NN(5)([pillar, T([1])([2.5])]));
var p1_first_row = center_tensor(p1_first_row_nont);

var p1_second_row_partial = STRUCT(NN(3)([pillar, T([1])([2.5])]));
var p1_second_row_nont = STRUCT([p1_second_row_partial, T([1])([2.5*4])(pillar)]);
var p1_second_row = STRUCT([center_tensor(p1_second_row_nont), T([1])([2.5*3])(cyl_pill_3D)]);

var pillars1 = STRUCT([p1_first_row, T([2])([5.5])(p1_second_row)]);


// PILLARS2

var p2_first_row_nont = STRUCT([pillar, T([1])([2.5])(pillar), T([1])([2.5*2])(pillar), T([1])([2.5*4])(pillar)]);
var p2_first_row = center_tensor(p2_first_row_nont);

var p2_second_row_nont = STRUCT(NN(5)([pillar, T([1])([2.5])]));
var p2_second_row = center_tensor(p2_second_row_nont);

var pillars2 = STRUCT([p2_first_row, T([2])([5.5])(p2_second_row)]);

// PILLARS3

var p3_first_row_row_nont = STRUCT([T([1])([2.5*2])(pillar), T([1])([2.5*4])(pillar)]);
var p3_first_row = center_tensor(p3_first_row_row_nont);

var p3_second_row_nont = STRUCT(NN(5)([pillar, T([1])([2.5])]));
var p3_second_row = center_tensor(p3_second_row_nont);

var pillars3 = STRUCT([p3_first_row, T([2])([5.5])(p3_second_row)]);

// first building structure, considering attic depth 0.3
var building = STRUCT([pillars0, T([3])([2.5+0.3])(pillars1), T([3])([(2.5+0.3)*2])(pillars2), T([3])([(2.5+0.3)*3])(pillars3)]);

VIEW(building);
