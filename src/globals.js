let gridSize = 20; // Number of squares in one row/col of the N x N grid
let squareSize; // Side length of individual square in the grid
let nodes = [];
let startNode = [0, 0];
let targetNode = myp5.createVector(gridSize - 1, gridSize - 1);
let touchedWhileMousePressed = [];
let pathway = [];
let endFound = false;
let allowDiags;

let [w, h] = [800, 800];
const nodeTypes = {
  obstacle: 'obstacle',
  empty: 'empty',
  visited: 'visited',
  path: 'path',
  start: 'start',
  end: 'end',
};

const searchAlgorithms = {
  aStar: 'aStar',
  bfs: 'bfs',
};

const distanceTypes = {
  manhattan: 'manhattan',
  euclidian: 'euclidian',
};

let nbours = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

let algToUse = searchAlgorithms.aStar;
let distanceType = distanceTypes.manhattan;