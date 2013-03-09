// Exercise04

/*write a function select(data, key, values) that given an array of objects data, a string key and an array of values values, 
* returns the array of objects where the property key is equal to one of the values in values. For example:
* var data = [
*  {id:'01', name:'duffy'},
*  {id:'02', name:'michey'},
*  {id:'03', name:'donald'},
*  {id:'04', name:'goofy'},
*  {id:'05', name:'minnie'},
*  {id:'06', name:'scrooge'}
* ];
* var key = 'name';
* var values = ['goofy', 'scrooge'];
* 
* select(data, key, values)
* // [ { id:'04', name:'goofy' }, { id:'06', name:'scrooge' } ]
*/

var data = [
  {id:'01', name:'duffy'},
  {id:'02', name:'michey'},
  {id:'03', name:'donald'},
  {id:'04', name:'goofy'},
  {id:'05', name:'minnie'},
  {id:'06', name:'scrooge'}
 ];

 var key = 'name';
 var values = ['goofy', 'scrooge'];

 function select(data, key, values){
 	
 	var result = [];
 	
 	for(var i=0; i<data.length; i++){
 		
 		for(var j=0; j<values.length; j++){
 			
 			if(data[i][key] === values[j]){
 				
 				result.push(data[i]);

 			}
 		}
 	}
 	return result;
 };

 select(data, key, values);

//test on 'id' -> OK
 // var key = 'id';
 // var values = ['03', '05'];
 // select(data, key, values);