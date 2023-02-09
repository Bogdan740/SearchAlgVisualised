const body = document.body;

const radioSearchAlg = document.getElementsByName('search-algorithm');
const radioDistanceType = document.getElementsByName('distance-type');

const extraConfig = document.getElementById('alg-config');

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
