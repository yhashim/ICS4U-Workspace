package DataStructuresAssignment;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.concurrent.TimeUnit;

public class NQueensDriver {
	
	static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	static StringTokenizer st;
	static int n;
	
	public static void main(String[] args) {
		n = -1;
		while (n<=0) {
			print("Please choose an integer, n which is greater than 0.\n");
			n = prompt();
		}
		if (n>0) {
			print("Generating an " + n + " by " + n + " chess board with " + n + " queens...\n");
			NQueensSolve.setN(n);
			System.exit(1);
		}
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

	private static int prompt() {
		try {
			int input = readInt();
			return input;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 0;
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
	
    static int readInt() throws IOException {
        return Integer.parseInt(next());
    }

}
