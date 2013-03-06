var table = "";
for(var i=1; i<=10; i++){
	for(var j=1; j<=10; j++){
		if(j<10) line += (i*j + "\t");
		else 	 line += (i*j + "\n"); 	
	}
}
console.log(table);
