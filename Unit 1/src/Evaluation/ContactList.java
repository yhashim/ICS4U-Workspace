package Evaluation;

public class ContactList {
	static ContactNode head;
	
	public static void add(Contact c) {
		head = new ContactNode(c, head);
		ContactDriver.print("Add successful.\n");
	}
	
	public static Contact delete(String lastName) {
		if (head == null) {
			return null;
		} else if (head.getData().getLastName().equals(lastName)) {
			Contact c = head.getData();
			head = head.getLink();
			return c;
		} else {
			ContactNode prev = head;
			while (prev.getLink()!=null) {
				if (prev.getData().getLastName().equals(lastName)) {
					Contact c = prev.getLink().getData();
					prev.setLink(prev.getLink().getLink());
					ContactDriver.print("Delete successful.\n");
					return c;					
				} else {
					prev = prev.getLink();
				}
			}
			return null;
		}
	}

	public static void display() {
		ContactNode previous = head;
		while (previous!=null) {
			ContactDriver.print(ContactNode.toString(previous.getData()) + "\n");
			previous = previous.getLink();
		}
	}

	public static void find(String name) {
		if (head == null) {
			ContactDriver.print(name + " not found.\n");
		} else if (head.getData().getLastName().equals(name.substring(name.lastIndexOf(" ")+1)) && 
				head.getData().getFirstName().equals(name.substring(0, name.lastIndexOf(" ")))) {
			ContactDriver.print(name.toUpperCase() + " was found.\n");
		} else {
			ContactNode prev = head;
			while (prev.getLink()!=null) {
				if (prev.getData().getLastName().equals(name.substring(name.lastIndexOf(" ")+1)) && 
						prev.getData().getFirstName().equals(name.substring(0, name.lastIndexOf(" ")))) {
					ContactDriver.print(name.toUpperCase() + " was found.\n");
				} else {
					prev = prev.getLink();
				}
			}
		}
	}

}
