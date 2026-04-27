class Node {
    constructor(value = null) {
        this.value = value;
        this.leftNode = null;
        this.rightNode = null;
    }
}

//Banlanced Binary Search Tree
class Tree {
    constructor(arr) {
        this.arr = arr;
        this.sortedArr = [...new Set(this.arr)].sort((a, b) => a - b);
        this.root = this.buildBalancedBinarySearchTree(this.sortedArr);
    }

    splitArray(arr) {
        const middleIndex = Math.floor(arr.length / 2);

        //Edge Case: empty arr is already handled, empty [] will be returned on left or right or middle item automatically
        return {
            leftPartArray: arr.slice(0, middleIndex),
            middleItem: arr[middleIndex],
            rightPartArray: arr.slice(middleIndex + 1)
        }
    }
    
    buildBalancedBinarySearchTree(arr) {

        //Edge Case: arr is empty
        if(arr.length === 0) return null;
   
        const splitArrayObject = this.splitArray(arr);
        const root = new Node(splitArrayObject.middleItem);

        root.leftNode = this.buildBalancedBinarySearchTree(splitArrayObject.leftPartArray);          
        root.rightNode = this.buildBalancedBinarySearchTree(splitArrayObject.rightPartArray);

        return root;

    }

    includes(value) {
        const search = (node) => {
            if(node === null) return false

            if(node.value === value) return true;
            return(search(node.leftNode) || search(node.rightNode));
        }

        return search(this.root)
    }

    insert(value) {
        //loop edge case:
        if(this.root === null) {
            this.root = new Node(value);
            return;
        }

        let current = this.root;
        while(true) {
            if(value < current.value) {
                if(current.leftNode === null) {
                    current.leftNode = new Node(value);
                    return;
                }
                current = current.leftNode;
            } else if(value > current.value) {
                if(current.rightNode === null) {
                    current.rightNode = new Node(value);
                    return
                }
                current = current.rightNode;
            } else {
                //if equal, it's duplicate, do nothing but return;
                return;
            }
        }
    }

    //if value is not exist, do nothing
    deleteItem(value) {
        //Edge Case: empty tree
        if(this.root === null) return;

        const handleRootDelete = (root) => {
            //case 1: if root is a leaf(has no children), just make it point to null
            if(root.leftNode === null && root.rightNode === null) {
                root = null;
            }

            //case 2.1: if root only has one child on the left
            if(root.leftNode !== null && root.rightNode === null) {
                root = root.leftNode;
            }

            //case 2.2: if root only has one child on the right
            if(root.rightNode !== null && root.leftNode === null) {
                root = root.rightNode;
            }

            //case 3: if root has two children, replace target with smallest on the right subtree
            if(root.leftNode !== null && root.rightNode !== null) {

                const returnSmallestValueAndDeleteNode = (rootNode) => { 
                    //Edge Case: if tree is empty, return null and do nothing
                    if(rootNode === null)   return null;

                    let parent = rootNode;
                    let smallestValue = null

                    //Edge Case: rootNode qualified(rootNode.leftNode === null)
                    if(rootNode.leftNode === null) {
                        const smallestValue = rootNode.value;
                        rootNode = rootNode.rightNode === null
                            ? null
                            : rootNode.rightNode;
                        return smallestValue;
                    }

                    //rootNode(parent) is not qualified(rootNode.leftNode !== null):
                    while(true) {
                        smallestValue = parent.leftNode.value;

                        if(parent.leftNode.leftNode === null) {
                            parent.leftNode = null;
                            break;
                        } else {
                            parent = parent.leftNode;
                        }
                    }
                    return smallestValue;
                }

                root.value = returnSmallestValueAndDeleteNode(root.rightNode);
            }
        }

        //since the following loop dont judge if root.value is qualified, do it now
        if(this.root.value === value) {
            handleRootDelete(this.root);
            return;
        }

        //find the "Parent" Node(not the node!):
        let parent = this.root;
        let childrenPosition = 0;
        while(true) {
            if(value < parent.value) {
                if(parent.leftNode === null) return;    //no such value, just return
                if(value === parent.leftNode.value) {   //finded
                    childrenPosition = 'left';
                    break;
                }
                parent = parent.leftNode;               //move to left
            } else if(value > parent.value) {
                if(parent.rightNode === null) return;   //no such value, just return
                if(value === parent.rightNode.value) {  //finded
                    childrenPosition = 'right';
                    break;
                }
                parent = parent.rightNode;              //move to right
            }                
        }

        //handle delete on different conditions
        const handleDelete = (parentNode, targetDirection) => {
            const targetNode = targetDirection === 'left'
                ? parentNode.leftNode
                : parentNode.rightNode

            //case 1: if current is a leaf(has no children), just make parentNode point to null
            if(targetNode.leftNode === null && targetNode.rightNode === null) {
                if(targetDirection === 'left') {
                    parentNode.leftNode = null;
                } else {
                    parentNode.rightNode = null;
                }
            }

            //case 2: if current only has one child, make parent directally point to the child node
            if((targetNode.leftNode === null && targetNode.rightNode !== null) || (targetNode.rightNode === null && targetNode.leftNode !== null)) {
                if(targetDirection === 'left' && targetNode.leftNode === null) {
                    parent.leftNode = targetNode.rightNode;
                } else if(targetDirection === 'left' && targetNode.rightNode === null) {
                    parent.leftNode = targetNode.leftNode;
                } else if(targetDirection === 'right' && targetNode.leftNode === null) {
                    parent.rightNode = targetNode.rightNode;
                } else if(targetDirection === 'right' && targetNode.rightNode === null) {
                    parent.rightNode = targetNode.leftNode;             
                }
            }

            //case 3: if current has two children, replace target with smallest on the right subtree
            if(targetNode.leftNode !== null && targetNode.rightNode !== null) {

                const returnSmallestValueAndDeleteNode = (rootNode) => { 
                    //Edge Case: if tree is empty, return null and do nothing
                    if(rootNode === null)   return null;

                    let parent = rootNode;
                    let smallestValue = null

                    //Edge Case: rootNode qualified(rootNode.leftNode === null)
                    if(rootNode.leftNode === null) {
                        const smallestValue = rootNode.value;
                        rootNode = rootNode.rightNode === null
                            ? null
                            : rootNode.rightNode;
                        return smallestValue;
                    }

                    //rootNode(parent) is not qualified(rootNode.leftNode !== null):
                    while(true) {
                        smallestValue = parent.leftNode.value;

                        if(parent.leftNode.leftNode === null) {
                            parent.leftNode = null;
                            break;
                        } else {
                            parent = parent.leftNode;
                        }
                    }
                    return smallestValue;
                }

                targetNode.value = returnSmallestValueAndDeleteNode(targetNode.rightNode);
            }
        }

        handleDelete(parent, childrenPosition);
    }

