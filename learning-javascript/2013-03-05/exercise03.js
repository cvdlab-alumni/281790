console.log("Exercise03" + "\n");
var table = "";
for(var i=1; i<=10; i++){
	for(var j=1; j<=10; j++){
		if(j===i && i!==10) 		table += ("1" + ",\t");
		else if(j!==i && j!==10) 	table += ("0" + ",\t");
		else if(j!==i && j===10) 	table += ("0" + "\n");
		else if(j===i && i===10) 	table += ("1" + "\n");
	}
}
console.log(table);
console.log("\n" + "\n");