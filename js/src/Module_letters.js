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
	typeToScreen = function(text, x, y, delay=0, fontSize = 30){
		return new Promise(resolve => {
			textContext.fillStyle = "white";
			textContext.font = fontSize+"px 'Lucida Console', Monaco, monospace";
			var count = 0;
			var chars;
			function draw() {
					count ++;
					// Grab all the characters up to count
					chars = text.substr(0, count);
					// Clear the canvas each time draw is called
					clearText(x-30, y-30, fontSize * text.length +40, fontSize+90);
					// Draw the characters to the canvas
					neonWrite(chars, textContext, x, y, fontSize);
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

	flashInput = function(x, y, char, delay=150, fontSize=90){
		var textWidth = textContext.measureText(char);
		var spaceWidth = textContext.measureText(' ');
		var offset = playerName.length * textWidth.width + (spaceWidth.width * playerName.length);
		var text = (playerName+('_'.repeat(nameLength - playerName.length))).split('').join(' ');
		clearText(x-30, y-30, textContext.measureText(text).width+55, fontSize + 90)
		neonWrite(text, textContext, x, y, fontSize);
					// textContext.fillText(text, x, y);
		typeToScreen(playerName.length >= nameLength ? '' : char, offset + x, y, delay, fontSize).then(() => {
			clearText(offset+(x-30), y-30, textWidth.width+40, fontSize + 90);
			window.flashTimer=setTimeout(() => {
				flashInput(x, y, char, delay, fontSize)
			}, delay);
		})
	}

	enterName = function(){
		var text = (playerName+('_'.repeat(nameLength - playerName.length))).split('').join(' ');
		typeToScreen('Name:', 50, 300, 0, 90).then(() =>
			typeToScreen(text, 50 + textContext.measureText('Name: ').width, 300, 0, 90).then(() =>
				flashInput(50 + textContext.measureText('Name: ').width, 300, '_', 150, 90)
			)
		)
	}

	enterNameDelay = function(delay){
		setTimeout(enterName, delay);
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
