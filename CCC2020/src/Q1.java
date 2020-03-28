import java.io.*;
import java.util.*;

import java.util.Scanner;

public class Q1 {
	
	// change name file to name when submitting, then change back after successful
	
	/*
	 * reading data from scanner
	 * int n = in.nextInt();
		double x = in.nextDouble();
		String s = in.next();
		String line = in.nextLine();
		boolean b = in.nextBoolean();
	 */

	public static Scanner in = new Scanner(System.in);

	public static void main(String[] args) {
		if ((in.nextInt() + (2*in.nextInt()) + (3*in.nextInt()))>=10) {
			System.out.println("happy");
		} else {
			System.out.println("sad");
		}
	}

}
