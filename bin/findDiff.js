import { treeCreate } from "./tree.js";
// import all methods for work with treeNode 

// THIS MAIN func that create diff recursive in obj
// attention SEE in STD task)))

export default function findDiff(dataOne, dataTwo) {
  
  const firstTree = treeCreate(dataOne);
  const secondTree = treeCreate(dataTwo);

  const compareTrees = (nodeOne, nodeTwo) => {
    return 'diff';
  }

  return compareTrees(firstTree, secondTree);
};
