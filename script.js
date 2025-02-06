// Game Variables
let score = 0;
let lives = 3;
let level = 1;
let timeLeft = 10;
let targetColor = "";
let currentTimer = null;

// Function to update UI
function updateUI() {
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("lives").innerText = `Lives: ${"❤️".repeat(lives)}`;
    document.getElementById("level").innerText = `Level: ${level}`;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
}

// Function to start a new round
function newRound() {
    if (currentTimer) {
        clearInterval(currentTimer);
    }
    timeLeft = 10 - (level - 1);  // Timer decreases with level
    targetColor = getRandomColor();
    document.getElementById("colorBox").style.backgroundColor = targetColor;
    generateColorOptions();
    updateUI();
    startTimer();
}

// Function to generate color options
function generateColorOptions() {
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    let colors = [targetColor];
    while (colors.length < 6) {
        let newColor = getRandomColor();
        if (!colors.includes(newColor)) {
            colors.push(newColor);
        }
    }
    
    // Shuffle colors
    colors.sort(() => Math.random() - 0.5);
    
    colors.forEach(color => {
        let button = document.createElement("button");
        button.style.backgroundColor = color;
        button.dataset.testid = "colorOption";
        button.addEventListener("click", () => checkGuess(color));
        optionsContainer.appendChild(button);
    });
}

// Function to check the player's guess
function checkGuess(selectedColor) {
    let statusElement = document.getElementById("gameStatus");

    if (selectedColor === targetColor) {
        score++;
        statusElement.innerText = "Correct!";
        statusElement.style.color = "green";
    } else {
        statusElement.innerText = "Wrong!";
        statusElement.style.color = "red";
    }

    // Add fade effect
    statusElement.classList.remove("fade");
    setTimeout(() => {
        statusElement.classList.add("fade");
    }, 1000); // Hide after 1 second

    if (selectedColor !== targetColor) {
        loseLife();
    } else {
        newRound();
    }
    updateUI();
}


// Function to handle life loss
function loseLife() {
    lives--;
    if (lives <= 0) {
        resetGame(true); // Redirect to home only if game is over
    } 
    updateUI();
}


// Function to handle level-ups
function levelUp() {
    if (score > 0 && score % (5 * level) === 0) {
        level++;
        gameStatus.textContent = `Level Up! Now at Level ${level}`;
        gameStatus.style.color = "#FFC107";
    }
    updateUI();
}

// Function to reset the game
function resetGame(gameOver = false) {
    if (gameOver) {
        alert("Game Over! Returning to the home page...");
        window.location.href = "home.html"; // Redirect only if the game is over
    } else {
        score = 0;
        lives = 3;
        level = 1;
        updateUI();
        newRound();
    }
}


// Function to start a timer for each round
function startTimer() {
    currentTimer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            loseLife();
        } else {
            timeLeft--;
            updateUI();
        }
    }, 1000);
}

// Function to get a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Event listener for the "New Game" button
document.getElementById("newGameButton").addEventListener("click", function() {
    resetGame(false); // Restart the game without redirection
});


// Start the first round
newRound();

document.getElementById("backToHomeButton").addEventListener("click", function() {
    window.location.href = "home.html";
});

