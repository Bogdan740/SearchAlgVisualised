const body = document.body;

const radioSearchAlg = document.getElementsByName('search-algorithm');
const radioDistanceType = document.getElementsByName('distance-type');

const allowDiagonals = document.getElementById('allow-diags');

const extraConfig = document.getElementById('alg-config');

// Change which algorithm is used to find a path
for (let i = 0; i < radioSearchAlg.length; i++) {
  radioSearchAlg[i].addEventListener('change', () => {
    extraConfig.innerText = `Advanced configs for ${radioSearchAlg[i].value}`;
    if (radioSearchAlg[i].value === 'A* Search') {
      algToUse = searchAlgorithms.aStar;
    } else if (radioSearchAlg[i].value === 'Breadth First Search') {
      algToUse = searchAlgorithms.bfs;
    }
    myp5.resetGrid();
  });
}

// Change the way that distance is calculated
for (let i = 0; i < radioDistanceType.length; i++) {
  radioDistanceType[i].addEventListener('change', () => {
    if (radioDistanceType[i].value === 'Manhattan') {
      distanceType = distanceTypes.manhattan;
    } else if (radioDistanceType[i].value === 'Euclidian') {
      distanceType = distanceTypes.euclidian;
    }
    myp5.resetGrid();
  });
}

allowDiagonals.addEventListener('change', () => {
  if (allowDiagonals.checked) {
    nbours = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
      [-1, -1],
    ];
  } else {
    nbours = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
  }
  myp5.resetGrid();
});
