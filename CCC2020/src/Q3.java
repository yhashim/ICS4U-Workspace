import java.io.*;
import java.util.*;

import java.util.Scanner;

public class Q3 {

	public static Scanner in = new Scanner(System.in);

	public static void main(String[] args) {
		int n = in.nextInt();
		int[] xVals = new int[n];
		int[] yVals = new int[n];		
		for (int i = 0; i<n; i++) {
			String a = in.next();
			String[] s = a.split(",");
			xVals[i] = Integer.parseInt(s[0]);
			yVals[i] = Integer.parseInt(s[1]);
		}
		Arrays.sort(xVals);
		Arrays.sort(yVals); 
		System.out.println((xVals[0]-1) + ", " + (yVals[0]-1));
		System.out.println((xVals[n-1]+1) + ", " + (yVals[n-1]+1));
	}

}

