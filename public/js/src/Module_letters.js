(function() {
  neonWrite = function(text, ctx, x, y, fontSize = 30) {
    ctx.font = "700 " + fontSize + "px 'Sofia Pro ', sans-serif";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText(text, x, y);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
    // ctx.fillText(text, x+3, y);
  };
  blackWrite = function(text, ctx, x, y, fontSize = 30) {
    ctx.font = fontSize + "px 'Sofia Pro 900', sans-serif";
    ctx.fillStyle = "rgb(30,30,30)";
    ctx.fillText(text, x, y);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(30,30,30)";
    ctx.fillStyle = "black";
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
    // ctx.fillText(text, x+3, y);
  };
  typeToScreen = function(
    text,
    x,
    y,
    delay = 0,
    fontSize = 30,
    writingFunc = neonWrite,
    context = textContext
  ) {
    return new Promise(resolve => {
      context.fillStyle = "white";
      context.font = fontSize + "px 'Sofia Pro Bold', sans-serifs";
      var count = 0;
      var chars;
      function draw() {
        count++;
        // Grab all the characters up to count
        chars = text.substr(0, count);
        // Clear the canvas each time draw is called
        
        clearText(x - 30, y - 30, fontSize * text.length, fontSize + 90);
        // Draw the characters to the canvas
        writingFunc(chars, context, x, y, fontSize);
        // textContext.fillText(chars, x, y);
        if (count <= text.length) {
          setTimeout(draw, delay);
        } else {
          resolve(true);
        }
      }
      draw();
    });
  };

  clearText = function(x = 0, y = 0, width = gameWidth, height = gameHeight) {
    textContext.clearRect(x, y, width, height);
  };
  clearScores = function(x = 0, y = 0, width = gameWidth, height = gameHeight) {
    scoreContext.clearRect(x, y, width, height);
  };
  flashInput = function(x, y, char, delay = 150, fontSize = 90) {
    var textWidth = textContext.measureText(playerName);
    var spaceWidth = textContext.measureText(" ");
    var offset = textWidth.width + spaceWidth.width * playerName.length;
    
    var text = (playerName + "_".repeat(nameLength - playerName.length))
      .split("")
      .join(" ");
    clearText(
      x - 30,
      y - 30,
      textContext.measureText(text).width + 90,
      fontSize + 90
    );
    neonWrite(text, textContext, x, y, fontSize);
    typeToScreen(
      playerName.length >= nameLength ? "" : char,
      offset + x,
      y,
      delay,
      fontSize
    ).then(() => {
      if (gameState == GAME_OVER) {
        
        window.flashTimer = setTimeout(() => {
          flashInput(x, y, char, delay, fontSize);
        }, delay);
        var charWidth = textContext.measureText(char);
        clearText(offset + x - 5, y - 30, charWidth.width + 10, fontSize + 90);
      } else {
        clearText(0, 0, gameWidth, gameHeight);
      }
    });
  };

  enterName = function() {
    var text = (playerName + "_".repeat(nameLength - playerName.length))
      .split("")
      .join(" ");
    console.log(gameWidth);
    
    height = gameHeight < 880 ? gameHeight * 0.6 : gameHeight * 0.5;

    console.log(gameHeight);
    typeToScreen("ENTER NAME:", gameWidth / 2, gameHeight / 3, 0, 80).then(() =>
      typeToScreen(text, gameWidth / 2, height, 0, 112).then(() =>
        flashInput(gameWidth / 2, height, "_", 150, 112)
      )
    );
  };
  //text, x, y, delay=0, fontSize = 30
  enterScore = function() {
    typeToScreen("SCORE:", gameWidth / 6, gameHeight / 3, 0, 80);
    height = gameHeight < 880 ? gameHeight * 0.6 : gameHeight * 0.5;
    typeToScreen(score.toString(), gameWidth / 6, height, 0, 112);
  };

  enterScores = function(scores) {
    scores.forEach(function(score, index) {
      typeToScreen(
        score["username"].toString(),
        gameWidth * 0.7,
        0.326 * gameHeight + index * 0.086 * gameHeight,
        0,
        32,
        blackWrite,
        scoreContext
      );
      typeToScreen(
        score["score"].toString(),
        gameWidth * 0.87,
        0.326 * gameHeight + index * 0.086 * gameHeight,
        0,
        32,
        blackWrite,
        scoreContext
      );
    });
  };

  enterNameDelay = function(delay) {
    setTimeout(enterName, delay * 1000);
  };

  enterScoreDelay = function(delay) {
    setTimeout(enterScore, delay * 1000);
  };

  handleName = function(e) {
    if (
      ((e.keyCode >= 65 && e.keyCode <= 90) ||
        (e.keyCode > 48 && e.keyCode < 57) ||
        e.key === "?") &&
      playerName.length < nameLength
    ) {
      playerName += e.key.toUpperCase();
      currentlyPlaying.stop();
      currentlyPlaying = createjs.Sound.play(e.key === "#" ? "hash" : e.key.toUpperCase());
    }
    if (e.keyCode === 8) {
      playerName = playerName.slice(0, -1);
    }
    // e.preventDefault();
  };
})();
