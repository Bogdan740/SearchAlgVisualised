let sketch = function (p) {
  p.setup = function () {
    p.createCanvas(w, h);
    p.pixelDensity(2);
    squareSize = Math.floor(w / gridSize);
    // Initialize the grid of nodes
    initNodes(nodes);
    p.frameRate(120);
  };
  p.draw = function () {
    p.background(255);
    let fps = p.frameRate();
    p.fill(0);
    p.stroke(0);
    p.text('FPS: ' + fps.toFixed(0), 10, p.height - 10);

    if (algToUse === searchAlgorithms.aStar) {
      aStar(nodes);
    } else if (algToUse === searchAlgorithms.bfs) {
      breadthFirstSearch(nodes);
    } else if (algToUse === searchAlgorithms.greedyBestFirst) {
      aStar(nodes, pickGreedyBestFirst);
    }

    drawNodes(nodes);
    if (pathway.length !== 0) {
      drawPathway(pathway);
    }

    if (p.mouseIsPressed === true && !movingStartNode && !movingTargetNode) {
      let i = Math.floor(p.mouseX / squareSize);
      let j = Math.floor(p.mouseY / squareSize);
      if (isValidNbour(i, j, gridSize) && !touchedWhileMousePressed.includes(nodes[i][j])) {
        nodes[i][j].setType(nodeTypes.obstacle);
        touchedWhileMousePressed.push(nodes[i][j]);
      }
    }

    if (movingStartNode) {
      nodes[startNode[0]][startNode[1]].moveTo(
        p.mouseX - squareSize / 2,
        p.mouseY - squareSize / 2
      );
    }
    if (movingTargetNode) {
      nodes[targetNode[0]][targetNode[1]].moveTo(
        p.mouseX - squareSize / 2,
        p.mouseY - squareSize / 2
      );
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
        } else if (i === targetNode[0] && j === targetNode[1]) {
          type = nodeTypes.end;
        }
        strip.push(
          new GridNode(i, j, squareSize, p.createVector(targetNode[0], targetNode[1]), type, false)
        );
      }
      nodes[i] = strip;
    }
  }
  function drawNodes() {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (nodes[i][j].type != nodeTypes.start && nodes[i][j].type != nodeTypes.end)
          nodes[i][j].show();
      }
    }
    // Do this so that start and end nodes are always drawn on top of everything
    nodes[startNode[0]][startNode[1]].show();
    nodes[targetNode[0]][targetNode[1]].show();
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
    openListSet.clear();
    openListSet.add(hashToStr(startNode));
  };

  p.keyPressed = () => {
    // Reset the grid when pressing the spacebar
    if (p.keyCode === 32) {
      p.resetGrid();
    }
  };
  function changeStartNodePositionTo(x, y) {
    if (startNode[0] == x && startNode[1] == y) {
      nodes[startNode[0]][startNode[1]].realPos = myp5.createVector(
        startNode[0] * squareSize,
        startNode[1] * squareSize
      );
      return;
    }
    nodes[x][y].type = nodeTypes.start;

    nodes[startNode[0]][startNode[1]] = new GridNode(
      startNode[0],
      startNode[1],
      squareSize,
      undefined,
      nodeTypes.empty
    );

    startNode = [x, y];
  }

  function changeTargetNodePositionTo(x, y) {
    if (targetNode[0] == x && targetNode[1] == y) {
      nodes[targetNode[0]][targetNode[1]].realPos = myp5.createVector(
        targetNode[0] * squareSize,
        targetNode[1] * squareSize
      );
      return;
    }
    nodes[x][y].type = nodeTypes.end;

    nodes[targetNode[0]][targetNode[1]] = new GridNode(
      targetNode[0],
      targetNode[1],
      squareSize,
      undefined,
      nodeTypes.empty
    );

    targetNode = [x, y];
  }

  p.mousePressed = (mouse) => {
    const startNodeObject = nodes[startNode[0]][startNode[1]];
    const startNodePosX = startNodeObject.realPos.x;
    const startNodePosY = startNodeObject.realPos.y;

    const targetNodeObject = nodes[targetNode[0]][targetNode[1]];
    const targetNodePosX = targetNodeObject.realPos.x;
    const targetNodePosY = targetNodeObject.realPos.y;

    if (
      startNodePosX < mouse.x &&
      mouse.x <= startNodePosX + squareSize &&
      startNodePosY < mouse.y &&
      mouse.y <= startNodePosY + squareSize
    ) {
      movingStartNode = true;
    } else if (
      targetNodePosX < mouse.x &&
      mouse.x <= targetNodePosX + squareSize &&
      targetNodePosY < mouse.y &&
      mouse.y <= targetNodePosY + squareSize
    ) {
      movingTargetNode = true;
    }
  };

  p.mouseReleased = (mouse) => {
    touchedWhileMousePressed = [];
    if (movingStartNode) {
      const x = Math.floor((mouse.x - squareSize / 2) / squareSize);
      const y = Math.floor((mouse.y - squareSize / 2) / squareSize);
      changeStartNodePositionTo(x, y);
      movingStartNode = false;
      p.resetGrid();
    }
    if (movingTargetNode) {
      const x = Math.floor((mouse.x - squareSize / 2) / squareSize);
      const y = Math.floor((mouse.y - squareSize / 2) / squareSize);
      changeTargetNodePositionTo(x, y);
      movingTargetNode = false;
      p.resetGrid();
    }
  };
};

let myp5 = new p5(sketch, 'ting');
