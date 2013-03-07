console.log("Exercise01" + "\n");

function identity(n){
	var table = "";
	for(var i=1; i<=n; i++){
		for(var j=1; j<=n; j++){
			if(j===i && i!==n) 		table += ("1" + ",\t");
			else if(j!==i && j!==n) 	table += ("0" + ",\t");
			else if(j!==i && j===n) 	table += ("0" + "\n");
			else if(j===i && i===n) 	table += ("1" + "\n");
		}
	}
	
	console.log(table);
}

identity(15);
console.log("\n" + "\n");