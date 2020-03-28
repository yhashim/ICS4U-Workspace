import java.io.*;
import java.util.*;

import java.util.Scanner;

public class Q2 {

	public static Scanner in = new Scanner(System.in);

	public static void main(String[] args) {
		int bigNum = in.nextInt(), startInfected = in.nextInt(), multiply = in.nextInt();	
		int day = 0;
		int newInfected = startInfected;
		while (newInfected<=bigNum) {
			int oldTot = newInfected;
			newInfected += startInfected*multiply;
			startInfected = newInfected-oldTot;
			day++;
			if (newInfected>bigNum) {
				break;
			}
		}
		System.out.println(day);
	}

}