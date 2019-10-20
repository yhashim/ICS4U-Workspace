package Evaluation;

public class Contact {
	private String firstName;
	private String lastName;
	private String phone;
	
	public Contact(){
		
	}
	
	public Contact(String firstName, String lastName, String phone) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getPhone() {
		return phone;
	}
	
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public static String toString(Contact person) {
		String contactToString = person.getFirstName().toUpperCase() + " " + person.getLastName().toUpperCase() + " " + person.getPhone();
		return contactToString;
	}
		
}
