let endFound = false;

let openList = [startNode];

function aStar() {
  if (!endFound) {
    let [currentPos, openListIndex] = pick(openList);
    let current = nodes[currentPos[0]][currentPos[1]];
    current.setType(nodeTypes.visited);
    openList.splice(openListIndex, 1);

    if (current.type === nodeTypes.end) {
      endFound = true;
    }

    nbours.forEach((nbour) => {
      let nx = currentPos[0] + nbour[0];
      let ny = currentPos[1] + nbour[1];

      if (
        isValidNbour(nx, ny, gridSize) &&
        nodes[nx][ny].isTraversable() &&
        !nodes[nx][ny].isVisited()
      ) {
        let curNbour = nodes[nx][ny];
        if (
          (inArrofArr([nx, ny], openList) && current.g + current.findDist(curNbour) < curNbour.g) ||
          !inArrofArr([nx, ny], openList)
        ) {
          curNbour.setPrevious(current);
          curNbour.g = current.g + current.findDist(curNbour);
          if (!inArrofArr([nx, ny], openList)) {
            openList.push([nx, ny]);
          }
        }
      }
    });
  } else {
    if (pathway.length === 0) {
      findPathway(targetNode[0], targetNode[1]);
    }
  }
}

function inArrofArr(item, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === item[0] && arr[i][1] === item[1]) {
      return true;
    }
  }
}

function pick(arr) {
  let smallestFCost = Infinity;
  let smallestGCost = undefined;
  let smallestHCost = undefined;
  let nodePicked = undefined;
  let indexToReturn = undefined;

  for (let i = 0; i < arr.length; i++) {
    let [x, y] = arr[i];
    let node = nodes[x][y];
    if (
      node.g + node.h < smallestFCost ||
      (node.g + node.h === smallestFCost && node.h < smallestHCost)
    ) {
      smallestFCost = node.g + node.h;
      smallestGCost = node.g;
      smallestHCost = node.h;
      nodePicked = arr[i];
      indexToReturn = i;
    }
  }

  return [nodePicked, indexToReturn];
}
