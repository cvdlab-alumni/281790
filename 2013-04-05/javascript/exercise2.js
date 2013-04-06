/* Exercise02
* Define plan by plan, with names floor0, floor1, floor2, floor3, and floor4, the 5 models of horizontal partitions,
* and add them to the STRUCT of the building model.
*/

// adapt pyplasm code to plasm.js code

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
//______________________________________________________________________________________________________________________________


// Exercise02
// Define plan by plan, with names floor0, floor1, floor2, floor3, and floor4, the 5 models of horizontal partitions,
// and add them to the STRUCT of the building model.
var center_tensor = T([1,2])([-0.125,-0.125]);

// FLOOR0
var floor0_nont = T([3])([-0.3])(CUBOID([10.25,7,0.3]));
var floor0 = center_tensor(floor0_nont);

// FLOOR1
var floor1_0 = CUBOID([10.25,2,0.3]);
var floor1_1 = GRID([[4.4,-1.65,4.2],[2,-1.75],[0.3]]);
var floor1_2 = CUBOID([10.25,2,0.3]);
var floor1_3 = GRID([[1.3,-4.75,4.2],[1],[0.3]]);
var floor1_4 = CUBOID([10.25,0.25,0.3]);
var floor1_5 = CUBOID([1.2,1,0.3]);

var floor1_nont = STRUCT([floor1_0, T([2])([2])(floor1_1), T([2])([2+1.75])(floor1_2), T([2])([2+1.75+2])(floor1_3), T([2])([2+1.75+2+1])(floor1_4), T([1,2])([-1.2, 2+1.75+2])(floor1_5)]);
var floor1 = center_tensor(floor1_nont);

//  FLOOR2
var floor2_0 = GRID([[-5.75,4.5],[5.75],[0.3]]);
var floor2_1 = GRID([[-1.3,-4.75,4.2],[1],[0.3]]);
var floor2_2 = CUBOID([10.25,0.25,0.3]);
var floor2_3 = CUBOID([5.75,0.25,0.3]);
var floor2_4 = GRID([[-0.6,4.4,-0.7,2.9],[-5.7,0.05],[0.3]]);
var floor2_5_2D = SIMPLICIAL_COMPLEX([[0,0],[-0.8,5.75],[0,5.75]])([[0,1,2]]);
var floor2_5 = EXTRUDE([0.3])(floor2_5_2D);


var floor2_nont = STRUCT([floor2_0, T([2])([5.75])(floor2_1), T([2])([5.75+1])(floor2_2), floor2_3,floor2_4, T([1])([5.75])(floor2_5)]);
var floor2 = center_tensor(floor2_nont);


// FLOO3
var floor3_0 = GRID([[-5,5.25],[5.75],[0.3]]);
var floor3_1 = GRID([[-5,0.25,-3.0,2],[1],[0.3]]);
var floor3_2 = GRID([[0.25,-2.25,0.25],[-5.5,0.25],[0.3]]);
var floor3_3 = CUBOID([5.25,0.25,0.3]);
var floor3_4 = CUBOID([5,0.125,0.3]);
var floor3_5 = CUBOID([5,0.25,0.3]);

var floor3_nont = STRUCT([floor3_0, T([2])([5.75])(floor3_1), floor3_2, T([1,2])([5,5.75+1])(floor3_3), T([2])([5.75+1.125])(floor3_4), floor3_5]);
var floor3 = center_tensor(floor3_nont);

// FLOOR4
var floor4_0 = GRID([[-5,5.25],[5.75],[0.3]]);
var floor4_1 = GRID([[10.25],[1.5],[0.3]]);

var floor4_nont = STRUCT([floor4_0, T([2])([5.5])(floor4_1)]);
var floor4 = center_tensor(floor4_nont);

// structuring floors each other
var floors = STRUCT([floor0, T([3])([2.5])(floor1), T([3])([5])(floor2), T([3])([7.5])(floor3), T([3])([10])(floor4)]);

//  fix pillars translation
var building = STRUCT([pillars0, T([3])([2.5+0.3])(pillars1), T([3])([2.5*2])(pillars2), T([3])([2.5*3])(pillars3)]);

// second structure of the building
var building = STRUCT([building,floors]);

VIEW(building);
