let offset = 0;

class GridNode {
  // TODO : remove target from constructor
  constructor(posx, posy, squareSize, target, type) {
    this.pos = myp5.createVector(posx, posy);
    this.realPos = myp5.createVector(this.pos.x * squareSize, this.pos.y * squareSize);
    this.type = type;
    this.squareSize = squareSize;

    this.proxToTarget = this.findDist(targetNode[0], targetNode[1]);

    if (type === nodeTypes.start) {
      this.g = 0;
    } else {
      this.g = null;
    }

    this.h = this.proxToTarget;
    this.previous = null;
  }

  show(useNoStroke = false) {
    myp5.push();
    let col = 'white';
    // TODO : Use a case statement
    switch (this.type) {
      case nodeTypes.start:
        col = 'green';
        break;
      case nodeTypes.end:
        col = 'red';
        break;
      case nodeTypes.visited:
        col = 'blue';
        break;
      case nodeTypes.obstacle:
        col = 'black';
        break;
    }

    myp5.fill(col);
    if (useNoStroke || this.type == nodeTypes.start || this.type == nodeTypes.end) {
      myp5.noStroke();
    }
    myp5.rect(this.realPos.x, this.realPos.y, this.squareSize - offset, this.squareSize - offset);
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
    this.proxToTarget = this.findDist(targetNode[0], targetNode[1]);
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

  moveTo(x, y) {
    this.realPos = myp5.createVector(x, y);
  }

  setIndex(x, y) {
    this.pos = myp5.createVector(x, y);
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
