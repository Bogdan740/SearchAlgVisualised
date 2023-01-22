let queue = [[...startNode, null]];

function resetDFS() {
  queue = [];
}
function breadthFirstSearch(nodes) {
  for (let i = 0; i < queue.length; i++) {
    let [cx, cy, previousNode] = queue.shift();
    let nodeToCheck = nodes[cx][cy];

    if (nodeToCheck.type === nodeTypes.visited || nodeToCheck.type === nodeTypes.obstacle) {
      continue;
    }
    nodeToCheck.setType(nodeTypes.visited);
    if (nodeToCheck.type !== nodeTypes.start) {
      nodeToCheck.previous = previousNode;
    }
    if (nodeToCheck.type === nodeTypes.end) {
      queue = [];
      break;
    }
    nbours.forEach((nbour) => {
      let nx = nodeToCheck.pos.x + nbour[0];
      let ny = nodeToCheck.pos.y + nbour[1];

      if (isValidNbour(nx, ny, gridSize) && nodes[nx][ny].isTraversable) {
        queue.push([nx, ny, nodeToCheck]);
      }
    });
  }

  if (queue.length == 0 && pathway.length == 0) {
    // Find the pathway starting from the end node and working backwards, store it in pathway
    findPathway(targetNode[0], targetNode[1]);
  }
}

function isValidNbour(nx, ny, gridSize) {
  return 0 <= nx && nx < gridSize && 0 <= ny && ny < gridSize;
}

function findPathway(x, y) {
  let currentNode = nodes[x][y];
  while (currentNode) {
    pathway.push(currentNode.pos);
    currentNode = currentNode.previous;
  }
}
