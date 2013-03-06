console.log("Exercise02" + "\n");
var table = "";
for(var i=1; i<=10; i++){
	for(var j=1; j<=10; j++){
		if(j<10) table += (i*j + ",\t");
		else 	 table += (i*j + "\n"); 	
	}
}
console.log(table);
console.log("\n" + "\n");