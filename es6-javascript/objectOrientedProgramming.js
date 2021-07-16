// Object can have .property or .method()
	// String and other primitive data types are primitive but treated as objects when running a method on them (e.g. const s1 = 'hi' type would be string, but const s2 = new String('hi') is an object)
	
	// Object literals:
	const book1 = {
		title: '',
		author: '',
		year: '',
		getSummary: function() {
			return `${this.title} was written by ${this.author} in ${this.year}`; // MUST USE BACKWARDS SINGLE QUOTES: ``
		}
	};
	console.log(book1.getSumarry());
	
	// Make constructor by new js file:
	function Book(title, author, year) {
		this.title = title;
		this.author = author;
		this.year = year;
	}
	// make functions as prototype when not want for all books, make in constructor when want for all books, same but instead of Book.prototype. It would start w/ this.
	Book.prototype.getSummary = function() {
		return `${this.title} was written by ${this.author} in ${this.year}`; // MUST USE BACKWARDS SINGLE QUOTES: ``
	};
	const book1 = new ObjectNameCap('Book', 'Person', 'Year');
	console.log(book1.getSummary());
	// inheritance
	// magazine constructor
	function Magazine(title, author, year, month) {
		Book.call(this, title, author, year);
		this.month = month;
	}
	// to make mags inherit the prototype getSummary
	Magazine.prototype = Object.create(Book.prototype);
	const mg1 = new Magazine('Mag', 'Person', 'Year', 'Month');
console.log(mag1.getSummary());
