var operatorStrings = ["+", "-", "x", "/"];
var operatorMappings = { 
    "+": "+",
	"-": "-",
	"x": "*",
	"/": "/"
}

var opponentImg,			// the image element which will be used to display an image of the opponent
	opponent,				// an instance of the Opponent class which represents the current opponent
	opponentName,			// the span element used to display the name of the current opponent
	opponentHpMax,			// the span element showing the opponent's full HP
	opponentHp,				// the span element showing the opponent's current HP

    playerName,             // the span element used to display the name of the player
    playerHpMax,            // the span element showing the player's full HP
    playerHp,               // the span element showing the player's current HP
    playerScore,            // the span element used to display the player's current score
    playerHiScore,          // the span element used to display the player's all time high score

	dialogWindow,			// the dialog window div element
	dialog,					// the dialog span element
	answerBox, 			    // the input box for answering the questions
    wrongAnswerImg,         // the wrong answer image
    correctAnswerImg,       // the correct answer image
    timeMeter,              // the span element showing the time remaining
    pressKeyImg,            // the press key image

    congratulationScreen,   // the congratulation screen
    gameOverScreen,         // the game over screen

	nextAction;				// delegate for the 'next' action after the player presses the "Enter" key

var hpMax = 10,             // how much HP the player starts out with
    hp = 10, 			    // how much HP has the player left
    combo = 0,              // the number of questions the player has answered correctly in a row
    stage = 0,              // the current stage
	currentScore = 0,		// the player's current score
	highScore = 0,			// the player's all time high score
    useLocalStorage,        // whether to use local storage for storing hi-score
    localStorageHighScoreKey = "mathdojo-high-score";

// validates if the given value is an integer
function isInt(x) {
	var y = parseInt(x);
	if (isNaN(y)) return false;
	
	return x == y && x.toString() == y.toString();
}

function gameComplete() {
    congratulationScreen.show();

    nextAction = function () {
    };
}

function gameOver() {
    gameOverScreen.show();

    nextAction = function () {
    };
}

// loads the current stage
function loadNextStage() {
    stage++;

    // load the next opponent
    if (loadOpponent())
    {
        var question = getQuestion(opponent.Level);

        nextAction = function () {
            askQuestion(opponent);
        };
    } 
    else {
        gameComplete();
    }
}

// loads the next opponent
function loadOpponent() {
	// get the opponent object
	opponent = opponents[stage];

    if (opponent == undefined) {
        return false;
    }
	
	// load its image and name
	opponentImg.src = opponent.ImagePath;
	opponentName.html(opponent.Name);

	$(opponentImg).show();

	// set hp to full
	opponentHp.width(opponentHpMax.width());
	
	// say hi
	dialog.html(opponent.Messages.Greeting);

    return true;
}

// do the stage complete and transition to next stage
function stageComplete() {
    $(opponentImg).hide();

    dialog.html("Stage " + stage + " Complete!");

    nextAction = function () {
        loadNextStage();
    }
}

// start the game
function start() {
	// get references to the elements of interest	
	opponentImg = document.getElementById("opponent-img");
	opponentName = $("#opponent-span-name");
    opponentHpMax = $("#opponent-span-hp-max");
	opponentHp = $("#opponent-span-hp");

    playerName = $("#player-name");
    playerHpMax = $("#player-span-hp-max");
    playerHp = $("#player-span-hp");
    playerScore = $("#player-span-score");
    playerHiScore = $("#player-span-hi-score");

	dialogWindow = $("#dialog-window");
	dialog = $("#dialog");
	answerBox = $("#answer-box");
	wrongAnswerImg = $("#wrong-answer-sign");
	correctAnswerImg = $("#correct-answer-sign");
	timeMeter = $("#time-meter");
    pressKeyImg = $("#press-enter-sign");

    congratulationScreen = $("#congratulation-screen");
    gameOverScreen = $("#game-over-screen");

    // hide the splash screens
    $(".splash").hide();
    $(".hide").hide();

    useLocalStorage = Modernizr.localstorage;

    // load the hi-score
    if (useLocalStorage) {
        highScore = localStorage.getItem(localStorageHighScoreKey);

        if (!highScore) {
            highScore = 0;
        }
    }

    playerHiScore.html(highScore);

	loadNextStage();

	// hook up the onkeydown event to execute the 'next' action whatever it might be
	document.onkeydown = function(event) {
	    if (event.keyCode == 13) {
			nextAction();
		}
	};
}

function setOpponentHp() {
    // stop any ongoing animation on the opponent's hp meter
    opponentHp.stop();

    // what should be the opponent hp meter's new width?
    var newWidth = opponentHpMax.width() * (opponent.Hp / opponent.HpMax);    

    // change the width of the hp meter
    opponentHp.animate({
        width: newWidth + "px"
    }, 200);
}

function setPlayerHp() {
    // stop any ongoing animation on the player's hp meter
    playerHp.stop();

    // what should be the opponent hp meter's new width?
    var newWidth = playerHpMax.width() * (hp / hpMax);    

    // change the width of the hp meter
    playerHp.animate({
        width: newWidth + "px"
    }, 200);
}

