const body = document.body;

const radio = document.getElementsByName('search-algorithm');
const extraConfig = document.getElementById('alg-config');
for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener('change', () => {
    extraConfig.innerText = `Advanced configs for ${radio[i].value}`;
    if (radio[i].value === 'A* Search') {
      algToUse = searchAlgorithms.aStar;
    } else if (radio[i].value === 'Breadth First Search') {
      algToUse = searchAlgorithms.bfs;
    }
    myp5.resetGrid();
  });
}
