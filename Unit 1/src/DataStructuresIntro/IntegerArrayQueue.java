package DataStructuresIntro;

public class IntegerArrayQueue implements IntegerQueue {
	
	private Integer[] data;
	private Integer itemCount;
	
	public IntegerArrayQueue() {
		data = new Integer[1000];
		itemCount = 0;
	}
	
	public void enqueue(Integer el) {
		data[itemCount++] = el;
	}

	public Integer dequeue() {
		if (!isEmpty()) {
			itemCount--;
			for (int i = 0; i<itemCount; i++) {
				data[i] = data[i+1];
			} 
			data[itemCount] = 0;
			return data[0];
		} else {
			throw new IllegalStateException("");
		}
	}

	public Integer peek() {
		if (!isEmpty()) {
			return data[0];
		} else {
			return null;
		}
	}

	public void clear() {
		data = new Integer[1000];
	}

	public boolean isEmpty() {
		return itemCount==0;
	}

}
