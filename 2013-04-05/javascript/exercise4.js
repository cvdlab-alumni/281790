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



//EXERCISE4
//Define and color (BLACK) the models of (some) windows, and instance them within the building model.

// defining a first kind of window

win_x = GRID([[1.3],[0.07,-0.86,0.07],[0.25]])
win_y = GRID([[0.07,-1.16,0.07],[1],[0.25]])
window_a = COLOR([0,0,0])(STRUCT([win_x,win_y]))

// using it in the building

//first of all, applicating alle the affine transformation for the correct positioning
ew_rw0 = R([1,3])(PI)(window_a)
ew_rw1 = R([2,3])(PI/2)(ew_rw0)
ew_rw = center_tensor(ew_rw1)

//positioning window
win_east_0 = T([1,2,3])([6.35,6.75,3.8])(ew_rw)
win_east_1 = T([1,2,3])([6.35+1.3,6.75,3.8])(ew_rw)

building = STRUCT([building,win_east_0,win_east_1])
VIEW(building)
