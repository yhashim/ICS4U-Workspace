package orodHelp;

import java.util.Scanner;

public class randomChar {

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		String s = in.next();
		int randomIndex = (int)(Math.random()*s.length());
		System.out.println("Here's a random char from your string: " + s.substring(randomIndex,randomIndex+1));
		in.close();
	}

}
