let offset = 0;

class GridNode {
  constructor(posx, posy, squareSize, target, type) {
    this.pos = myp5.createVector(posx, posy);
    this.realPos = myp5.createVector(this.pos.x * squareSize, this.pos.y * squareSize);
    this.type = type;
    this.squareSize = squareSize;

    this.proxToTarget = this.findDist(targetNode.x, targetNode.y);

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
    // myp5.stroke('black');
    // myp5.fill('black');
    // myp5.textSize(11);
    // myp5.text(
    //   `g : ${this.g}, h : ${this.h}, f : ${this.g + this.h}`,
    //   this.realPos.x + 15,
    //   this.realPos.y + 15
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
    this.proxToTarget = this.findDist(targetNode.x, targetNode.y);
    this.h = this.proxToTarget;
    this.previous = null;
    this.g = null;
    if (this.type === nodeTypes.start) {
      this.g = 0;
    } else {
      this.g = null;
    }

    if ((this.type === nodeTypes.obstacle && resetObstacles) || this.type == nodeTypes.visited)
      this.clear();
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

  findDist(x, y) {
    if (distanceType === distanceTypes.manhattan) {
      return (
        myp5.dist(this.pos.x, this.pos.y, this.pos.x, y) +
        myp5.dist(this.pos.x, this.pos.y, x, this.pos.y)
      );
    } else if (distanceType === distanceTypes.euclidian) {
      return myp5.round(myp5.dist(this.pos.x, this.pos.y, x, y), 2);
    }
  }
}