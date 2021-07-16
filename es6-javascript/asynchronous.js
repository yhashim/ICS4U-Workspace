	// when we don't want to wait something that is going on to hold up the program
	// these following things can be used to deal with asynchronous data (so the code works asynchronously rather than synchronously where we wait for something to fully complete before moving on to the next thing)
	
	// callbacks - old, before ES6
		// making an array of posts for a blog website
		const posts = [
			{ title: 'Post One', body: 'This is post one' },
			{ title: 'Post Two', body: 'This is post two' }
		];
		function getPosts() {
			setTimeout(() => {
				// delay function as if a real callback
				let output = '';
				posts.forEach((post, index) => {
					output += `<li>${post.title}</li>`;
				});
				document.body.innerHTML = output;
			}, 1000);
		}
		// getPosts();
		function createPost(post, callback) {
			setTimeout(() => {
				posts.push(post);
				callback();
			}, 2000);
			// takes longer than get post so the line where we create post below won't be able to print on the page
			// but since we added the callback line, removed the getPosts() line, and called getPosts() in the line below that creates a post it works
		}
		createPost({ title: 'Post Three', body: 'This is post three' }, getPosts);
	
	// promises - came w/ ES6, more elegant
		const posts = [
			{ title: 'Post One', body: 'This is post one' },
			{ title: 'Post Two', body: 'This is post two' }
		];
		function getPosts() {
			setTimeout(() => {
				// delay function as if a real callback
				let output = '';
				posts.forEach((post, index) => {
					output += `<li>${post.title}</li>`;
				});
				document.body.innerHTML = output;
			}, 1000);
		}
		// getPosts();
		function createPost(post) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					posts.push(post);
					const error = false;
					if (!error) {
						resolve();
					} else {
						reject('Error: something went wrong');
					}
				}, 2000);
			});
		}
		// createPost({ title: 'Post Three', body: 'This is post three' })
			// .then(getPosts);
			// .catch(err => console.log(err)); // for if it catches an error
		// looking at Promise.all
		const promise1 = Promise.resolve('Hello World');
		const promsie2 = 10;
		const promise3 = new Promsie((resolve, reject) => setTimeout(resolve, 2000, 'Goodbye'));
		// Promise.all
		Promise.all([promise1, promise2, promise3])
		.then(((values) => 
			console.log(values)
		);
		
	// async await - super elegant, came w/ ES7
		// have to lable function async if use await inside
		async function init() {
			await createPost({ title: 'Post Three', body: 'This is post three' });
			// await on line above says - wait for this to be done before moving on to the next line
			getPosts();
		}
init();
