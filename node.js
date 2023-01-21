let offset = 0.5;

class Node {
  constructor(posx, posy, squareSize, target, type, visited) {
    this.pos = createVector(posx * squareSize, posy * squareSize);
    this.realPos = createVector(this.pos.x + squareSize / 2, this.pos.y + squareSize / 2);
    this.type = type;
    this.squareSize = squareSize;
    // Currently using manhattan distance
    this.proxToTarget = round(
      dist(posx, posy, posx, target.y) + dist(posx, posy, target.x, posy),
      2
    );
    if (type === nodeTypes.start) {
      this.col = 'green';
    } else if (type === nodeTypes.end) {
      this.col = 'red';
    } else if (type === nodeTypes.empty) {
      this.col = '#ffffff';
    } else {
      console.warning(`Invalid initializing node type : ${type}`);
    }
    this.visited = visited;
  }

  show() {
    push();
    fill(this.col);
    rect(this.pos.x, this.pos.y, this.squareSize - offset, this.squareSize - offset);
    stroke(0);
    pop();
  }

  setVisited() {
    self.visited = true;
  }
  setPath() {
    self.type = nodeTypes.path;
  }
  setObstacle() {
    self.types = nodeTypes.obstacle;
  }
}
