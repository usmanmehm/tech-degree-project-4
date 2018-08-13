// Tic Tac Toe Game!


const $startScreen = $('.screen-start');
const $boardScreen = $('.board');
const $startButton = $('.start-button');
const $boxes = $('.boxes');
let turn = 'player1';
const $player1 = $('#player1')[0];
const $player2 = $('#player2')[0];
const winScreen = document.getElementById('finish');

const $newGameButton = $('.new-game');

winScreen.style.display = 'none';
$boardScreen.hide();

let player1Name = '';
let player2Name = '';

$startButton.on('click', (e) => {
  player1Name = $player1Name.val();
  player2Name = $player2Name.val();

  if (player1Name === '' || player2Name === '') {
    alert('Please enter your names!');
  } else {
    $startScreen.hide();
    $boardScreen.show();
    $player1.className = 'players active';
    $('.player-one-name').html(player1Name);
    $('.player-two-name').html(player2Name);
  }
});

// Inserting text fields for players to enter their names
const $player1Name = $(`<input type="text">`);
const $input1Label = $(`<label class='input-label'>Enter name for Player 1: </label>`);
const $player2Name = $(`<input type="text">`);
const $input2Label = $(`<label class='input-label'>Enter name for Player 2: </label>`);

$player1Name.insertBefore($startButton);
$input1Label.insertBefore($player1Name);

$player2Name.insertBefore($startButton);
$input2Label.insertBefore($player2Name);
// end text fields

$newGameButton.on('click', resetGame);

$boxes.on('click', (e) => {
  let boxClicked = e.target;
  if (boxClicked.className === 'box') {
    boxClicked.className = turn === 'player1' ? 'box box-filled-1' : 'box box-filled-2';
    $(`#${turn}`)[0].className = 'players';
    turn = turn === 'player1' ? 'player2' : 'player1';
    $(`#${turn}`)[0].className = 'players active';
  }

  if( isFull() ){
    $boardScreen.hide();
    winScreen.style.display = '';
    winScreen.className = 'screen screen-win screen-win-tie';
    winScreen.querySelector('p').innerHTML = 'You tied!';
  }

  if (winHorizontally(1) || winVertically(1) || winDiagonally(1)) {
    $boardScreen.hide();
    winScreen.style.display = '';
    winScreen.className = 'screen screen-win screen-win-one';
    winScreen.querySelector('p').innerHTML = `${player1Name} is the Winner!`;
  }
  if (winHorizontally(2) || winVertically(2) || winDiagonally(2)) {
    $boardScreen.hide();
    winScreen.style.display = '';
    winScreen.className = 'screen screen-win screen-win-two';
    winScreen.querySelector('p').innerHTML = 'Winner';
  }

});

$boxes.on('mouseover', (e) => {
  let boxHovered = e.target;
  if(boxHovered.className === 'box' && turn === 'player1'){
    boxHovered.style.backgroundImage = "url('img/o.svg')";
  } else if (boxHovered.className === 'box' && turn === 'player2') {
    boxHovered.style.backgroundImage = "url('img/x.svg')";
  }
});

$boxes.on('mouseout', (e) => {
  let boxHovered = e.target;
  if(boxHovered.className === 'box'){
    boxHovered.style.backgroundImage = "";
  }
})

function isFull () {
  let boxFilled1 = $('.box-filled-1');
  let boxFilled2 = $('.box-filled-2');
  let totalBoxesFilled = boxFilled1.length + boxFilled2.length;
  return totalBoxesFilled === 9;
}

function resetGame () {
  let boxes = document.getElementsByClassName('box');

  $boardScreen.show();
  winScreen.style.display = 'none';
  turn = 'player1';
  $player1.className = 'players active';
  $player2.className = 'players';

  for (i=0; i < boxes.length ; i++) {
    boxes[i].className = 'box';
    boxes[i].style.backgroundImage = '';
  }
}

function winHorizontally (playerNumber) {
  let boxes = document.getElementsByClassName('box');
  let winningClass = `box box-filled-${playerNumber}`;
  const firstColumnIndex = [0,3,6];
  for (let i = 0; i < firstColumnIndex.length; i++) {
    let columnIndex = firstColumnIndex[i];
    if(boxes[columnIndex].className === winningClass && boxes[columnIndex+1].className === winningClass && boxes[columnIndex+2].className === winningClass) {
      return true;
    }
  }
  return false;
}

function winVertically (playerNumber) {
  let boxes = document.getElementsByClassName('box');
  let winningClass = `box box-filled-${playerNumber}`;
  for (let i = 0; i < 3; i++) {
    if(boxes[i].className === winningClass && boxes[i+3].className === winningClass && boxes[i+6].className === winningClass) {
      return true;
    }
  }
  return false;
}

function winDiagonally (playerNumber) {
  let boxes = document.getElementsByClassName('box');
  let winningClass = `box box-filled-${playerNumber}`;

  if(boxes[0].className === winningClass && boxes[4].className === winningClass && boxes[8].className === winningClass) {
    return true;
  }
  if(boxes[2].className === winningClass && boxes[4].className === winningClass && boxes[6].className === winningClass) {
    return true;
  }
  return false;
}
