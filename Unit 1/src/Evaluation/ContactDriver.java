package Evaluation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.concurrent.TimeUnit;

public class ContactDriver {
	
	static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	static StringTokenizer st;
	static boolean done;
	public static int numppl;
	public static AddressBook contacts;

	public static void main(String[] args) throws IOException {
		done = false;
		numppl = 5;
		ContactList book = new ContactList();
		print("Welcome to your Contact List!\n");
		intro();
		while (!done) {
			print("What would you like to do?\n");
			parse(prompt().toLowerCase());
		}
	}

	private static void intro() {
		// TODO Auto-generated method stuff
		print("Instructions:\n");
		print("	- To add a contact, print \"add\" + full name + phone number\n");
		print("	- To display your full address book, print \"display\"\n");
		print("	- To search for a contact's information, print \"find\" full name\n");
		print("	- To delete a contact, print \"delete\" + full name\n");
		print("	- To access the instructions, print \"instruct\"\n");
		print("	- To leave, print \"done\"\n");
	}

	static void print(String temp) {
		int lapse = 15;
		for (int i = 0; i < temp.length(); i++) {
			try {
				TimeUnit.MILLISECONDS.sleep(lapse);
				System.out.print(temp.charAt(i));
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	private static String prompt() {
		try {
			String input = readLine();
			return input;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private static void parse(String input) {
		// commands: add, display, find, delete, instruct, done
		if (noCommand(input)) {
			print("Sorry, I do not understand that function.\nThe functions you may "
					+ "perform include: add, display, find, delete, instruct and done.\n");
		} else {
			if (input.equals("done")) {
				done = true;
				print("Goodbye!");
			} else {
				String command = input;
				String name = "";
				if (!command.equals("display")&&!command.equals("instruct")) {
					if (command.contains(" ")) {
						command = input.substring(0, input.indexOf(" "));
						name = input.substring(input.indexOf(" ")+1); 
					} else {
						command = input;
						print("Who would you like to " + command + "?\n");
						name = prompt();
					}
				}
				if (command.equals("add")) {
					// name
					// phone number
					ContactList.add(new Contact(name.substring(0, name.indexOf(" ")),
							name.substring(name.indexOf(" ")+1), name.substring(name.lastIndexOf(' ')+1)));
				} else if (command.equals("display")) {
					if (ContactList.head == null) {
						print("There is nothing to display yet.\n");
					} else {
						ContactList.display();
					}
				} else if (command.equals("find")) {
					ContactList.find(name.substring(0, name.lastIndexOf(" ")));
				} else if (command.equals("delete")) {
					ContactList.delete(name);
				} else if (command.equals("instruct")) {
					intro();
				}
			}
		}
	}

	private static boolean noCommand(String input) {
		if (input.indexOf(' ')>0) {
			input = input.substring(0, input.indexOf(' '));
		}
		if (input.toLowerCase().equals("add")||input.toLowerCase().equals("display")||
				input.toLowerCase().equals("find")||input.toLowerCase().equals("delete")||
				input.toLowerCase().equals("instruct")||input.toLowerCase().equals("done")) {
			return false;
		}
		return true;
	}

	static String next() throws IOException {
		while (st == null || !st.hasMoreTokens()) {
			st = new StringTokenizer(br.readLine().trim());
		}
		return st.nextToken();
	}

	static String readLine() throws IOException {
		return br.readLine().trim();
	}

}
