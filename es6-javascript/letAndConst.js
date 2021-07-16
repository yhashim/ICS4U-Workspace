"use strict" // means we are using strict mode, code throws more errors for "silent errors", more syntax prohibited, etc. https://www.geeksforgeeks.org/strict-mode-javascript/

// the global scope
// the old way
var a = 'Test1';
console.log(a); // will log it as is

// the new way
Let b = 'Test 2';
Console.log(b) // will log it as is

// therefore on the global scope, var and let are pretty much the same



function testVar() {
	var c = 30;
	if (true) {
		var c = 50;
		console.log(c);
	}
	console.log(c);
}

testVar();
// console logs 50 and 50 
// why? Bc in the if statement, we changed c everywhere



function testLet() {
	let c = 30;
	if (true) {
		let c = 50;
		console.log(c);
	}
	console.log(c);
}

testLet();
// console logs 50 then 30
// why? Bc the c outside and inside the if are only seen by their own scopes



for (var i = o; i<10; i++) {
	console.log(i); // logs 0 to 9
}
console.log(i); // logs 10
// why? Bc this i relates to the i in the for loop



for (let j = o; j<10; j++) {
	console.log(j); // logs 0 to 9
}
// console.log(j); // ERROR
// why? Bc j's scope is ONLY w/in the for loop



// the need for const is that if we set something it's going to be a constant - it's not gonna be a variable, so if we try to set it again we are gonna have issues
const colors = [];
colors.push('red');
colors.push('blue');
console.log(colors); // will log the array

colors = 'Green'; // will through an error saying "Assignment to constant variable"
// the colors const can't be changed! It can have things pushed to it bc that's just adding to the array, but if we try to change the whole thing then it will through errors
