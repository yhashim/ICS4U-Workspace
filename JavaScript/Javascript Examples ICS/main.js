function consoleTest() {
    // console.log('console.log is how we print to the console');
	    // you can use escape sequences
	    // you can change the outer quotations to the opp type to quote in the string
	// you dont have to specify datay-type type when initializing

	var x = 7;
	// console.log(x);
	x = 'change the data-type of x!';
	// console.log(x);

	var arr = [];
	arr[6] = 18;
	arr[11] = 'hello';
	// arr[20] = arr;
	arr[3] = function(){console.log('hi');};
	// arr[3]();
	// console.log(arr);

	var obj = {}; // curly brackets means it's an object
	obj.color = 'red'; // property notation
	obj.height = 7;
	obj['shoesize'] = 5; // array notation
	obj['shoesize'] = 6; // overrides it
	obj[5] = 8;
	// you cannot do obj.5 now
	// obj.func1 = function(x){alert(x);}
	// console.log(obj);
	// obj.func1(5);

	// arr.push(99);
	// arr.pop();
	// var removedImtes = arr.splice(6,1);

	// iterator(obj);

	mystery(1,2);
}

function iterator(coll){
	for (var val in coll){ // in for ideces
		// like for-each loop
		// if (val !== undefined){ doesn't even need this
			// dont need undefined check for for (in) loops
			// use == for undefined
			console.log('key: ' + val + ' val: ' + coll[val]);
		// }
	}
	// for (var val of coll){ // of for normal 
	// 	// like for-each loop
	// 	if (val !== undefined){
	// 		// use == for undefined
	// 		console.log(val);
	// 	}
	// }
}

function mystery(a,b,c,d){
	console.log(a);
	console.log(b);
	console.log(c);
	console.log(d);
}