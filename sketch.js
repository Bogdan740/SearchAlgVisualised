const nodeTypes = {
  obstacle: 'obstacle',
  empty: 'empty',
  path: 'path',
  start: 'start',
  end: 'end',
};

let gridSize = 10; // Number of squares in one row/col of the N x N grid
let squareSize; // Side length of individual square in the grid
let nodes = [];
let node;

function setup() {
  createCanvas(windowWidth, windowHeight);
  squareSize = Math.floor(windowWidth / gridSize) - 50;

  for (let i = 0; i < gridSize; i++) {
    let strip = [];
    for (let j = 0; j < gridSize; j++) {
      let type = nodeTypes.empty;
      if (i == 0 && j == 0) {
        type = nodeTypes.start;
      } else if (i == gridSize - 1 && j == gridSize - 1) {
        type = nodeTypes.end;
      }

      strip.push(new Node(i, j, squareSize, createVector(1, 1), type, false));
    }
    nodes.push(strip);
  }

  console.log(nodes);
}

function draw() {
  background(255, 255, 255);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      nodes[i][j].show();
    }
  }
}
