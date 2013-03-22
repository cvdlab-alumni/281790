//Exercise 01

function Point2D(x,y){
    this.x = x;
    this.y = y;
    this.coordinates = function(){
   	 return "X=" + this.x + " ,Y=" + this.y;
   	 }
}