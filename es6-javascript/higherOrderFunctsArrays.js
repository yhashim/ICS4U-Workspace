//JavaScript Higher Order Functions & Arrays

const companies = [
	{name: "Company 1", category: "Finance", start: 1900, end: 2000},
	{name: "Company 2", category: "Retail", start: 1901, end: 2001},
	{name: "Company 3", category: "Auto", start: 1902, end: 2002},
	{name: "Company 4", category: "Technology", start: 1903, end: 2003},
	{name: "Company 5", category: "Finance", start: 1904, end: 2004},
];

const ages = [10, 20, 30, 40, 50];

// ES6 methods
	// forEach
		// better (nicer + elegant) way to loop through an array (or data), rather than using a for-loop
		// doesn't return anything like some other loops do
		
		// for loop to compare
		for (let i = 0; i<companies.length; i++) {
			console.log(companies[i]);
		}
		
		// for each
		companies.forEach(function(company) {
			console.log(company);
		});
		// you can put 3 things in the function () brackets
		// the first one is always the current item, the second is index, and third can be collection
		// you are basically retrieving them if you know you will use them in the for each loop

	// filter
		// filter allows us to filter things out from an array and put into new array
		// how we'd do it w/ a for loop
			let over30 = [];
			for(let i = 1; i<ages.length; i++) {
				if(ages[i]>=30){
					over30.push(ages[i]);
				}
			}
			console.log(over30);
		// do it w/ filter!
			const over30 = ages.filter(function(age) {
				if(age>=30){
					return true;
				}
			});
			console.log(over30);
		// do it w/ filter in one line using ES6 arrow functions
			const over30 = ages.filter(age => age>=30);
			// filter(item arrow function condition)
			console.log(over30);
			
	// map
		// can make new arrays of anything from a current array
		// e.g. create an array of company names
		const companyNames = companies.map(function(company) {
			return company.name;
		});
		console.log(companyNames);
		
		const testMap = companies.map(function(company) {
			return '${company.name} [${company.start} - ${company.end}]';
			// using template string
			// makes a string w/ "var [var - var]" format
			// var format ${var}
		});
		// short version of the code above, using arrow function
		const testMap = companies.map(company => '${company.name} [${company.start} - ${company.end}]' );
		
		const agesSquare = ages.map(age => Math.sqrt(age));
		console.log(agesSquare);
		
	// sort
		// works similarly to other functions
		const sortedCompanies = companies.sort(function(c1, c2) {
			if (c1.start > c2.start) {
				return 1;
			} else {
				return -1;
			}
		});
		// sort takes 2 vars, vars you compare
		console.log(sortedCompanies);
		
		// shorter formatting
		const sortedCompanies = companies.sort((a, b) => (a.start > b.start ? 1 : -1));
		// first the condition, then ? What to return for if true : if not true (else)
		
		// sort ages small to big
		const sortAgesSmall = ages.sort((a, b) => a-b);
		// big to small
		const sortAgesBig = ages.sort((a, b) => b-a);
	
	// reduce
		let ageSum = 0;
		for (let i = 0; i<ages.length; i++){
			ageSum += ages[i];
		}
		console.log(ageSum);
		
		// with reduce
		const ageSum = ages.reduce(function(total, age) {
			return total + age;
		}, 0);
		// shorter formatting
		const ageSum = ages.reduce((total, age) => total + age, 0);
		// 0 is the val the total starts at
		
	// combining methods
		const combined = ages.map(age => age*2).filter(age => age>=40).sort((a, b) => a-b).reduce((a, b) => a + b, 0);
		// multiplies everything in ages by 2, filters out vals equal or over 40, sorts them in order low to high, gets the sum all elements
    
