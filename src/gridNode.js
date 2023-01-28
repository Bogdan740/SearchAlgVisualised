let offset = 0;

class GridNode {
  constructor(posx, posy, squareSize, target, type) {
    this.pos = myp5.createVector(posx, posy);
    this.realPos = myp5.createVector(this.pos.x * squareSize, this.pos.y * squareSize);
    this.type = type;
    this.squareSize = squareSize;

    // TODO : Add support for the euclidian distance
    this.proxToTarget =
      myp5.dist(posx, posy, posx, target.y) + myp5.dist(posx, posy, target.x, posy);

    if (type === nodeTypes.start) {
      this.g = 0;
    } else {
      this.g = null;
    }

    this.h = this.proxToTarget;
    this.previous = null;
  }

  show() {
    myp5.push();
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
    myp5.fill(col);
    myp5.rect(this.realPos.x, this.realPos.y, this.squareSize - offset, this.squareSize - offset);
    // stroke('black');
    // myp5.fill('black');
    // textSize(15);
    // text(
    //   `g : ${this.g}, h : ${this.h}, f : ${this.g + this.h}`,
    //   this.realPos.x + 30,
    //   this.realPos.y + 30
    // );
    myp5.pop();
  }

  setType(type) {
    if (this.type === 'end' || this.type === 'start') return;
    this.type = type;
  }
  clear() {
    this.type = nodeTypes.empty;
  }
  reset(resetObstacles = false) {
    if (this.type === nodeTypes.start) {
      this.g = 0;
    } else {
      this.g = null;
    }
    if (this.type === nodeTypes.obstacle && resetObstacles) this.clear;
    if (this.type === nodeTypes.end) {
      this.previous = null;
      this.h = this.proxToTarget;
    }

    if (this.type === nodeTypes.visited) {
      this.clear();
      this.h = this.proxToTarget;
      this.previous = null;
    }
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
    return Math.sqrt(
      myp5.dist(this.pos.x, this.pos.y, this.pos.x, other.pos.y) +
        myp5.dist(this.pos.x, this.pos.y, other.pos.x, this.pos.y) ** 2
    );
  }
}
