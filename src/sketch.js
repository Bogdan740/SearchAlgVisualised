// TODO : consider adding some way to add some type to know what cell we are currently searching
const nodeTypes = {
  obstacle: 'obstacle',
  empty: 'empty',
  visited: 'visited',
  path: 'path',
  start: 'start',
  end: 'end',
};

const nbours = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  // [1, -1],
  // [-1, 1],
  // [1, 1],
  // [-1, -1],
];

let gridSize = 40; // Number of squares in one row/col of the N x N grid
let squareSize; // Side length of individual square in the grid
let nodes = [];
let startNode = [0, 0];
let targetNode = [gridSize - 1, gridSize - 1];

function setup() {
  createCanvas(windowWidth, windowHeight);
  squareSize = Math.floor(700 / gridSize);

  // Initialize the grid of nodes
  initNodes(nodes);
}

let pathway = [];

function draw() {
  aStar();
  drawNodes(nodes);

  if (pathway.length !== 0) {
    drawPathway(pathway);
  }

  // Adding obstacles
  if (mouseIsPressed === true) {
    let i = Math.floor(mouseX / squareSize);
    let j = Math.floor(mouseY / squareSize);
    if (isValidNbour(i, j, gridSize)) nodes[i][j].setType(nodeTypes.obstacle);
  }
}

function drawPathway(pathway) {
  push();
  fill('yellow');
  noStroke();
  for (let i = 0; i < pathway.length; i++) {
    ellipse(
      pathway[i].x * squareSize + squareSize / 2,
      pathway[i].y * squareSize + squareSize / 2,
      15
    );
  }
  pop();
  push();
  stroke('yellow');
  noFill();
  strokeWeight(4);
  beginShape();
  for (let i = 0; i < pathway.length; i++) {
    vertex(pathway[i].x * squareSize + squareSize / 2, pathway[i].y * squareSize + squareSize / 2);
  }
  endShape();
  pop();
}

function initNodes(nodes) {
  for (let i = 0; i < gridSize; i++) {
    let strip = [];
    for (let j = 0; j < gridSize; j++) {
      let type = nodeTypes.empty;
      if (i == startNode[0] && j == startNode[1]) {
        type = nodeTypes.start;
      } else if (i === targetNode[0] && j === targetNode[1]) {
        type = nodeTypes.end;
      }

      strip.push(
        new Node(i, j, squareSize, createVector(targetNode[0], targetNode[1]), type, false)
      );
    }
    nodes[i] = strip;
  }
}

function drawNodes(nodes) {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      nodes[i][j].show();
    }
  }
}

function resetNodes(nodes) {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      nodes[i][j].reset();
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    resetNodes(nodes);
    pathway = [];
    queue = [startNode];
    openList = [startNode];
    endFound = false;
  }
}
