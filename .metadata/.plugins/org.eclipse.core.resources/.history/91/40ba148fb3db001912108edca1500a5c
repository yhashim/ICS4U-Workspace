package DataStructuresAssignment;

public class QueenCoordsStack {
	
	private Queen[] data;
	private int manyItems;
	
	public QueenCoordsStack(){
		manyItems = 0;
		data = new Queen[1000];
	}
	
	public Queen peek() {
		if (isEmpty()) throw new IllegalStateException("");
		return data[manyItems-1];
	}

	public Queen pop() {
		if (isEmpty()) throw new IllegalStateException("");
		return data[--manyItems];	
	}

	public boolean isEmpty() {
		return manyItems == 0;
	}

	public void push(Queen x) {
		data[manyItems++] = x;
	}
	
}
