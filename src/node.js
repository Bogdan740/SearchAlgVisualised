let offset = 0;

class Node {
  constructor(posx, posy, squareSize, target, type) {
    this.pos = createVector(posx, posy);
    this.realPos = createVector(this.pos.x * squareSize, this.pos.y * squareSize);
    this.type = type;
    this.squareSize = squareSize;

    // TODO : Add support for the euclidian distance
    this.proxToTarget = round(
      dist(posx, posy, posx, target.y) + dist(posx, posy, target.x, posy),
      2
    );

    if (type === nodeTypes.start) {
      this.g = 0;
    } else {
      this.g = null;
    }

    this.h = this.proxToTarget;
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
    // stroke('black');
    // fill('black');
    // textSize(15);
    // text(
    //   `g : ${this.g}, h : ${this.h}, f : ${this.g + this.h}`,
    //   this.realPos.x + 30,
    //   this.realPos.y + 30
    // );
    pop();
  }

  setType(type) {
    if (this.type != 'end' && this.type != 'start') {
      this.type = type;
    }
  }

  reset() {
    if (
      this.type !== nodeTypes.start &&
      this.type !== nodeTypes.end &&
      this.type !== nodeTypes.obstacle
    ) {
      this.type = nodeTypes.empty;
    }

    if (this.type === nodeTypes.start) {
      this.g = 0;
    } else {
      this.g = null;
    }

    this.h = this.proxToTarget;
    this.previous = null;
  }

  updateG(n) {
    this.g = n;
  }
  updateH(n) {
    this.h = n;
  }

  isTraversable() {
    return this.type !== nodeTypes.visited && this.type !== nodeTypes.obstacle;
  }

  isVisited() {
    return this.type === nodeTypes.start || this.type === nodeTypes.visited;
  }

  setPrevious(other) {
    if (this.type !== nodeTypes.start) {
      this.previous = other;
    }
  }

  findDist(other) {
    //TODO : add support for euclidian distance as well
    return round(
      Math.sqrt(
        dist(this.pos.x, this.pos.y, this.pos.x, other.pos.y) +
          dist(this.pos.x, this.pos.y, other.pos.x, this.pos.y) ** 2
      ),
      2
    );
  }
}
