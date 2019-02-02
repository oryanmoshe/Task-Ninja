(function() {
	neonWrite = function(text, ctx, x, y, fontSize=30){
		ctx.shadowBlur = 50;
		ctx.shadowColor = "rgb(68,79,170)";
		ctx.font = fontSize+"px 'Lucida Console', Monaco, monospace";
		ctx.fillStyle = "rgb(187,124,245)"
		ctx.fillText(text, x-4, y);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "rgb(166,57,225)"
		ctx.fillStyle = "white"
		ctx.fillText(text, x, y);
		ctx.strokeText(text, x, y);
		// ctx.fillText(text, x+3, y);
	}
	blackWrite = function(text, ctx, x, y, fontSize=30){
		ctx.font = fontSize+"px 'Lucida Console', Monaco, monospace";
		ctx.fillStyle = "rgb(30,30,30)"
		ctx.fillText(text, x, y);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "rgb(30,30,30)"
		ctx.fillStyle = "black"
		ctx.fillText(text, x, y);
		ctx.strokeText(text, x, y);
		// ctx.fillText(text, x+3, y);
	}
	typeToScreen = function(text, x, y, delay=0, fontSize = 30, writingFunc = neonWrite, context = textContext){
		return new Promise(resolve => {
			context.fillStyle = "white";
			context.font = fontSize+"px 'Lucida Console', Monaco, monospace";
			var count = 0;
			var chars;
			function draw() {
					count ++;
					// Grab all the characters up to count
					chars = text.substr(0, count);
					// Clear the canvas each time draw is called
					clearText(x-30, y-30, fontSize * text.length +40, fontSize+90);
					// Draw the characters to the canvas
					writingFunc(chars, context, x, y, fontSize);
					// textContext.fillText(chars, x, y);
					if (count <= text.length){
						setTimeout(draw, delay);
					} else {
						resolve(true);
					}
				}
				draw();
		});
	}

	clearText = function(x=0,y=0,width=gameWidth,height=gameHeight){
		textContext.clearRect(x, y, width, height);
	}
	clearScores = function(x=0,y=0,width=gameWidth,height=gameHeight){
		scoreContext.clearRect(x, y, width, height);
	}
	flashInput = function(x, y, char, delay=150, fontSize=90){
		var textWidth = textContext.measureText(char);
		var spaceWidth = textContext.measureText(' ');
		var offset = playerName.length * textWidth.width + (spaceWidth.width * playerName.length);
		var text = (playerName+('_'.repeat(nameLength - playerName.length))).split('').join(' ');
		clearText(x-30, y-30, textContext.measureText(text).width+55, fontSize + 90)
		neonWrite(text, textContext, x, y, fontSize);
		typeToScreen(playerName.length >= nameLength ? '' : char, offset + x, y, delay, fontSize).then(() => {
			if(gameState == GAME_OVER){
			window.flashTimer=setTimeout(() => {
				flashInput(x, y, char, delay, fontSize)
			}, delay);
			clearText(offset+(x-30), y-30, textWidth.width+40, fontSize + 90);
		}else{
			clearText(0,0, gameWidth, gameHeight)
		}
		;})
	}

	enterName = function(){
		var text = (playerName+('_'.repeat(nameLength - playerName.length))).split('').join(' ');
		typeToScreen('Enter Name', 750, 300, 0, 70).then(() =>
			typeToScreen(text, 750, 450, 0, 120).then(() =>
				flashInput(750, 450, '_', 150, 120)
			)
		)
	}
	//text, x, y, delay=0, fontSize = 30
	enterScore = function(){
		debugger;
		typeToScreen('Score:', 100, 300, 0, 70)
		console.log(score.toString() );
		typeToScreen(score.toString() , 100, 450, 0, 120)
	}

	enterScores = function(scores){
		debugger;
		scores.forEach(function(score, index){
			console.log(score['username']);
			typeToScreen(score['username'].toString(), 1030, 255 + (index*69), 0, 30, blackWrite, scoreContext)
			typeToScreen(score['score'].toString(), 1270, 255 + (index*69), 0, 30, blackWrite, scoreContext)
		})
	}

	enterNameDelay = function(delay){
		setTimeout(enterName, delay*1000);
	}

	enterScoreDelay = function(delay){
		setTimeout(enterScore, delay*1000);
	}

	handleName = function(e){
		if (((e.keyCode >= 65 && e.keyCode < 90) || (e.keyCode > 48 && e.keyCode < 57))&& playerName.length < nameLength){
			playerName += e.key.toUpperCase();
		}
		if (e.keyCode === 8){
			playerName = playerName.slice(0, -1);
		}
		// e.preventDefault();
	};


}());
