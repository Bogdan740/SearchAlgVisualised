const openListSet = new Set();
openListSet.add(hashToStr(startNode));

function aStar(nodes, pickFunction = pickAStar) {
  if (!endFound) {
    const currentPos = pickFunction(openListSet);
    const currentNode = nodes[currentPos[0]][currentPos[1]];
    currentNode.setType(nodeTypes.visited);
    openListSet.delete(hashToStr(currentPos));

    if (currentNode.type === nodeTypes.end) {
      endFound = true;
    }
    nbours.forEach((nbour) => {
      const nx = currentPos[0] + nbour[0];
      const ny = currentPos[1] + nbour[1];

      if (isValidNbour(nx, ny, gridSize) && nodes[nx][ny].isTraversable()) {
        const curNbour = nodes[nx][ny];
        const notInOpenList = !inOpenList([nx, ny]);
        if (
          currentNode.g + currentNode.findDist(curNbour.pos.x, curNbour.pos.y) < curNbour.g ||
          notInOpenList
        ) {
          curNbour.setPrevious(currentNode);
          curNbour.g = currentNode.g + currentNode.findDist(curNbour.pos.x, curNbour.pos.y);
          d11 = performance.now();
          if (notInOpenList) {
            openListSet.add(hashToStr([nx, ny]));
          }
        }
      }
    });
    if (showPathConfig) {
      findPathway(currentPos[0], currentPos[1]);
    }
  } else {
    if (pathway.length === 0) {
      findPathway(targetNode[0], targetNode[1]);
    }
  }
}

function inOpenList(item) {
  return openListSet.has(hashToStr(item));
}

function hashToStr(item) {
  return `${item[0]}-${item[1]}`;
}

function pickAStar(collection) {
  let smallestFCost = Infinity;
  let smallestHCost = undefined;
  let positionPicked = undefined;

  collection.forEach((item) => {
    const [x, y] = item.split('-').map((it) => parseInt(it));
    const node = nodes[x][y];
    const fCost = node.g + node.h;
    if (fCost < smallestFCost || (fCost === smallestFCost && node.h < smallestHCost)) {
      smallestFCost = fCost;
      smallestHCost = node.h;
      positionPicked = [x, y];
    }
  });

  return positionPicked;
}

function pickGreedyBestFirst(collection) {
  let smallestHCost = Infinity;
  let positionPicked = undefined;

  collection.forEach((item) => {
    const [x, y] = item.split('-').map((it) => parseInt(it));
    const node = nodes[x][y];
    if (node.h < smallestHCost) {
      smallestHCost = node.h;
      positionPicked = [x, y];
    }
  });

  return positionPicked;
}
