import java.io.*;
import java.util.*;
import java.io.*;
import java.util.*;

public class Q5 {
	
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static StringTokenizer st;
    static PrintWriter pw = new PrintWriter(new OutputStreamWriter(System.out));
	public static Scanner in = new Scanner(System.in);
	
    static ArrayList<String> factors;
    static int m, n;

	public static void main(String[] args) throws IOException {
		/*
		 * reading data from scanner
		 * int n = in.nextInt();
			double x = in.nextDouble();
			String s = in.next();
			String line = in.nextLine();
			boolean b = in.nextBoolean();
		 */
		factors = new ArrayList<String>();
		int m = readInt();
		int n = readInt();
		int[][] board = new int[m][n];
		for (int r = 0; r<m; r++) {
			for (int c = 0; c<n; c++) {
				board[r][c] = readInt();
			}
		}
		int currRow = 0;
		int currCol = 0;
		int currVal = board[currRow][currCol];
		
		boolean yes = recursion(currVal);
		
		
		
	}
	
	private static boolean recursion(int currValcurrVal) {
		if (m*n==currValcurrVal) {
			return true;
		} else if ((m-1)*(n)==currValcurrVal){
			System.out.println();
		}
		
	}

	private static void factor(int currVal2) {
		for (int i = 1; i<currVal2/2; i++) {
			if (currVal2%i==0) {
				int j = currVal2/i;
				factors.add(i+","+j);
			}
		}
	}
	
	static String next() throws IOException {
        while (st == null || !st.hasMoreTokens()) {
            st = new StringTokenizer(br.readLine().trim());
        }
        return st.nextToken();
    }
    static int readInt() throws IOException {
        return Integer.parseInt(next());
    }
    static String readLine() throws IOException {
        return br.readLine().trim();
    } 

}
