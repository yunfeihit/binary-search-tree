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

testTree.preOrderForEach(console.log);
console.log(' ');
testTree.inOrderForEach(console.log)
console.log(' ');
testTree.postOrderForEach(console.log)