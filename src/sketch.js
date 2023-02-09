let sketch = function (p) {
  p.setup = function () {
    p.createCanvas(w, h);
    squareSize = Math.floor(w / gridSize);
    // Initialize the grid of nodes
    initNodes(nodes);
    // p.frameRate(0.5);
  };
  p.draw = function () {
    if (algToUse === searchAlgorithms.aStar) {
      aStar(nodes);
      drawNodes(nodes);
      if (pathway.length !== 0) {
        drawPathway(pathway);
      }
    } else if (algToUse === searchAlgorithms.bfs) {
      breadthFirstSearch(nodes);
      drawNodes(nodes);
      if (pathway.length !== 0) {
        drawPathway(pathway);
      }
    }

    if (p.mouseIsPressed === true) {
      let i = Math.floor(p.mouseX / squareSize);
      let j = Math.floor(p.mouseY / squareSize);
      if (isValidNbour(i, j, gridSize) && !touchedWhileMousePressed.includes(nodes[i][j])) {
        nodes[i][j].setType(nodeTypes.obstacle);
        touchedWhileMousePressed.push(nodes[i][j]);
      }
    }
  };
  function drawPathway(pathway) {
    p.push();
    p.fill('yellow');
    p.noStroke();
    for (let i = 0; i < pathway.length; i++) {
      p.ellipse(
        pathway[i].x * squareSize + squareSize / 2,
        pathway[i].y * squareSize + squareSize / 2,
        15
      );
    }
    p.pop();
    p.push();
    p.stroke('yellow');
    p.noFill();
    p.strokeWeight(4);
    p.beginShape();
    for (let i = 0; i < pathway.length; i++) {
      p.vertex(
        pathway[i].x * squareSize + squareSize / 2,
        pathway[i].y * squareSize + squareSize / 2
      );
    }
    p.endShape();
    p.pop();
  }
  function initNodes(nodes) {
    for (let i = 0; i < gridSize; i++) {
      let strip = [];
      for (let j = 0; j < gridSize; j++) {
        let type = nodeTypes.empty;
        if (i == startNode[0] && j == startNode[1]) {
          type = nodeTypes.start;
        } else if (i === targetNode.x && j === targetNode.y) {
          type = nodeTypes.end;
        }
        strip.push(
          new GridNode(i, j, squareSize, p.createVector(targetNode.x, targetNode.y), type, false)
        );
      }
      nodes[i] = strip;
    }
  }
  function drawNodes() {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        nodes[i][j].show();
      }
    }
  }
  function resetNodes() {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        nodes[i][j].reset();
      }
    }
  }
  p.resetGrid = function () {
    resetNodes();
    pathway = [];
    endFound = false;
    queue = [startNode];
    openList = [startNode];
  };

  p.keyPressed = function () {
    // Reset the grid when pressing the spacebar
    if (p.keyCode === 32) {
      p.resetGrid();
    }
  };
  function mouseReleased() {
    touchedWhileMousePressed = [];
  }
};

let myp5 = new p5(sketch, 'ting');
