// Exercise03

/* exercise03a
*  write a function that given a word return it capitalized
*/

function capitalize(w){
	return w.replace(w.charAt(0), w.charAt(0).toUpperCase());
};

var w1 = "hello";

capitalize(w1);

/* exercise03b
*  write a function that capitalize each word of the following text:
*  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
*  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
*  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
*  in culpa qui officia deserunt mollit anim id est laborum."
*/

var text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// support method -> splitting text by blank spaces
function split_text(t){
	var s_t = [];
	s_t = t.split(" ");
	return s_t;
};


function capitalize_text(t){
	//split the text
	var stext = split_text(t);
	//capitalize each word in the text
	for(var i = 0; i < stext.length; i++)
		stext[i] = capitalize(stext[i]);
	
	var ctext = "";
	//rebuilding, by concat, the entire text
	for(i = 0; i < stext.length; i++)
		ctext = ctext.concat(stext[i] + " ");
	
	return ctext;
};

capitalize_text(text);