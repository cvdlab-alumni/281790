//Exercise 01

function Point2D(x,y){
    this.x = x;
    this.y = y;
    this.coordinates = function(){
     return "X=" + this.x + " ,Y=" + this.y;
     }
}

//Exercise 02

//a

function Edge(p1,p2){
    this.p1 = p1;
    this.p2 = p2;
    this.x1edge = p1.x;
    this.x2edge = p2.x;
    this.y1edge = p1.y;
    this.y2edge = p2.y;
    this.edge = function(){
   	 return "Edge coordinates:\n" +  
   	 "start x:" + this.x1edge     +   "\n" +
   	 "end x:"   + this.x2edge     +   "\n" +
   	 "start y:" + this.y1edge     +   "\n" +
   	 "end y:"   + this.y2edge;
    }
}


//b

  Edge.prototype.length = function(){
    return Math.sqrt(Math.pow(this.x2edge - this.x1edge, 2) + Math.pow(this.y2edge - this.y1edge, 2))
  }


  
//Exercise03

//a

function Triangle(e0,e1,e2){
  this.e0 = e0;
  this.e1 = e1;
  this.e2 = e2;

  this.triangle = function(){
    return "Triangle coordinates:\n"    +
      "First "  + this.e0.edge() + "\n" +
      "Second " + this.e1.edge() + "\n" +
      "Third "  + this.e2.edge();
  }
}

//b
Triangle.prototype.perimeter = function(){
  return this.e0.length() + this.e1.length() + this.e2.length();
}


//c
Triangle.prototype.area = function(){
  var sp = this.perimeter()/2.;
  return Math.sqrt(sp * (sp-this.e0.length()) * (sp-this.e1.length()) * (sp-this.e2.length()));
}


//defining points
var p0 = new Point2D(2,2);
var p1 = new Point2D(6,2);
var p2 = new Point2D(4,8);

//defining edges
var e0 = new Edge(p0, p1);
var e1 = new Edge(p1, p2);
var e2 = new Edge(p2, p0);

//defining triangle
var t0 = new Triangle(e0,e1,e2)

//triangle
t0.triangle()
//perimeter
t0.perimeter()
//area
t0.area()


