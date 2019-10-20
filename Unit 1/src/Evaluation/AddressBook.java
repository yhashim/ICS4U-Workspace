package Evaluation;

public class AddressBook {

	private static Contact[] booklet;

	public AddressBook(int numppl) {
		booklet = new Contact[numppl];
	}

	public static void add(String name, String phone) {
		// TODO Auto-generated method stub
		Contact person = new Contact(name.substring(0, name.indexOf(" ")),
				name.substring(name.indexOf(" ")+1), phone);
		AddressBookDriver.numppl++;
		Contact[] temp = new Contact[AddressBookDriver.numppl];
		if (AddressBookDriver.numppl>1) {
			for (int i = 0; i<AddressBookDriver.numppl; i++) {
				temp[i] = booklet[i];
			}
			booklet = temp;
		}
		booklet[AddressBookDriver.numppl - 1] = person;
		AddressBookDriver.print("Add successful.\n");
	}

	public static void display() {
		for (int i = 0; i < AddressBookDriver.numppl; i++) {
			AddressBookDriver.print(Contact.toString(booklet[i]) + "\n");
		}
	}

	public static int check(String name) {
		int index = -1;
		for (int i = 0; i < AddressBookDriver.numppl; i++) {
			if ((booklet[i].getFirstName().toLowerCase() + " " + booklet[i].getLastName().toLowerCase())
					.equals(name.toLowerCase())) {
				index = i;
				break;
			}
		}
		return index;
	}
	
	public static void find(String name) {
		if (check(name)>=0) {
			AddressBookDriver.print(name + " successfully found.\n");
			for (int i = 0; i<AddressBookDriver.numppl; i++) {
				String n1 = contacts[i].getFirstName() + " " + contacts[i].getLastName();
				if (n1.toLowerCase().equals(name.toLowerCase())) {
					AddressBookDriver.print("Their phone number is: " + contacts[i].getPhone() + "\n");
					break;
				}
			}
		} else {
			AddressBookDriver.print(name + " not found.");
		}
	}

	public static void delete(String name) {
		// TODO Auto-generated method stub
		if (check(name) <= -1) {
			AddressBookDriver.print(name + " cannot be found to be deleted.\n");
			return;
		} else {
			AddressBookDriver.numppl--;
			Contact[] temp = new Contact[AddressBookDriver.numppl];
			for (int i = 0; i<AddressBookDriver.numppl; i++) {
				if (i<check(name)) {
					temp[i] = AddressBookDriver.contacts[i];
				}
				if (i>check(name)) {
					temp[i] = AddressBookDriver.;//contacts[i+1];
				}
			}
			AddressBookDriver.contacts = temp;
			AddressBookDriver.print(name + " was successfully deleted.\n");
		}
	}

}