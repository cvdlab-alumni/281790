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
   	 "end y:"   + this.y2edge
   	 ;
    }
}


//b

  Edge.prototype.length = function(){
    return Math.sqrt(Math.pow(this.x2edge - this.x1edge, 2) + Math.pow(this.y2edge - this.y1edge, 2))
  }

