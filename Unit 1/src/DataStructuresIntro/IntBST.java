package DataStructuresIntro;

public class IntBST {
	
	private IntBinaryTreeNode root;
	
	public IntBST() {
		root = null;
	}
	
	public void addInteger(int data) {
		if (root==null) {
			root = new IntBinaryTreeNode(data);
		} else {
			addInteger(root, data);
		}
	}

	private void addInteger(IntBinaryTreeNode node, int data) {
		if (data<node.getData()) {
			if (node.hasLeft()) {
				addInteger(node.getLeftChild(), data);
			} else {
				node.setLeftChild(new IntBinaryTreeNode(data));
			}
		} else if (data>node.getData()) {
			if (node.hasRight()) {
				addInteger(node.getRightChild(), data);
			} else {
				node.setRightChild(new IntBinaryTreeNode(data));
			}
		}
	}
	
	public void deleteInteger(int data) {
		if (root==null) {
			return;
		} else {
			if (root.getData()==data) {
				root = null;
			} else {
				deleteInteger(root, data);
			}
		}
	}
	
	public IntBinaryTreeNode deleteInteger(IntBinaryTreeNode node, int data) {
		if (data==node.getData()) {
			IntBinaryTreeNode parent = node;
			IntBinaryTreeNode nodeData = parent.getRightChild();
			if (parent.getLeftChild().getData()==data) {
				nodeData = parent.getLeftChild();
			}
			if (!nodeData.hasLeft() && !nodeData.hasRight()) {
				if (parent.getLeftChild().getData()==data) {
					parent.setLeftChild(null);
				} else if (parent.getRightChild().getData()==data) {
					parent.setRightChild(null);
				}
			} else if ((!nodeData.hasLeft() && nodeData.hasRight()) || (nodeData.hasLeft() && !nodeData.hasRight())) {
				if (nodeData.hasLeft()) {
					if (parent.getLeftChild().getData()==data) {
						parent.setLeftChild(nodeData.getLeftChild());
					} else if (parent.getRightChild().getData()==data) {
						parent.setRightChild(nodeData.getLeftChild());
					}
				} else if (nodeData.hasRight()) {
					if (parent.getLeftChild().getData()==data) {
						parent.setLeftChild(nodeData.getRightChild());
					} else if (parent.getRightChild().getData()==data) {
						parent.setRightChild(nodeData.getRightChild());
					}
				}
			} else if (nodeData.hasLeft() && nodeData.hasRight()) {
				nodeData = getRightMinNode(parent, data);
				deleteInteger(nodeData, nodeData.getRightChild().getData());
			}
			return nodeData;
		} else if (data<node.getData()) {
			if (node.hasLeft()) {
				deleteInteger(node.getLeftChild(), data);
			} 
		} else if (data>node.getData()) {
			if (node.hasRight()) {
				deleteInteger(node.getRightChild(), data);
			}
		}
		return node;
	}
	
	private IntBinaryTreeNode getRightMinNode(IntBinaryTreeNode parent, int data) {
		IntBinaryTreeNode nodeData = parent.getRightChild();
		if (parent.getLeftChild().getData()==data) {
			nodeData = parent.getLeftChild();
		}
		if (nodeData.hasLeft()) {
			return getRightMinNode(nodeData.getLeftChild(), data);
		} else {
			IntBinaryTreeNode temp = nodeData;
			if (parent.getLeftChild().getData()==data) {
				parent.setLeftChild(null);
			} else if (parent.getRightChild().getData()==data) {
				parent.setRightChild(null);
			}
			return temp;
		}
	}

	public void processNode(IntBinaryTreeNode node) {
		System.out.println(node.getData());
	}
	
	public void preOrderTraversal() {
		preOrderTraversal(root);
	}

	private void preOrderTraversal(IntBinaryTreeNode node) {
		processNode(node);	
		if (node.hasLeft()) {
			preOrderTraversal(node.getLeftChild());
		}
		if (node.hasRight()) {
			preOrderTraversal(node.getRightChild());
		}
	}
	
	public void postOrderTraversal() {
		postOrderTraversal(root);
	}

	private void postOrderTraversal(IntBinaryTreeNode node) {
		if (node.hasLeft()) {
			postOrderTraversal(node.getLeftChild());
		}
		if (node.hasRight()) {
			postOrderTraversal(node.getRightChild());
		}
		processNode(node);	
	}
	
	public void inOrderTraversal() {
		inOrderTraversal(root);
	}

	private void inOrderTraversal(IntBinaryTreeNode node) {
		if (node.hasLeft()) {
			inOrderTraversal(node.getLeftChild());
		}
		processNode(node);
		if (node.hasRight()) {
			inOrderTraversal(node.getRightChild());
		}	
	}
	
}
