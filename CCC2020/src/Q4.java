import java.util.Scanner;

public class Q4 {

	public static Scanner in = new Scanner(System.in);

	public static void main(String[] args) {
		String one = in.next();
		String two = in.next();
		String[] shifts = new String[two.length()+1];
		shifts[0] = two;
		for (int i = 0; i<two.length(); i++) {
			shifts[i+1] = shifts[i].substring(1) + shifts[i].substring(0,1);
		}
		boolean y = false;
		for (int i = 0; i<shifts.length; i++) {
			if (one.contains(shifts[i])) {
				System.out.print("yes");
				y = true;
				break;
			}
		}
		if (!y) {
			System.out.print("no");
		}
	}

}
