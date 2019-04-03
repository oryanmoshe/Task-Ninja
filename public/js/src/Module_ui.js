(function() {
  var ui_newGameUpdate = function() {
    this.rotation += 0.01;
  };

  showStartGameUI = function() {
    gameState = GAME_READY;

    //  ui_gameTitle = particleSystem.createParticle(SPP.SpriteImage);
    //  ui_gameTitle.regX= ui_gameTitle.regY=0;
    //  ui_gameTitle.init(0,-assetsManager.gametitle.height,Infinity,assetsManager.gametitle,topContext);
    //  TweenLite.to(ui_gameTitle.position,0.5,{y:0});

    ui_newGame = particleSystem.createParticle(SPP.SpriteImage);
    ui_newGame.init(
      gameWidth * 0.318,
      gameHeight * 0.618,
      Infinity,
      assetsManager.newgame,
      topContext
    );
    ui_newGame.scale = 5;
    ui_newGame.alpha = 0;
    ui_newGame.onUpdate = ui_newGameUpdate;
    TweenLite.to(ui_newGame, 0.8, {
      scale: 0.55,
      alpha: 1,
      ease: Back.easeOut,
      onComplete: scoresController.topScores
    });

    if (bladeHistory.length > 0 && false) {
      ui_replayFruit = fruitSystem.createParticle(FruitGame.Fruit);
      ui_replayFruit.addEventListener("dead", replayLastGame);
      var textureObj = assetsManager.getFruitByName("done");
      // var textureObj=assetsManager.getRandomFruit();
      ui_replayFruit.init(
        gameWidth * 0.518,
        gameHeight * 0.618,
        Infinity,
        textureObj.w,
        assetsManager.shadow,
        topContext
      );
      ui_replayFruit.rotationStep = -0.02;
      ui_replayFruit.scale = 0;
      ui_replayFruit.alpha = 0;
      ui_replayFruit.textureObj = textureObj;
      ui_replayFruit.side = "middle";
      TweenLite.to(ui_replayFruit, 1, {
        scale: 1,
        alpha: 1,
        ease: Back.easeOut
      });
    }

    ui_startFruit = fruitSystem.createParticle(FruitGame.Fruit);
    ui_startFruit.addEventListener("dead", startGame);
    var textureObj = assetsManager.getFruitByName("stuck");
    // var textureObj=assetsManager.getRandomFruit();
    ui_startFruit.init(
      gameWidth * 0.318,
      gameHeight * 0.618,
      Infinity,
      textureObj.w,
      assetsManager.shadow,
      topContext
    );
    ui_startFruit.rotationStep = -0.02;
    ui_startFruit.scale = 0;
    ui_startFruit.alpha = 0;
    ui_startFruit.textureObj = textureObj;
    ui_startFruit.side = "middle";

    TweenLite.to(ui_startFruit, 1, { scale: 1, alpha: 1, ease: Back.easeOut });
    var wrapper = document.getElementsByClassName("wrapper")[0];
    var wrapperLeft = document.getElementsByClassName("wrapper-left")[0];
    var wrapperRight = document.getElementsByClassName("wrapper-right")[0];
    var back = document.getElementsByClassName("regular-background")[0];
    var slide = document.querySelector(".wrapper .sliding-background");
    var slideLeft = document.querySelector(".wrapper-left .sliding-background");
    var slideRight = document.querySelector(
      ".wrapper-right .sliding-background"
    );
    var parallax = document.querySelector(".wrapper .sliding-parallax");
    var parallax2 = document.querySelector(".wrapper .sliding-parallax2");
    var parallaxLeft = document.querySelector(
      ".wrapper-left .sliding-parallax"
    );
    var parallaxRight = document.querySelector(
      ".wrapper-right .sliding-parallax"
    );
    var parallaxLeft2 = document.querySelector(
      ".wrapper-left .sliding-parallax2"
    );
    var parallaxRight2 = document.querySelector(
      ".wrapper-right .sliding-parallax2"
    );
    slide.className = "sliding-background hidden";
    slideLeft.className = "sliding-background hidden";
    slideRight.className = "sliding-background hidden";
    parallax.className = "sliding-parallax hidden";
    parallaxLeft.className = "sliding-parallax hidden";
    parallaxRight.className = "sliding-parallax hidden";
    parallax2.className = "sliding-parallax2 hidden";
    parallaxLeft2.className = "sliding-parallax2 hidden";
    parallaxRight2.className = "sliding-parallax2 hidden";
    wrapper.className = "wrapper";
    wrapperLeft.className = "wrapper-left";
    wrapperRight.className = "wrapper-right";
    back.className = "regular-background";
    // scoresController.getScores();
  };

  hideStartGameUI = function() {
    ui_startFruit.removeEventListener("dead", startGame);
    currentlyPlaying = createjs.Sound.play("ankYou");
    if (ui_replayFruit)
      ui_replayFruit.removeEventListener("dead", replayLastGame);
    // TweenLite.to(ui_gameTitle.position,0.8,{y:-assetsManager.gametitle.height});
    TweenLite.to(ui_newGame, 0.8, {
      scale: 8,
      alpha: 0,
      onComplete: function() {
        // ui_gameTitle.life=0;
        ui_newGame.life = 0;
      }
    });
    if (multiplayer) {
      var wrapperLeft = document.getElementsByClassName("wrapper-left")[0];
      var wrapperRight = document.getElementsByClassName("wrapper-right")[0];
      var slideLeft = document.querySelector(
        ".wrapper-left .sliding-background"
      );
      var slideRight = document.querySelector(
        ".wrapper-right .sliding-background"
      );
      var parallaxLeft = document.querySelector(
        ".wrapper-left .sliding-parallax"
      );
      var parallaxRight = document.querySelector(
        ".wrapper-right .sliding-parallax"
      );
      var parallaxLeft2 = document.querySelector(
        ".wrapper-left .sliding-parallax2"
      );
      var parallaxRight2 = document.querySelector(
        ".wrapper-right .sliding-parallax2"
      );
      slideLeft.className = "sliding-background";
      parallaxLeft.className = "sliding-parallax";
      parallaxLeft2.className = "sliding-parallax2";
      if (isAutomationLeft) wrapperLeft.className = "wrapper-left frenzy";

      slideRight.className = "sliding-background";
      parallaxRight.className = "sliding-parallax";
      parallaxRight2.className = "sliding-parallax2";
      if (isAutomationRight) wrapperRight.className = "wrapper-right frenzy";
    } else {
      var wrapper = document.getElementsByClassName("wrapper")[0];
      var slide = document.getElementsByClassName("sliding-background")[0];
      var parallax = document.getElementsByClassName("sliding-parallax")[0];
      var parallax2 = document.getElementsByClassName("sliding-parallax2")[0];
      slide.className = "sliding-background";
      parallax.className = "sliding-parallax";
      parallax2.className = "sliding-parallax2";
      if (isAutomation) wrapper.className = "wrapper frenzy";
    }
    var back = document.getElementsByClassName("regular-background")[0];
    back.className = "regular-background hidden";
  };

  showScoreTextUI = function(context, currScore) {
    if (gameState == GAME_READY) {
      // bottomContext.fillStyle = "yellow";
      // bottomContext.font = "36px 'Arial'";
      // bottomContext.fillText("- Swipe to start -", 330, 650);
      if (ui_replayFruit) {
        bottomContext.fillStyle = "yellow";
        bottomContext.font = "36px 'Arial'";
        bottomContext.fillText("- Swipe to replay -", 630, 650);
      }
      bottomContext.fillStyle = "white";
      return;
    }
    context.font = "italic 36px 'Arial'";

    
    context.fillText(currScore, ui_hud.texture.width * 0.2, gameHeight - 80);
    context.setTransform(1, 0, 0, 1, 0, 0);
    var side;
    if (context.canvas.id.indexOf("left") !== -1) {
      side = "left";
      if (gameLifeLeft <= 1) {
        updateHudLeft += 1 / 8;
        if (Math.floor(updateHudLeft) % 2 === 0) {
          ui_hudLeft.texture = assetsManager.hudbad;
        } else {
          ui_hudLeft.texture = assetsManager.hud;
        }
      }
    } else if (context.canvas.id.indexOf("right") !== -1) {
      side = "right";
      if (gameLifeRight <= 1) {
        updateHudRight += 1 / 8;
        if (Math.floor(updateHudRight) % 2 === 0) {
          ui_hudRight.texture = assetsManager.hudbad;
        } else {
          ui_hudRight.texture = assetsManager.hud;
        }
      }
    } else {
      side = "middle";
      if (gameLife <= 1) {
        updateHud += 1 / 8;
        if (Math.floor(updateHud) % 2 === 0) {
          ui_hud.texture = assetsManager.hudbad;
          ui_gameLife.alpha = 1;
        } else {
          ui_hud.texture = assetsManager.hud;
          ui_gameLife.alpha = 0.5;
        }
      }
    }
    // context.setTransform(1,0,Math.tan(175), 1, 0, 0)
    // context.font="14px 'Roboto'";
    // context.fillText("Best:  "+storage.highScore,13,50);
    // if (multiplayer){
    // 	bottomContext.moveTo(gameWidth / 2, 0);
    // 	bottomContext.lineTo(gameWidth / 2, gameHeight);
    // 	bottomContext.strokeStyle = "black";
    // 	bottomContext.lineWidth = 10;
    // 	bottomContext.stroke();
    // }
  };

  showScoreUI = function() {
    if (multiplayer) {
      ui_hudLeft = particleSystem.createParticle(SPP.SpriteImage);
      ui_hudLeft.regX = ui_hudLeft.regY = 0;
      ui_hudLeft.init(
        -30,
        gameHeight - 105,
        Infinity,
        assetsManager.hud,
        bottomLeftContext
      );
      ui_hudLeft.scale = 0.5;

      ui_scoreIconLeft = particleSystem.createParticle(SPP.SpriteImage);
      ui_scoreIconLeft.regX = ui_scoreIconLeft.regY = 0;
      ui_scoreIconLeft.init(
        10,
        gameHeight - 75,
        Infinity,
        assetsManager.score,
        bottomLeftContext
      );
      ui_scoreIconLeft.scale = 0.5;

      ui_gameLifeLeft = particleSystem.createParticle(SPP.SpriteImage);
      ui_gameLifeLeft.regX = 1;
      ui_gameLifeLeft.regY = 0;
      ui_gameLifeLeft.scale = 0.5;
      ui_gameLifeLeft.init(
        165,
        bottomLeftContext.canvas.height - 70,
        Infinity,
        ui_gamelifeTextureLeft,
        bottomLeftContext
      );

      ui_hudRight = particleSystem.createParticle(SPP.SpriteImage);
      ui_hudRight.regX = ui_hudRight.regY = 0;
      ui_hudRight.init(
        -30,
        gameHeight - 105,
        Infinity,
        assetsManager.hud,
        bottomRightContext
      );
      ui_hudRight.scale = 0.5;

      ui_scoreIconRight = particleSystem.createParticle(SPP.SpriteImage);
      ui_scoreIconRight.regX = ui_scoreIconRight.regY = 0;
      ui_scoreIconRight.init(
        10,
        gameHeight - 75,
        Infinity,
        assetsManager.score,
        bottomRightContext
      );
      ui_scoreIconRight.scale = 0.5;

      ui_scoreIconRight = particleSystem.createParticle(SPP.SpriteImage);
      ui_scoreIconRight.regX = ui_scoreIconRight.regY = 0;
      ui_scoreIconRight.init(
        10,
        gameHeight - 75,
        Infinity,
        assetsManager.score,
        bottomRightContext
      );
      ui_scoreIconRight.scale = 0.5;

      ui_gameLifeRight = particleSystem.createParticle(SPP.SpriteImage);
      ui_gameLifeRight.regX = 1;
      ui_gameLifeRight.regY = 0;
      ui_gameLifeRight.scale = 0.5;
      ui_gameLifeRight.init(
        165,
        bottomRightContext.canvas.height - 70,
        Infinity,
        ui_gamelifeTextureRight,
        bottomRightContext
      );
    } else {
      ui_hud = particleSystem.createParticle(SPP.SpriteImage);
      ui_hud.regX = ui_hud.regY = 0;
      ui_hud.init(
        0,
        gameHeight - 105,
        Infinity,
        assetsManager.hud,
        bottomContext
      );
      ui_hud.scale = 0.5;

      ui_hudPower = particleSystem.createParticle(SPP.SpriteImage);
      ui_hudPower.regX = ui_hudPower.regY = 0;
      ui_hudPower.init(
        150,
        gameHeight - 107,
        Infinity,
        assetsManager.hudPower,
        bottomContext
      );
      ui_hudPower.scale = 0.5;

      ui_hudPowerActive = particleSystem.createParticle(SPP.SpriteImage);
      ui_hudPowerActive.regX = ui_hudPowerActive.regY = 0;
      ui_hudPowerActive.init(
        164,
        gameHeight - 87,
        Infinity,
        null,
        bottomContext
      );
      ui_hudPowerActive.scale = 0.5;

      ui_scoreIcon = particleSystem.createParticle(SPP.SpriteImage);
      ui_scoreIcon.regX = ui_scoreIcon.regY = 0;
      ui_scoreIcon.init(
        10,
        gameHeight - 75,
        Infinity,
        assetsManager.score,
        bottomContext
      );
      ui_scoreIcon.scale = 0.5;

      ui_gameLife = particleSystem.createParticle(SPP.SpriteImage);
      ui_gameLife.regX = 1;
      ui_gameLife.regY = 0;
      ui_gameLife.scale = 0.5;
      ui_gameLife.init(
        165,
        gameHeight - 70,
        Infinity,
        ui_gamelifeTexture,
        bottomContext
      );
    }
  };

  hideScoreUI = function() {
    if (window.ui_scoreIcon != undefined) {
      window.ui_scoreIcon.life = 0;
    }
    if (window.ui_hud != undefined) {
      window.ui_hud.life = 0;
    }
    if (window.ui_hudPower != undefined) {
      window.ui_hudPower.life = 0;
    }
    if (window.ui_hudPowerActive != undefined) {
      window.ui_hudPowerActive.life = 0;
    }
    if (window.ui_gameLife != undefined) {
      window.ui_gameLife.life = 0;
    }
    if (window.ui_scoreIconLeft != undefined) {
      window.ui_scoreIconLeft.life = 0;
    }
    if (window.ui_gameLifeLeft != undefined) {
      window.ui_gameLifeLeft.life = 0;
    }
    if (window.ui_scoreIconRight != undefined) {
      window.ui_scoreIconRight.life = 0;
    }
    if (window.ui_gameLifeRight != undefined) {
      window.ui_gameLifeRight.life = 0;
    }
  };

  showGameoverUI = function() {
    endTime = new Date().getTime();
    ui_gameOver = particleSystem.createParticle(SPP.SpriteImage);
    ui_gameOver.init(
      gameWidth * 0.5,
      gameHeight * 0.5,
      Infinity,
      assetsManager.gameover,
      topContext
    );
    ui_gameOver.scale = 0;
    TweenLite.to(ui_gameOver, 0.8, {
      delay: 2,
      scale: 1.6,
      ease: Back.linear,
      onComplete: raiseGameOver
    });
    enterScoreDelay(4);
    enterNameDelay(4);
    document.body.addEventListener("keydown", startNewGame, true);
  };
  raiseGameOver = function() {
    TweenLite.to(ui_gameOver.position, 0.8, {
      delay: 1,
      y: gameHeight * 0.15,
      ease: Back.linear,
      onComplete: gameOverComplete
    });
  };
  showGood = function(x = gameWidth * 0.5, y = gameHeight * 0.5) {
    var rand = Math.floor(Math.random() * 9999999 + 1);
    var type;
    if (rand % 5 === 0) {
      type = "nice";
    } else if (rand % 5 === 1) {
      type = "wow";
    } else if (rand % 5 === 2) {
      type = "excellent";
    } else if (rand % 5 === 3) {
      type = "zinman";
    } else if (rand % 5 === 4) {
      type = "boom";
    }
    good_ui = particleSystem.createParticle(SPP.SpriteImage);
    good_ui.init(x, y, Infinity, assetsManager[type + "Image"], topContext);
    good_ui.scale = 0;
    TweenLite.to(good_ui, 0.5, {
      scale: 0.2,
      ease: Back.easeOut,
      onComplete: () => {
        TweenLite.to(good_ui, 0.5, {
          delay: 0,
          scale: 0,
          ease: Back.easeIn,
          onComplete: () => {
            showingGood = false;
          }
        });
      }
    });
    if (!isLlamas && !realSlowmo){
      themeMusic.volume = .5;
    }
    currentlyPlaying = createjs.Sound.play(type);
    setTimeout(() => {
      if (!isLlamas && !realSlowmo){
        themeMusic.volume = 1;
      }
    }, 1000);
  };

  var startNewGame = async function(e) {
    if (gameState === GAME_OVER) {
      handleName(e);
    }
    if (e.keyCode === 13 && gameState === GAME_OVER) {
      showStartGameUI();
      hideScoreUI();
      // typeToScreen(a)
      TweenLite.to(ui_gameOver, 0.1, {
        scale: 0,
        ease: Back.easeIn,
        onComplete: gameoverUIHideComplete
      });
      await scoresController.insertScore(playerName, score);
      resetGameData();
      document.body.removeEventListener("keydown", startNewGame, true);
      playerName = "";
    }
  };

  var gameoverUIHideComplete = function() {
    ui_gameOver.life = 0;
    // return
    hideScoreUI();
    slowMo = false;
  };
  hideGameoverUI = function() {
    // TweenLite.to(ui_gameOver, 0.8, {
    //   scale: 0,
    //   ease: Back.easeIn,
    //   onComplete: gameoverUIHideComplete
    // });
  };
})();
