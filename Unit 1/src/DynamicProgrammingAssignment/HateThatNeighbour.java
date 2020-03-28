package DynamicProgrammingAssignment;

public class HateThatNeighbour {
	// credit the name of this class to Ethan
	
	static int[][] dp;
	
	public static void main(String [] args) {
		int[] donations = {10, 3, 2, 5, 7, 8};
		dp = new int[donations.length][2];
		System.out.println(greatestPossibleDonations(donations));
	}
	
	public static int greatestPossibleDonations(int[] donations) {
		dp[0][0] = donations[0];
		dp[0][1] = 1;
		dp[1][0] = donations[1];
		dp[1][1] = 0;
		int dl = donations.length;
		for (int i=2; i<dl; i++) {
			if (dp[i-2][0]+donations[i] > dp[i-1][0]) {
				dp[i][0] = donations[i]+dp[i-2][0];
				dp[i][1] = dp[i-2][1];
			} else {
				dp[i][0] = dp[i-1][0];
				dp[i][1] = dp[i-1][1];
			}
		}
		if (dp[dl-1][1] == 1) {
			dp[dl-1][0] -= Math.min(donations[0], donations[dl-1]);
			dp[dl-1][0] = Math.max(dp[dl-1][0], dp[dl-2][0]);
		}
		return dp[donations.length-1][0];
	}

}
