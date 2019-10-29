function intN() {
    var input = document.getElementById("userInput").value;
    var yFilled = 0;
    if (input>0){
	    console.log("Generating an " + input + " by " + input + " chess board with " + input + " queens...");
	    solveNQ(input, yFilled);
	} else {
		console.log("No solution possible.");
	}
}

function solveNQ(input, yFilled) {
    var n = input;
    var queen = {};
    queen.x = 0;
    queen.y = 0;
    var queenCoordsStack = [];
    queenCoordsStack.push(queen);
    yFilled++;
    var x = 0;
    while (yFilled < n) {
        var q = {};
        q.x = x;
        q.y = yFilled;
        if (!conflict(q, queenCoordsStack)) {
            queenCoordsStack.push(q);
            yFilled++;
            x = 0;
        } else if (x + 1 < n) {
            x++;
        } else {
            while (!isEmpty(queenCoordsStack) && !((queenCoordsStack[0].x + 1) < n)) {
                queenCoordsStack.pop();
                yFilled--;
            }
            if (isEmpty(queenCoordsStack)) {
                console.log("No solution possible for n = " + n);
            }
            var fix = queenCoordsStack.pop();
            x = fix.x + 1;
            yFilled = fix.y;
        }
    }
    logChessBoard(queenCoordsStack, n);
}

function conflict(q, queenCoordsStack){
	var y = q.y, x = q.x;
	var temp = [];
	var ret = false;
	while (!isEmpty(queenCoordsStack)) {
		var compare = queenCoordsStack.pop();
		temp.push(compare);
		if (compare.x == x || compare.y == y || (((compare.y - y)/(compare.x - x)) == 1 || 
			((compare.y - y)/(compare.x - x)) == -1)) {
			ret = true;
			break;
		}
	}
	while (!isEmpty(temp)) {
		queenCoordsStack.push(temp.pop());
	}
	return ret;
}

function isEmpty(queenCoordsStack){
	var length = 0;
	for (var queen of queenCoordsStack){
		length++;
	}
	return length==0;
}

function logChessBoard(queenCoordsStack, n) {
	while (!isEmpty(queenCoordsStack)) {
		var x = queenCoordsStack.pop().x;
		var stringLog1 = "";
		for (var i = 0; i < x; i++) {
			stringLog1 += ".";
		}
		var stringLog2 = "";
		for (var i = x; i < n - 1; i++) {
			stringLog2 += ".";
		}
		console.log(stringLog1+"Q"+stringLog2);
		console.log();
	}
}