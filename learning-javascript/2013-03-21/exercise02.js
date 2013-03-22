//Exercise 02

//a

function Edge(p1,p2){
    this.p1 = new Point2D(p1.x, p1.y);
    this.p2 = new Point2D(p2.x, p2.y);
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

