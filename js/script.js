// Tic Tac Toe Game!


!function () {
  const $startScreen = $('.screen-start');
  const $boardScreen = $('.board');
  const winScreen = document.getElementById('finish');
  const $startButton = $('.start-button');
  const $newGameButton = $('.new-game');
  const $boxes = $('.boxes');
  const $player1 = $('#player1')[0];
  const $player2 = $('#player2')[0];
  let turn = 1;
  let player1Name = '';
  let player2Name = '';

  let board = ['','','','','','','','',''];

  winScreen.style.display = 'none';
  $boardScreen.hide();

  // Inserting text fields for players to enter their names
  const $player1Name = $(`<input type="text">`);
  const $input1Label = $(`<label class='input-label'>Enter name for Player 1: </label>`);
  const $player2Name = $(`<input type="text">`);
  const $input2Label = $(`<label class='input-label'>Enter name for Player 2 (if applicable): </label>`);

  $player1Name.insertBefore($startButton);
  $input1Label.insertBefore($player1Name);

  $player2Name.insertBefore($startButton);
  $input2Label.insertBefore($player2Name);
  // end text fields

  //inserting play with computer button
  let computerButton = document.createElement('a');
  computerButton.href = '#';
  computerButton.className = "button computer-button";
  computerButton.innerHTML = 'Play with Computer';
  document.querySelector('.screen-start header').appendChild(computerButton);

// If a person clicks start game ---
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

// if a person wants to play with the computer, this event listener will set the class of the
// board to computer-active and player 2's name will be set to Computer
  computerButton.addEventListener('click', () => {
    $boardScreen[0].className = "board computer-active";
    player1Name = $player1Name.val();
    player2Name = 'Computer';

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

 // ----- DOING A TURN! ----- //
  let clickEnabled = true; // this variable is needed in case computer is playing -- don't want the user to take the computer's turn
  $boxes.on('click', (e) => {
    if (clickEnabled) {
      let boxClicked = e.target;
      if (boxClicked.className === 'box') {
        turn = doTurn(turn, boxClicked, board); //this function will set the class of the box clicked, and switch turns to the other player
      }
      checkForWin(); // this function will check for a win, and hide/show the appropriate pages. It also returns true if a player has won
      if (isFull(board) && !checkForWin()) {
        $boardScreen.hide();
        winScreen.style.display = '';
        winScreen.className = 'screen screen-win screen-win-tie';
        winScreen.querySelector('p').innerHTML = 'You tied!';
      }
      if ($boardScreen[0].className === 'board computer-active' && !isFull(board) && !checkForWin()) {
        clickEnabled = false; // need to disable clicking while the computer does its turn
        computerTurn();
        setTimeout( () => {
          clickEnabled = true;
        }, 1000);
      }
  }
  });

  $boxes.on('mouseover', (e) => {
    let boxHovered = e.target;
    if (clickEnabled) {
      if(boxHovered.className === 'box' && turn === 1){
        boxHovered.style.backgroundImage = "url('img/o.svg')";
      } else if (boxHovered.className === 'box' && turn === 2) {
        boxHovered.style.backgroundImage = "url('img/x.svg')";
      }
  }
  });

  $boxes.on('mouseout', (e) => {
    let boxHovered = e.target;
    if(boxHovered.className === 'box'){
      boxHovered.style.backgroundImage = "";
    }
  })
  // pressing the new game button will reset the game
  $newGameButton.on('click', resetGame);

  function doTurn (turn, boxSelected, board) {
    boxSelected.className = `box box-filled-${turn}`;
    board[boxSelected.id] = turn;
    $(`#player${turn}`)[0].className = 'players';
    turn = turn === 1 ? 2 : 1;
    $(`#player${turn}`)[0].className = 'players active';
    return turn;
  }

  function pseudoTurn (turn, boxSelected, board) {
    board[boxSelected.id] = turn;
    turn = turn === 1 ? 2 : 1;
    return turn;
  }


  function resetGame () {
    let boxes = document.getElementsByClassName('box');

    $boardScreen.show();
    winScreen.style.display = 'none';
    turn = 1;
    $player1.className = 'players active';
    $player2.className = 'players';

    for (i=0; i < boxes.length ; i++) {
      boxes[i].className = 'box';
      boxes[i].style.backgroundImage = '';
    }

    board = ['','','','','','','','',''];
  }

  function winHorizontally (playerNumber, board) {
    const firstColumnIndex = [0,3,6];
    for (let i = 0; i < firstColumnIndex.length; i++) {
      let columnIndex = firstColumnIndex[i];
      if(board[columnIndex] === playerNumber && board[columnIndex+1] === playerNumber && board[columnIndex+2] === playerNumber) {
        return true;
      }
    }
    return false;
  }

  function winVertically (playerNumber, board) {
    for (let i = 0; i < 3; i++) {
      if(board[i] === playerNumber && board[i+3] === playerNumber && board[i+6] === playerNumber) {
        return true;
      }
    }
    return false;
  }

  function winDiagonally (playerNumber, board) {

    if(board[0] === playerNumber && board[4] === playerNumber && board[8] === playerNumber) {
      return true;
    }
    if(board[2] === playerNumber && board[4] === playerNumber && board[6] === playerNumber) {
      return true;
    }
    return false;
  }

  function checkForWin() {
    if (winHorizontally(1, board) || winVertically(1, board) || winDiagonally(1, board)) {
      $boardScreen.hide();
      winScreen.style.display = '';
      winScreen.className = 'screen screen-win screen-win-one';
      winScreen.querySelector('p').innerHTML = `${player1Name} is the Winner!`;
      return true;
    }
    else if (winHorizontally(2, board) || winVertically(2, board) || winDiagonally(2, board)) {
      $boardScreen.hide();
      winScreen.style.display = '';
      winScreen.className = 'screen screen-win screen-win-two';
      winScreen.querySelector('p').innerHTML = `${player2Name} is the Winner!`;
      return true;
    }
    return false;
  }

  function isFull (board) {
    let filledBoxes = 0;
    for (i = 0; i < board.length; i++) {
      if(board[i]) {
        filledBoxes += 1;
      }
    }
    return filledBoxes === 9;
  }

  function computerTurn() {
    let boxes = document.getElementsByClassName('box');
    let randomBox = Math.floor(Math.random()*9); //will generate a random number
    while (board[randomBox]) {// will check if that box already has been clicked
      randomBox = Math.floor(Math.random()*9); //keeps generating random numbers until a clear box is found
    }

    setTimeout(function() {
      turn = doTurn(2, boxes[randomBox], board);
      checkForWin();
    }, 1000);

  }
  function score(turn, board) {
    if (winHorizontally(2, board) || winVertically(2, board) || winDiagonally(2, board)) {
      return 10;
    }
    else if(winHorizontally(1, board) || winVertically(1, board) || winDiagonally(1, board)) {
      return -10;
    }
    else {
      return 0;
    }
  }

  function miniMax (turn, board) {
    let currentBoard = board;
    if (isFull(currentBoard) || winHorizontally(turn, currentBoard) || winVertically(turn, currentBoard) || winDiagonally(turn, currentBoard)) {
      return score(turn,board);
    }
    let scores = [];
    let moves = [];
    for (let i = 0; i < board.length; i++) {
      if(!currentBoard[i]) {
        moves.push(i);
        currentBoard[i] = turn;
        turn = turn === 1 ? 2 : 1;
        scores.push(miniMax(turn, currentBoard));
      }
    }
    console.log(scores);
    // console.log(currentBoard);
    if (turn === 2) {
      let totalScore = scores.reduce((sum, curr) => sum + curr, 0);
      // console.log(totalScore);
    }
  }

  // miniMax(1,board);

}();