    levelOrderForEach(callback) {
        //Edge Case: callback is not a function
        if(typeof callback !== 'function') {
            throw new Error('callback need to be a function')
        }

        let queue = [];

        //Edge Case: if BST is empty, do nothing
        if(this.root === null) return;

        queue.push(this.root);
        while(queue.length !== 0) {
            const node = queue.shift();            
            callback(node.value);
            if(node.leftNode !== null) queue.push(node.leftNode);
            if(node.rightNode !== null) queue.push(node.rightNode);
        } 
       
    }

    preOrderForEach(callback) {
        //Edge Case: callback is not a function
        if(typeof callback !== 'function') {
            throw new Error('callback need to be a function')
        }

        //Edge Case: if BST is empty, do nothing
        if(this.root === null) return;

        const preOrderTraversal = (node) => {
            callback(node.value);
            if(node.leftNode !== null) {
                preOrderTraversal(node.leftNode);
            };
            if(node.rightNode !== null) {
                preOrderTraversal(node.rightNode);
            }
        }
        
        preOrderTraversal(this.root)
    }

    inOrderForEach(callback) {
        //Edge Case: callback is not a function
        if(typeof callback !== 'function') {
            throw new Error('callback need to be a function')
        }

        //Edge Case: if BST is empty, do nothing
        if(this.root === null) return;

        const inOrderTraversal = (node) => {
            if(node.leftNode !== null) {
                inOrderTraversal(node.leftNode);
            };
            if(node.rightNode !== null) {
                inOrderTraversal(node.rightNode);
            };
            callback(node.value);
        }
        
        inOrderTraversal(this.root)
    }

    postOrderForEach(callback) {
        //Edge Case: callback is not a function
        if(typeof callback !== 'function') {
            throw new Error('callback need to be a function')
        }

        //Edge Case: if BST is empty, do nothing
        if(this.root === null) return;

        const postOrderTraversal = (node) => {
            if(node.leftNode !== null) {
                postOrderTraversal(node.leftNode);
            };
            callback(node.value);
            if(node.rightNode !== null) {
                postOrderTraversal(node.rightNode);
            }
        }
        
        postOrderTraversal(this.root)
    }

    height(value) {
        //Step 1: find the node(current)
        //Edge Case: if BST is empty
        if(this.root === null) return undefined;

        let current = this.root;
        while(current !== null) {
            if(value === current.value) {
                break
            } else if(value < current.value) {
                current = current.leftNode;
            } else {
                current = current.rightNode;
            }
        }

        if(current === null) return undefined;
        
        //Step 2: calculate the height of current
        //Only consider existing node
        const heightOfNode = (node) => {
            //Base case: the recursion will loop until null-node
            if(node === null) return -1;

            return Math.max(heightOfNode(node.leftNode), heightOfNode(node.rightNode)) + 1
        }

        return heightOfNode(current);
    }

    depth(value) {
        //Edge Case: if BST is empty
        if(this.root === null) return undefined;

        let current = this.root;
        let depth = 0;
        while(current !== null) {
            if(value === current.value) {
                return depth;
            } else if(value < current.value) {
                depth++;
                current = current.leftNode;
            } else {
                depth++;
                current = current.rightNode;
            }
        }

        if(current === null) return undefined;
    }

    isBalanced() {
        //Predefined function
        const heightOfNode = (node) => {
            if(node === null) return -1;

            return Math.max(heightOfNode(node.leftNode), heightOfNode(node.rightNode)) + 1
        }

        //Edge Case:
        if(this.root === null) return true;

        const balanceCheck = (node) => {
            //Base Case: recursion will loop till null-node:
            if(node === null) return true;

            return ((Math.abs(heightOfNode(node.leftNode) - heightOfNode(node.rightNode)) <= 1) && balanceCheck(node.leftNode) && balanceCheck(node.rightNode));
        }

        return balanceCheck(this.root);
    }

    rebalance() {
        const valuesArray = [];
        this.levelOrderForEach(item => {
            valuesArray.push(item)
        });
        this.root = this.buildBalancedBinarySearchTree(valuesArray);
    }


}


export {Tree};