function endQuestionRound(isCorrectAnswer) {
    // show the press key image
    pressKeyImg.show();

    nextAction = function () {
        // now hide the answer box and take the dialog window out of question mode
        answerBox.removeAttr("disabled").hide();
        dialogWindow.removeClass("question-mode");
        wrongAnswerImg.hide();
        correctAnswerImg.hide();

        // reset the time meter's width and hide it
        timeMeter.removeAttr("style").removeClass("middle").removeClass("lastleg").hide();

        // decide what to do next
        if (opponent.Hp > 0 && hp > 0) {
            if (isCorrectAnswer) {
                dialog.html(getOpponentConcedeMessage());
            } else {
                dialog.html(getOpponentScoreMessage());
            }

            nextAction = function () {
                askQuestion(opponent);
            }
        }
        else if (opponent.Hp == 0) {
            dialog.html(opponent.Messages.Defeat);

            nextAction = function () {
                stageComplete();
            }
        }
        else if (hp == 0) {
            dialog.html(opponent.Messages.Victory);

            nextAction = function () {
                gameOver();
            }
        }
        else {
            throw "Oops, something's gone wrong here!";
        }
    }
}

// player has answered correctly
function correctAnswer(timeElapsed) {
    // disable the answer box
    answerBox.attr("disabled", "disabled");

    correctAnswerImg.show();

    // if so, deduct the opponent's HP
    opponent.Hp--;
    setOpponentHp();    

    // increment the combo count
    combo++;

    // get combo score bonus (10% each successful combo) and opponent multiplier
    var comboBonus = combo * 0.1;
    var opponentBonus = opponent.Level * 0.1;
    var timeBonus = (1000 * opponent.TimeLimitPerQuestion / timeElapsed) * 0.1;

    // what's the score from this answer? rounded to closet integer
    var newScore = Math.floor(100 * (1 + comboBonus + opponentBonus + timeBonus));
    currentScore += newScore;

    // display score
    playerScore.html(currentScore);

    // update high score if necessary
    if (currentScore > highScore) {
        highScore = currentScore;

        if (useLocalStorage) {
            localStorage.setItem(localStorageHighScoreKey, highScore);
        }
        playerHiScore.html(highScore);
    }

    endQuestionRound(true);
}

// player has answered incorrectly
function wrongAnswer() {
    // disable the answer box
    answerBox.attr("disabled", "disabled");

    wrongAnswerImg.show();

    // otherwise the player loses HP
    hp--;
    setPlayerHp();

    // reset the combo count
    combo = 0;

    endQuestionRound(false);
}

// evaluates the answer the player provides
function evaluateAnswer(question, startTime) {
    var endTime = new Date();
    var timeElapsed = endTime.valueOf() - startTime.valueOf();

    // stop the timer
    timeMeter.stop();

    // get player's answer
    var answer = answerBox.val();    

    // has the player answered correct?
    var isCorrectAnswer = isInt(answer) && answer == question.answer;
    if (isCorrectAnswer) {
        correctAnswer(timeElapsed);
    }
    else {
        wrongAnswer();
    }
}

// let the opponent ask a question
function askQuestion(opponent) {
	// get a question based on the opponent's level
	var question = getQuestion(opponent.Level);
		
	// switch the dialog window to question mode
	dialogWindow.addClass("question-mode");
	
	// set the question
	dialog.html(question.questionStr);

    // hide the press-key image
    pressKeyImg.hide();
	
	// clear the answer box and show it
	answerBox.val("").show().focus();

    var startTime = new Date();

    // show the time meter and start its animation
	timeMeter.show();

    var midWidth = timeMeter.width() * 0.6,
        lastlegWidth = timeMeter.width() * 0.3;

	timeMeter.animate({        
	    width: 0 + "px", 
    }, {
        duration: 1000 * opponent.TimeLimitPerQuestion,
        easing: "linear",
        step: function(now, fx) {
            if (now <= midWidth) {
                timeMeter.addClass("middle");

                if (now <= lastlegWidth) {
                    timeMeter.addClass("lastleg");
                }
            }
        },
        complete: function() {
            wrongAnswer();
        }
    });

	// set next action to evaluate the answer the player provides
	nextAction = function () {
	    evaluateAnswer(question, startTime);
	}
}

// gets the next question to ask
function getQuestion(level) {
	// the level determines the max number that can be 
    var maxNumber = Math.pow(2, level);

    // get a random operator
    var operatorStr = operatorStrings[Math.floor(Math.random() * operatorStrings.length)];
    var operator = operatorMappings[operatorStr];

    var x, y;

    if (operator == "*") {
        // reduce the max number for multiplications
        maxNumber = maxNumber / 2;
        x = Math.ceil(Math.random() * maxNumber);
		y = Math.ceil(Math.random() * maxNumber);
    } 
    else if (operator == "-") {
        var n1 = Math.ceil(Math.random() * maxNumber),
            n2 = Math.ceil(Math.random() * maxNumber);

        // ensure the answer is always a positive number
        x = Math.max(n1, n2);
        y = Math.min(n1, n2);
    } 
    else if (operator == "/") {
        maxNumber = maxNumber / 4;
        var n1 = Math.ceil(Math.random() * maxNumber),
            n2 = Math.ceil(Math.random() * maxNumber);

        x = n1 * n2;
        y = Math.max(n1, n2);
    } 
    else if (operator == "+") {
        x = Math.ceil(Math.random() * maxNumber);
        y = Math.ceil(Math.random() * maxNumber);
    } 
    else {
        throw "Undefined operator";
    }
	
	var question = {
		questionStr: x + operatorStr + y + "=...?",
		answer: eval(x + operator + y)
	}
	
	return question;
}

function getOpponentScoreMessage() {
    var scoreMessages = opponent.Messages.Score;
    return scoreMessages[Math.floor(Math.random() * (scoreMessages.length))];
}

function getOpponentConcedeMessage() {
    var concedeMessages = opponent.Messages.Concede;
    return concedeMessages[Math.floor(Math.random() * (concedeMessages.length))];
}