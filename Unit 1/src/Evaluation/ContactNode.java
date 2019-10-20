package Evaluation;

public class ContactNode {
	private Contact data;
	private ContactNode link;
	
	public Contact getData() {
		return data;
	}

	public void setData(Contact data) {
		this.data = data;
	}

	public ContactNode getLink() {
		return link;
	}

	public void setLink(ContactNode link) {
		this.link = link;
	}

	public ContactNode(Contact data, ContactNode link) {
		super();
		this.data = data;
		this.link = link;
	}
	
	public static String toString(Contact data) {
		String contactToString = data.getFirstName().toUpperCase() + " " + 
				data.getLastName().toUpperCase();
		return contactToString;
	}
}
