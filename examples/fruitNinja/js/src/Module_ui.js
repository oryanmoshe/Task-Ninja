(function() {

	var ui_newGameUpdate=function()
	{
		this.rotation+=0.01;
	};

	showStartGameUI=function()
	{
		 gameState=GAME_READY;

		 ui_gameTitle = particleSystem.createParticle(SPP.SpriteImage);
		 ui_gameTitle.regX= ui_gameTitle.regY=0;
		 ui_gameTitle.init(0,-assetsManager.gametitle.height,Infinity,assetsManager.gametitle,topContext);
		 TweenLite.to(ui_gameTitle.position,0.5,{y:0});

		ui_newGame = particleSystem.createParticle(SPP.SpriteImage);
		ui_newGame.init(gameWidth*0.318,gameHeight*0.618,Infinity,assetsManager.newgame,topContext);
		ui_newGame.scale=5;
		ui_newGame.alpha=0;
		ui_newGame.onUpdate=ui_newGameUpdate;
		TweenLite.to(ui_newGame,0.8,{scale:.7,alpha:1,ease :Back.easeOut});

		ui_startFruit = fruitSystem.createParticle(FruitGame.Fruit);
		ui_startFruit.addEventListener("dead",startGame);
		var textureObj=assetsManager.getRandomFruit();
		ui_startFruit.init(gameWidth*0.318,gameHeight*0.618,Infinity,textureObj.w,assetsManager.shadow,topContext);
		ui_startFruit.rotationStep=-0.02;
		ui_startFruit.scale=0;
		ui_startFruit.alpha=0;
		ui_startFruit.textureObj=textureObj;

		TweenLite.to(ui_startFruit,1,{scale:1,alpha:1,ease :Back.easeOut});
		var wrapper = document.getElementsByClassName('wrapper')[0];
		var back = document.getElementsByClassName('regular-background')[0];
		var slide = document.getElementsByClassName('sliding-background')[0];
		slide.className = 'sliding-background hidden';
		wrapper.className = 'wrapper';
		back.className = 'regular-background';
	};
	
	hideStartGameUI=function()
	{
		ui_startFruit.removeEventListener("dead",startGame);
		TweenLite.to(ui_gameTitle.position,0.8,{y:-assetsManager.gametitle.height});
		TweenLite.to(ui_newGame,0.8,{scale:8,alpha:0,onComplete:function()
			{
				ui_gameTitle.life=0;
		    ui_newGame.life=0;
			}});
			var wrapper = document.getElementsByClassName('wrapper')[0];
			var back = document.getElementsByClassName('regular-background')[0];
			var slide = document.getElementsByClassName('sliding-background')[0];
			slide.className = 'sliding-background';
			back.className = 'regular-background hidden';
			if (isAutomation)
				wrapper.className = 'wrapper frenzy';

	};

	showScoreTextUI=function(context, currScore)
	{
		if(gameState==GAME_READY)
		{ 
			bottomContext.fillStyle="yellow";
			bottomContext.font="36px 'Arial'";
			bottomContext.fillText("- Swipe to start -",330,650);
			bottomContext.fillStyle="rgb(235, 63, 124)";
			return;
		}
		context.font="36px 'Roboto'";
		context.fillText("  "+currScore,24,6);
		// context.font="14px 'Roboto'";
		// context.fillText("Best:  "+storage.highScore,13,50);
		if (multiplayer){
			bottomContext.moveTo(gameWidth / 2, 0);
			bottomContext.lineTo(gameWidth / 2, gameHeight);
			bottomContext.strokeStyle = "black";
			bottomContext.lineWidth = 10;
			bottomContext.stroke();
		}
	};

	showScoreUI=function()
	{
		if (multiplayer){
			ui_scoreIconLeft = particleSystem.createParticle(SPP.SpriteImage);
			ui_scoreIconLeft.regX=ui_scoreIconLeft.regY=0;
			ui_scoreIconLeft.init(10,10,Infinity,assetsManager.score,bottomLeftContext);
	
			ui_gameLifeLeft = particleSystem.createParticle(SPP.SpriteImage);
			ui_gameLifeLeft.regX=1;
			ui_gameLifeLeft.regY=0;
			ui_gameLifeLeft.scale=.5;
			ui_gameLifeLeft.init(bottomLeftContext.canvas.width,8,Infinity,ui_gamelifeTexture,bottomLeftContext);


			ui_scoreIconRight = particleSystem.createParticle(SPP.SpriteImage);
			ui_scoreIconRight.regX=ui_scoreIconRight.regY=0;
			ui_scoreIconRight.init(10,10,Infinity,assetsManager.score,bottomRightContext);
	
			ui_gameLifeRight = particleSystem.createParticle(SPP.SpriteImage);
			ui_gameLifeRight.regX=1;
			ui_gameLifeRight.regY=0;
			ui_gameLifeRight.scale=.5;
			ui_gameLifeRight.init(bottomRightContext.canvas.width,8,Infinity,ui_gamelifeTexture,bottomRightContext);
		} else {
			ui_scoreIcon = particleSystem.createParticle(SPP.SpriteImage);
			ui_scoreIcon.regX=ui_scoreIcon.regY=0;
			ui_scoreIcon.init(10,10,Infinity,assetsManager.score,bottomContext);
	
			ui_gameLife = particleSystem.createParticle(SPP.SpriteImage);
			ui_gameLife.regX=1;
			ui_gameLife.regY=0;
			ui_gameLife.scale=.5;
			ui_gameLife.init(gameWidth,8,Infinity,ui_gamelifeTexture,bottomContext);
		}
		
	};

    hideScoreUI=function()
	{
		if(ui_scoreIcon!=undefined)
		{
			ui_scoreIcon.life=0;
		}
		if(ui_gameLife!=undefined)
		{
			ui_gameLife.life=0;
		}
		if(ui_scoreIconLeft!=undefined)
		{
			ui_scoreIconLeft.life=0;
		}
		if(ui_gameLifeLeft!=undefined)
		{
			ui_gameLifeLeft.life=0;
		}
		if(ui_scoreIconRight!=undefined)
		{
			ui_scoreIconRight.life=0;
		}
		if(ui_gameLifeRight!=undefined)
		{
			ui_gameLifeRight.life=0;
		}
	};

	showGameoverUI=function()
	{
		ui_gameOver = particleSystem.createParticle(SPP.SpriteImage);
		ui_gameOver.init(gameWidth*0.5,gameHeight*0.5,Infinity,assetsManager.gameover,topContext);
		ui_gameOver.scale=0;
		TweenLite.to(ui_gameOver,0.8,{delay:2,scale:1,ease :Back.easeOut,onComplete:gameOverComplete});
	};

	var gameoverUIHideComplete=function()
	{
		ui_gameOver.life=0;
		hideScoreUI();
		showStartGameUI();
	};
	hideGameoverUI=function()
	{
		TweenLite.to(ui_gameOver,0.8,{scale:0,ease :Back.easeIn,onComplete:gameoverUIHideComplete});
	};

}());