const nodeTypes = {
  obstacle: 'obstacle',
  empty: 'empty',
  visited: 'visited',
  path: 'path',
  start: 'start',
  end: 'end',
};

let gridSize = 5; // Number of squares in one row/col of the N x N grid
let squareSize; // Side length of individual square in the grid
let nodes = [];
let node;

function setup() {
  createCanvas(windowWidth, windowHeight);
  squareSize = Math.floor(700 / gridSize);

  // Initialize the grid of nodes
  for (let i = 0; i < gridSize; i++) {
    let strip = [];
    for (let j = 0; j < gridSize; j++) {
      let type = nodeTypes.empty;
      if (i == 0 && j == 0) {
        type = nodeTypes.start;
      } else if (i == gridSize - 1 && j == gridSize - 1) {
        type = nodeTypes.end;
      }

      strip.push(new Node(i, j, squareSize, createVector(1, 1), type));
    }
    nodes.push(strip);
  }
}

const nbours = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let queue = [[0, 0, null]];
let path = [];
function draw() {
  // BFS
  for (let i = 0; i < queue.length; i++) {
    let toCheck = queue.shift();
    let nodeToCheck = nodes[toCheck[0]][toCheck[1]];
    if (nodeToCheck.type === nodeTypes.visited) continue;
    nodeToCheck.setType(nodeTypes.visited);
    nodeToCheck.previous = toCheck[2];
    nbours.forEach((nbour) => {
      let nx = nodeToCheck.pos.x + nbour[0];
      let ny = nodeToCheck.pos.y + nbour[1];

      if (0 <= nx && nx < gridSize && 0 <= ny && ny < gridSize) {
        if (nodes[nx][ny].type !== nodeTypes.visited) {
          queue.push([nx, ny, nodeToCheck]);
        }
      }
    });
  }

  if (queue.length == 0 && path.length == 0) {
    // Find the path starting from the end node and working backwards, store it in path
    let currentNode = nodes[gridSize - 1][gridSize - 1];
    while (currentNode) {
      path.push(currentNode.pos);
      currentNode = currentNode.previous;
    }
  }

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      nodes[i][j].show();
    }
  }

  if (path.length != 0) {
    for (let i = 0; i < path.length; i++) {
      push();
      fill('yellow');
      ellipse(path[i].x * squareSize, path[i].y * squareSize, 10);
      pop();
    }
  }
}
