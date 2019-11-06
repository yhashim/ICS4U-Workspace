const MAX_WRONG = 7;

function main() {
	playHangman();
}

function playHangman() {
	var answer = "BVG VOLLEYBALL WINS SILVER";
	// change to random index from array of possible answers
	var userAnswer  = convert(answer);
	console.log(userAnswer);
	var numWrong = 0;
	// displayHangman(numWrong);
	while(numWrong<MAX_WRONG){
		var userChoice = document.getElementById("userInput").value;
		if (isCorrect(userChoice, answer)){
			userAnswer = convert(answer, userChoice, userAnswer);
			console.log(userAnswer);
		} else {
			numWrong++;
			displayHangman(numWrong);
		}
		if(userAnswer.equals(answer)){
			console("Winner");
		}
	}
	if (numWrong==MAX_WRONG){
		console.log("Loser");
	}
}

function convert(answer, userChoice, userAnswer){
	var result = "";
	for (var i=0; var<answer.length(); i++){
		if (answer.substring(i,i+1).equals(userChoice)){
			result+=userChoice;
		} else {
			result += userAnswer;
		}
		}
	}
}

function isCorrect(userChoice, answer){
	return answer.indexOf(userChoice)>=0;
}

function convert(answer) {
	var result = "";
	for (var x = 0; x < answer.length; x++){
	    var c = answer.charAt(x);
	    if (c == " "){
	    	result+=" ";
	    } else {
	    	result+="*";
	    }
	}
	// console.log(result);
	return result;
}

function displayHangman(numWrong){
	var person = "";
	if (numWrong>=1){
		person+="  O\n";
		console.log(person);
	} else if (numWrong>=2){
		person+="  |\n";
		console.log(person);
	} else if (numWrong>=3){
		person+="--|";
		console.log(person);
	} else if (numWrong>=4){
		person+="--";
		console.log(person);
	} else if (numWrong>=5){
		person+="  |\n";
		console.log(person);
	} else if (numWrong>=6){
		person+="  /";
		console.log(person);
	} else {
		person+="  \\";
		console.log(person);
	}
	// display person on page
	console.log(person);
}