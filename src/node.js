let offset = 0;

class Node {
  constructor(posx, posy, squareSize, target, type) {
    this.pos = createVector(posx, posy);
    this.realPos = createVector(
      this.pos.x * squareSize + squareSize / 2,
      this.pos.y * squareSize + squareSize / 2
    );
    this.type = type;
    this.squareSize = squareSize;
    // Manhattan distance
    this.proxToTarget = round(
      dist(posx, posy, posx, target.y) + dist(posx, posy, target.x, posy),
      2
    );
    this.previous = null;
  }

  show() {
    push();
    let col = 'white';
    // TODO : Use a case statement
    if (this.type == nodeTypes.start) {
      col = 'green';
    } else if (this.type === nodeTypes.end) {
      col = 'red';
    } else if (this.type === nodeTypes.visited) {
      col = 'blue';
    } else if (this.type === nodeTypes.obstacle) {
      col = 'black';
    }
    fill(col);
    rect(this.realPos.x, this.realPos.y, this.squareSize - offset, this.squareSize - offset);
    pop();
  }

  setType(type) {
    if (this.type != 'end' && this.type != 'start') {
      this.type = type;
    }
  }
}
