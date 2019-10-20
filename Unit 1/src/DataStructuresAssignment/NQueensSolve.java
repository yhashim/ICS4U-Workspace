package DataStructuresAssignment;

public class NQueensSolve {

	static int n;
	static int yFilled;

	public static void setN(int n1) {
		// method that sets up everything
		n = n1;
		yFilled = 0;
		// call the solver
		solveNQ();
	}

	private static void solveNQ() {
		// solve the problem
		Queen queen = new Queen(0, 0); // x,y
		QueenCoordsStack stack = new QueenCoordsStack();
		stack.push(queen);
		yFilled++; // y
		int x = 0; // x
		while (yFilled < n) {
			Queen q = new Queen(x, yFilled); // x, y
			if (!conflict(q, stack)) {
				stack.push(q);
				yFilled++; // y
				x = 0; // x
			} else if (x + 1 < n) {
				x++; // x
			} else {
				while (!stack.isEmpty() && !((stack.peek().getX() + 1) < n)) {
					stack.pop();
					yFilled--;
				}
				if (stack.isEmpty()) {
					NQueensDriver.print("No solution possible for n = " + n);
					System.exit(1);
				}
				Queen fix = stack.pop();
				x = fix.getX() + 1;
				yFilled = fix.getY();
			}
		}
		printChessBoard(stack);
	}

	private static boolean conflict(Queen q, QueenCoordsStack stack) {
		// check for conflicts at q.x, q.y
		int y = q.getY(), x = q.getX();
		QueenCoordsStack temp = new QueenCoordsStack();
		boolean ret = false;
		while (!stack.isEmpty()) {
			Queen compare = stack.pop();
			temp.push(compare);
			if (compare.getX() == x || compare.getY() == y
					|| Math.abs((double) (compare.getY() - y) / (double) (compare.getX() - x)) == 1) {
				ret = true;
				break;
			}
		}
		while (!temp.isEmpty()) {
			stack.push(temp.pop());
		}
		return ret;
	}

	public static void printChessBoard(QueenCoordsStack stack) {
		// print the board when completed
		while (!stack.isEmpty()) {
			int x = stack.pop().getX();
			for (int i = 0; i < x; i++) {
				NQueensDriver.print(".");
			}
			NQueensDriver.print("Q");
			for (int i = x; i < n - 1; i++) {
				NQueensDriver.print(".");
			}
			System.out.println();
		}
	}

}
