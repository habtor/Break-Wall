// board
let board;
let boardWidth = 800;
let boardHeight = 800;
let context;

// player
let playerWidth = 80;
let playerHeight = 10;
let playerSpeedX = 10;

// ball
let ballWidth = 10;
let ballHight = 10;
let ballSpeedX = 5;
let ballSpeedY = 5;

let ball = {
  x: Math.floor(Math.random() * 500),
  y: Math.floor(Math.random() * 400),
  width: ballWidth,
  height: ballHight,
  speedX: ballSpeedX,
  speedY: ballSpeedY,
};

// bloks
let blockArray = [];
let blockArray2 = [];
let blockWidth = 7;
let blockHeight = 7;
let blockColumnCount = 8;
let blockRowCount = 1;
let blockMaxRow = 10;
let blockCount = 0;
let blockCount2 = 0;

// starting block
let blocX = 15;
let blocY = 15;

let player = {
  x: boardWidth / 2 - playerWidth / 2,
  y: boardHeight - playerHeight - 10,
  width: playerWidth,
  height: playerHeight,
  speedX: playerSpeedX,
};

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  // drawe player
  context.fillStyle = "red";
  context.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(update);
  document.addEventListener("mousemove", movePlayer);

  // create blocks
  createBlcks();
  createLungeShape();
};

// update board
function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, boardWidth, boardHeight);
  // player
  context.fillStyle = "red";
  context.fillRect(player.x, player.y, player.width, player.height);

  // ball
  context.fillStyle = "white";
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // ball collision with walls
  if (ball.y < 0) {
    ball.speedY *= -1;
  } else if (ball.x < 0 || ball.x + ball.width >= boardWidth) {
    ball.speedX = -ball.speedX;
  } else if (ball.y + ball.height >= boardHeight) {
    // game over
    // ball.speedY = -ball.speedY;
  }

  // ball collision with player
  if (topCollision(ball, player) || bottomCollision(ball, player)) {
    ball.speedY *= -1;
  }

  // block draw
  context.fillStyle = "white";
  for (let i = 0; i < blockArray.length; i++) {
    let block = blockArray[i];
    if (!block.break) {
      if (topCollision(ball, block) || bottomCollision(ball, block)) {
        ball.speedY *= -1;
        block.break = true;
        blockCount--;
        // if (blockCount === 0) {
        //   alert("You win");
        //   document.location.reload();
        // }
      }
      context.fillRect(block.x, block.y, block.width, block.height);
    }
  }

  for (let i = 0; i < blockArray2.length; i++) {
    let block = blockArray2[i];
    if (!block.break) {
      if (topCollision(ball, block) || bottomCollision(ball, block)) {
        ball.speedY *= -1;
        block.break = true;
        blockCount2--;
        // if (blockCount === 0) {
        //   alert("You win");
        //   document.location.reload();
        // }
      }
      context.fillRect(block.x, block.y, block.width, block.height);
    }
  }
}

// check if player is out of board
function outOfBoard(xLocation) {
  return xLocation < 0 || xLocation + player.width > boardWidth;
}

// move player
function movePlayer(e) {
  let nextX = e.clientX - board.offsetLeft - player.width / 2;
  if (!outOfBoard(nextX)) {
    player.x = nextX;
  }
}

// detect collision
function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function topCollision(ball, block) {
  return detectCollision(ball, block) && ball.y + ball.height >= block.y;
}

function bottomCollision(ball, block) {
  return detectCollision(ball, block) && block.y + block.height >= ball.y;
}

function leftCollision(ball, block) {
  return detectCollision(ball, block) && ball.x + ball.width >= block.x;
}

function rightCollision(ball, block) {
  return detectCollision(ball, block) && block.x + block.width >= ball.x;
}

// create blocks
function createBlcks() {
  blockArray = [];
  for (let c = 0; c < blockColumnCount; c++) {
    for (let r = 0; r < blockRowCount; r++) {
      let block = {
        x: 200 + c * blockWidth + c * 10,
        y: 200 + r * blockHeight + r * 10,
        width: blockWidth,
        height: blockHeight,
        break: false,
      };
      blockArray.push(block);
    }
  }
  blockCount = blockArray.length;
}

function createLungeShape() {
  blockArray2 = [];
  for (let c = 0; c < 10; c++) {
    for (let r = 0; r < 15; r++) {
      let block = {
        x: blocX + c * blockWidth + c * 1,
        y: blocY + r * blockHeight + r * 1,
        width: blockWidth,
        height: blockHeight,
        break: false,
      };
      blockArray2.push(block);
    }
  }
  blockCount = blockArray.length;
}
