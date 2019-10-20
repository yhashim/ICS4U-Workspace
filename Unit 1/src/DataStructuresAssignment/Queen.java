package DataStructuresAssignment;

public class Queen {
	
	private int x, y;

	public Queen(int x, int y) {
		this.setX(x);
		this.setY(y);
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public boolean shiftable() {
		return this.getX()+1<NQueensSolve.n;
	}
 
}
