const body = document.body;

const radioSearchAlg = document.getElementsByName('search-algorithm');
const radioDistanceType = document.getElementsByName('distance-type');

const allowDiagonalsCheckbox = document.getElementById('allow-diags');
handleDiagonalsCheckboxChange(allowDiagonalsCheckbox.checked);

const showPathCheckbox = document.getElementById('show-path');
const showPathLabel = document.getElementById('show-path-label');
handleShowPathCheckboxChange(showPathCheckbox.checked);

const extraConfig = document.getElementById('alg-config');

const algSpeedSlider = document.getElementById('alg-speed');
handleAlgSpeedSliderChange(algSpeedSlider.value);

const editModeCheckbox = document.getElementById('edit-mode');
handleChangeEditModeCheckbox(editModeCheckbox.checked);

// Change which algorithm is used to find a path
for (let i = 0; i < radioSearchAlg.length; i++) {
  radioSearchAlg[i].addEventListener('change', () => {
    const searchAlg = radioSearchAlg[i].value;
    extraConfig.innerText = `Advanced configs for ${searchAlg}`;
    if (searchAlg === searchAlgorithms.aStar || searchAlg === searchAlgorithms.greedyBestFirst) {
      showPathCheckbox.style.display = 'inline-block';
      showPathLabel.style.display = 'inline-block';
    } else {
      showPathCheckbox.style.display = 'none';
      showPathLabel.style.display = 'none';
    }

    algToUse = searchAlg;
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

allowDiagonalsCheckbox.addEventListener('change', () => {
  handleDiagonalsCheckboxChange(allowDiagonalsCheckbox.checked);
  myp5.resetGrid();
});

showPathCheckbox.addEventListener('change', () => {
  handleShowPathCheckboxChange(showPathCheckbox.checked);
  myp5.resetGrid();
});

algSpeedSlider.addEventListener('change', () => {
  handleAlgSpeedSliderChange(algSpeedSlider.value);
});

editModeCheckbox.addEventListener('change', () => {
  handleChangeEditModeCheckbox(editModeCheckbox.checked);
});

function handleDiagonalsCheckboxChange(isChecked) {
  if (isChecked) {
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
}

function handleShowPathCheckboxChange(isChecked) {
  showPathConfig = isChecked;
}

function handleAlgSpeedSliderChange(value) {
  setAlgorithmSpeed = true;
  algorithmSpeed = 11 - value;
}

function handleChangeEditModeCheckbox(isChecked) {
  drawingMode = !isChecked;
}
