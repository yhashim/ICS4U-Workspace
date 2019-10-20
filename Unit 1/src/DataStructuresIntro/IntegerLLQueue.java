package DataStructuresIntro;

public class IntegerLLQueue implements IntegerQueue {

	private IntegerNode head;

	public void enqueue(Integer el) {
		if (head == null) {
			head = new IntegerNode(el, null);
		} else {
			getTail(head).setLink(new IntegerNode(el, null));
		}
	}

	public Integer dequeue() {
		if (isEmpty()) {
			throw new IllegalStateException("");
		}
		Integer temp = head.getData();
		head = head.getLink();
		return temp;
	}

	public Integer peek() {
		if (isEmpty()) {
			throw new IllegalStateException("");
		}
		return head.getData();
	}

	public void clear() {
		head = null;
	}

	public boolean isEmpty() {
		return head == null;
	}

	private IntegerNode getTail(IntegerNode el) {
		if (el.getLink() == null) {
			return el;
		} else {
			return getTail(el.getLink());
		}
	}

	class IntegerNode {
		private Integer data;
		private IntegerNode link;

		public IntegerNode(Integer data, IntegerNode link) {
			this.data = data;
			this.link = link;
		}

		public IntegerNode getLink() {
			return link;
		}

		public void setLink(IntegerNode link) {
			this.link = link;
		}

		public Integer getData() {
			return data;
		}

		public void setData(Integer data) {
			this.data = data;
		}
	}
	
}