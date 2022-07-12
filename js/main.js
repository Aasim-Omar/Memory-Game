// Set Main Variable
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
let totalMoves = (blocks.length / 2) + 2;
let movesCounter = totalMoves;
let moves = document.getElementById("moves");
let isWinning = false;

// Add Moves properties
window.onload = function () {
  moves.textContent = `(${movesCounter})`;
};

// Triger Main Menu Animations
window.setTimeout(() => {
  document.querySelector(".game-label").style.animation =
    "text-shadow 1.5s infinite";
}, 1500);
window.setTimeout(() => {
  document.querySelector(".start-game").style.animation =
    "scallingY 3s ease-out infinite";
}, 3000);

// Main Menu Button Action
document.querySelector(".main-menu .start-game").onclick = function () {
  // Remove Starter Popup
  this.parentElement.style.display = "none";
};

// Toggle Music Button
document.querySelector(".progress-container .toggle-sound").onclick =
  function () {
    if (this.querySelector("i").classList.contains("icon-volume-up")) {
      this.querySelector("i").classList.remove("icon-volume-up");
      this.querySelector("i").classList.add("icon-volume-off-1");
    } else {
      this.querySelector("i").classList.add("icon-volume-up");
      this.querySelector("i").classList.remove("icon-volume-off-1");
    }
  };

// Main Styling => set the block height Dynamcly
for (let block of blocks) {
  block.style.height = `${block.clientWidth}px`;
  block.querySelector(".front").style.lineHeight = `${block.clientWidth}px`;
}

// Main Styling => set the blocks container height
blocksContainer.style.minHeight = `${window.innerHeight - document.querySelector(".progress-container").clientHeight - 25 }px`;

// Shuffle The orderRange Array
shuffleArray(orderRange);

// Loop in All blocks to change order property
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger flipBlock Function
    flipBlock(this);
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  document.getElementById("click").play();
  selectedBlock.classList.add("is-fliped");
  // Colect All Flipped Card
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-fliped")
  );
  // When User Select Tow Card
  if (allFlippedBlocks.length === 2) {
    stopClicking(blocksContainer);
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Shuffle Array Function
function shuffleArray(array) {
  let current = array.length;
  while (current > 0) {
    current--;
    let temp = array[current];
    let random = Math.floor(Math.random() * current);
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

// Stop Clicking Function
function stopClicking(blocksContainer) {
  blocksContainer.classList.add("stop-flippeing");
  window.setTimeout(() => {
    blocksContainer.classList.remove("stop-flippeing");
  }, duration);
}

// Check
function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    // Sound Effect
    window.setTimeout(() => {
      document.getElementById("success").play();
    }, 500);
    // Change Progress Bar Level
    if (movesCounter <= totalMoves / 3) {
      document.querySelector(
        ".info-container .info-counter"
      ).style.backgroundColor = "red";
    }
    document.querySelector(".info-container .info-counter").style.width = `${
      (movesCounter / totalMoves) * 100
    }%`;
    // Remove Class is-fliped
    firstBlock.classList.remove("is-fliped");
    secondBlock.classList.remove("is-fliped");
    // Add Class has-matched
    firstBlock.classList.add("has-matched");
    secondBlock.classList.add("has-matched");
    window.setTimeout(() => {
      firstBlock.classList.add("fade");
      secondBlock.classList.add("fade");
    }, 500);
    // Wine Game Actions
    let allMatchedBlocks = blocks.filter((matchedBlock) =>
      matchedBlock.classList.contains("has-matched")
    );
    if (allMatchedBlocks.length === blocks.length) {
      nextLevel();
    }
  } else {
    // trigger wrong sound effect
    document.getElementById("wrong").play();
    movesCounter--;
    // Remove is-fliped Class
    window.setTimeout(() => {
      firstBlock.classList.remove("is-fliped");
      secondBlock.classList.remove("is-fliped");
    }, duration);
  }
  // Decrese moves Counter
  moves.textContent = `(${movesCounter})`;
  // Change Progress Bar Level
  if (movesCounter <= totalMoves / 3) {
    document.querySelector(
      ".info-container .info-counter"
    ).style.backgroundColor = "red";
  }
  document.querySelector(".info-container .info-counter").style.width = `${
    (movesCounter / totalMoves) * 100
  }%`;
  // When Lose All Moves
  if (movesCounter === 0) {
    document.querySelector(
      ".info-container .info-counter"
    ).style.backgroundColor = "transparent";
    if (isWinning) {
      // Do Nothing
    } else {
      endGame();
    }
  }
}

// End Game Function
function endGame() {
  // Play End Game Music
  document.getElementById("end-game").play();
  // Show All Blocks To Users
  for (let block of blocks) {
    block.classList.add("has-matched");
  }
  // Show End Game Interface
  window.setTimeout(() => {
    document.querySelector(".game-over").style.display = "flex";
  }, 1500);
  // Trigger End Game Interface Effects
  window.setTimeout(() => {
    document.querySelector(".game-over .game-over-label").style.animation =
      "text-shadow 1.5s infinite";
    document.querySelector(".game-over .retry-button").style.animation =
      "scalling 1.3s ease-out infinite";
  }, 2500);
}

// Game Over Option
document.querySelector(".game-over .retry-button").onclick = function () {
  window.location.href = "index.html";
};

// Nex Level Method
function nextLevel() {
  // Change isWinning Case
  isWinning = true;
  // Show Next Level interface
  document.querySelector(".next-level").style.display = "flex";
  // Play Next Level Game Music
  document.getElementById("you-win").play();
  // Add Next Level Animation Effect
  window.setTimeout(() => {
    document.querySelector(".next-level .next-level-label").style.animation =
      "text-shadow 1.5s infinite";
    document.querySelector(".next-level .next-level-button").style.animation =
      "scalling 1.3s ease-out infinite";
  }, 2000);
}

// next level button actions
document.querySelector(".next-level .next-level-button").onclick = function () {
  window.location.href = `index.html`;
};
