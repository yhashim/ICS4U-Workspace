package DynamicProgrammingAssignment;

public class LongestZigZagSq {

	static String[][] dynamicProgramming;
	static int solution;
	
	public static void main(String[] args) {
		int[] sequence = {14, 3, 2, 7, 5, 5};
		dynamicProgramming = new String[3][sequence.length];
		solution = 0;
			// num1, num2, ans
		for (int i = 0; i<3; i++) {
			for (int j = 0; j<dynamicProgramming.length; j++) {
				dynamicProgramming[i][j] = null;
			}
		}
		System.out.println(longestZigzagSq(sequence));
	}

	public static int longestZigzagSq(int[] array) {
		int length = 0;
		int maxSq = 0;
		if (array.length==0) {
			return 0;
		} else if (array.length==1) {
			return 1;
		} 
		int[] a = new int[array.length];
		for (int i = 0; i<array.length; i++) {
			for (int j = i+1; j<array.length; j++) {
				int one = array[i], two = array[j];
				boolean before = checkDP(one, two);
				if (before) {
					if (solution < 0) {
						/////////////////////
						/////////////////////
					} else if (solution == 0) {
						/////////////////////
						/////////////////////
					} else if (solution > 0) {
						/////////////////////
						/////////////////////
					}
				} else {
					// solve
					/////////////////////
					/////////////////////
					if ((array[i] > array[j] && array[j]<array[j+1]) || (array[i] < array[j] && array[j]>array[j+1]) && a[i]<a[j]+1) {
						a[i] = a[i] + 1;
						if (a[i]>maxSq) {
							maxSq = a[i];
						}	
					}
				}
			}
		}
		return length;
	}
	
	public static boolean checkDP(int one, int two) {
		for (int i = 0; i<dynamicProgramming.length-2; i++) {
			for (int j = 0; j<dynamicProgramming[0].length; j++) {
				if (dynamicProgramming[i][j]==null) {
					return false;
				} else if (Integer.parseInt(dynamicProgramming[i][j])==one
						&& Integer.parseInt(dynamicProgramming[i+1][j])==two) {
					solution = Integer.parseInt(dynamicProgramming[i+1][j]);
					return true;
				}
			}
		}
		return false;
	}

}
