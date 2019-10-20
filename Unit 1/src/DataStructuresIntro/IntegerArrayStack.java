package DataStructuresIntro;

public class IntegerArrayStack implements IntegerStack {
	private Integer[] data;
	private int manyItems;
	
	public IntegerArrayStack(){
		manyItems = 0;
		data = new Integer[100];
	}
	
	public Integer peek() {
		if (isEmpty()) {
			throw new IllegalStateException("");
		}
		return data[manyItems-1];
	}

	public Integer pop() {
		if (isEmpty()) {
			throw new IllegalStateException("");
		}
		return data[--manyItems];
		
	}

	public boolean isEmpty() {
		return manyItems == 0;
	}

	public void push(Integer x) {
		data[manyItems++] = x;
	}
}
