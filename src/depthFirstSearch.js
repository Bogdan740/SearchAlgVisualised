const nbours = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function depthFirstSearch(grid, startNode, targetNode) {
  let queue = [startNode];
  let seenBefore = [];

  while (queue.length != 0) {
    for (let i = 0; i < queue.length; i++) {
      let node = queue.pop();
      if (seenBefore.includes(node)) {
        continue;
      }
      seenBefore.push(node);
      if (node[0] == targetNode[0] && node[1] == targetNode[1]) {
        console.log('FOUND NODE');
      }

      nbours.forEach((n) => {
        let nx = node[0] + n[0];
        let ny = node[1] + n[1];
        if (0 <= nx < gridSize && 0 <= ny < gridSize) {
          queue.push([nx, ny]);
        }
      });
    }
  }
}
