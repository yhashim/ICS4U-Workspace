package DataStructuresIntro;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class TreeDriver {

	public static void main(String[] args) throws FileNotFoundException {
		Scanner in = new Scanner(new File("Tree.dat"));
		IntBST bst = new IntBST();
		while (in.hasNext()) {
			bst.addInteger(in.nextInt());
		}
		bst.inOrderTraversal();
		in.close();
		bst.deleteInteger(10);
		bst.inOrderTraversal();
	}

}