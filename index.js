import {Tree} from "./binary-search-tree.js";

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
      return;
    }
  
    prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
  
const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const testTree = new Tree(testArr);

prettyPrint(testTree.root);

console.log('isBalanced should be true:', testTree.isBalanced());


//test for unbalanced BST:
const testTreeUnbalanced = new Tree([]);

// manually insert in descending order → creates a skewed tree
[10, 9, 8, 7, 6, 5, 4].forEach(v => testTreeUnbalanced.insert(v));

prettyPrint(testTreeUnbalanced.root);

console.log('isBalanced should be false:', testTreeUnbalanced.isBalanced());

testTreeUnbalanced.rebalance();
console.log('unbalanced tree is rebalanced:');
prettyPrint(testTreeUnbalanced.root);