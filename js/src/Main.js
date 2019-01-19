window.onload=loadAssets;
// var stats;

function loadAssets()
{
	assetsManager=new FruitGame.AssetsManager();
	assetsManager.addEventListener("complete",init);
	assetsManager.start();
};
function init()
{
	document.getElementById("loading").style.display='none';
	if (multiplayer){

		topLeftCanvas=document.getElementById("top-left");
		topLeftCanvas.style.display="block";
		topLeftCanvas.width=gameWidth / 2;
		topLeftCanvas.height=gameHeight;
		topLeftCanvas.style.width = 'auto';
		topLeftContext=topLeftCanvas.getContext("2d");
		topLeftContext.globalCompositeOperation = "lighter";


		middleLeftCanvas=document.getElementById("middle-left");
		middleLeftCanvas.style.display="block";
		middleLeftCanvas.width=gameWidth / 2;
		middleLeftCanvas.height=gameHeight;
		middleLeftCanvas.style.width = 'auto';
		middleLeftContext=middleLeftCanvas.getContext("2d");

		bottomLeftCanvas=document.getElementById("bottom-left");
		bottomLeftCanvas.style.display="block";
		// bottomLeftCanvas.style.dispaly="none";
		bottomLeftCanvas.width=gameWidth / 2;
		bottomLeftCanvas.height=gameHeight;
		bottomLeftCanvas.style.width = 'auto';
		bottomLeftContext=bottomLeftCanvas.getContext("2d");
		bottomLeftContext.fillStyle="white";
		bottomLeftContext.textAlign="left";
		bottomLeftContext.textBaseline="top";




		topRightCanvas=document.getElementById("top-right");
		topRightCanvas.style.display="block";
		topRightCanvas.width=gameWidth / 2;
		topRightCanvas.height=gameHeight;
		topRightCanvas.style.width = 'auto';
		topRightCanvas.style.right = 0;
		topRightCanvas.style.left = 'auto';
		topRightContext=topRightCanvas.getContext("2d");
		topRightContext.globalCompositeOperation = "lighter";


		middleRightCanvas=document.getElementById("middle-right");
		middleRightCanvas.style.display="block";
		middleRightCanvas.width=gameWidth / 2;
		middleRightCanvas.height=gameHeight;
		middleRightCanvas.style.width = 'auto';
		middleRightCanvas.style.right = 0;
		middleRightCanvas.style.left = 'auto';
		middleRightContext=middleRightCanvas.getContext("2d");

		bottomRightCanvas=document.getElementById("bottom-right");
		bottomRightCanvas.style.display="block";
		// bottomRightCanvas.style.dispaly="none";
		bottomRightCanvas.width=gameWidth / 2;
		bottomRightCanvas.height=gameHeight;
		bottomRightCanvas.style.width = 'auto';
		bottomRightCanvas.style.right = 0;
		bottomRightCanvas.style.left = 'auto';
		bottomRightContext=bottomRightCanvas.getContext("2d");
		bottomRightContext.fillStyle="white";
		bottomRightContext.textAlign="Right";
		bottomRightContext.textBaseline="top";

		// topCanvas=document.getElementById("top");
		// topContext=topCanvas.getContext("2d");
		// bottomCanvas=document.getElementById("bottom");
		// bottomContext=bottomCanvas.getContext("2d");
		// middleCanvas=document.getElementById("middle");
		// middleContext=middleCanvas.getContext("2d");
	}
		topCanvas=document.getElementById("top");
		topCanvas.style.display="block";
		topCanvas.width=gameWidth;
		topCanvas.height=gameHeight;
		topContext=topCanvas.getContext("2d");
		topContext.globalCompositeOperation = "lighter";


		middleCanvas=document.getElementById("middle");
		middleCanvas.style.display="block";
		middleCanvas.width=gameWidth;
		middleCanvas.height=gameHeight;
		middleContext=middleCanvas.getContext("2d");

		bottomCanvas=document.getElementById("bottom");
		bottomCanvas.style.display="block";
		// bottomCanvas.style.dispaly="none";
		bottomCanvas.width=gameWidth;
		bottomCanvas.height=gameHeight;
		bottomContext=bottomCanvas.getContext("2d");
		bottomContext.fillStyle="white";
		bottomContext.textAlign="left";
		bottomContext.textBaseline="top";
		
		textCanvas=document.getElementById("text");
		textCanvas.style.display="block";
		// textCanvas.style.dispaly="none";
		textCanvas.width=gameWidth;
		textCanvas.height=gameHeight;
		textContext=textCanvas.getContext("2d");
		textContext.fillStyle="white";
		textContext.textAlign="left";
		textContext.textBaseline="top";
	//canvas








	//particle system
	particleSystem = new SPP.ParticleSystem();
	particleSystem.start();
	bladeSystem=new SPP.ParticleSystem();
	bladeSystem.start();
	fruitSystem=new SPP.ParticleSystem();
	fruitSystem.start();
	bombSystem=new SPP.ParticleSystem();
	bombSystem.start();
	gravity = new SPP.Gravity(0.15);

	//data
	if (typeof chrome.storage != "undefined")
		storage = chrome.storage.local;
	else
		storage = window.localStorage
	if(!storage.highScore)
	storage.highScore=0;
	gameState=GAME_READY;
	if (multiplayer){
		scoreRight=0;
		scoreLeft=0;
		gameLifeLeft=5;
		ui_gamelifeTextureLeft=assetsManager["gamelife-5"];
		gameLifeRight=5;
		ui_gamelifeTextureRight=assetsManager["gamelife-5"];
	} else {
		score=0;
		gameLife=5;
		ui_gamelifeTexture=assetsManager["gamelife-5"];
	}
	gameLevel=0.1;

    // fps
    // stats = new Stats();
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.left = '0px';
		// stats.domElement.style.top = '0px';
		// stats.domElement.style.display = 'none';
    // document.body.appendChild( stats.domElement );

	if (multiplayer){
		topLeftCanvas.addEventListener('mousemove', mousemove, false);
		topLeftCanvas.addEventListener('mouseleave', mouseleave, false);
		topLeftCanvas.addEventListener('mouseenter', mouseenter, false);
		topRightCanvas.addEventListener('mousemove', mousemove, false);
		topRightCanvas.addEventListener('mouseleave', mouseleave, false);
		topRightCanvas.addEventListener('mouseenter', mouseenter, false);
	}
		topCanvas.addEventListener('mousemove', mousemove, false);
		topCanvas.addEventListener('mouseleave', mouseleave, false);
		topCanvas.addEventListener('mouseenter', mouseenter, false);
	
	// Use hand tracking or mouse to control
	// handtracking = new HandTracking(topCanvas.width, topCanvas.height);
  // handtracking.tracker.params.simple = true;
	// handtracking.addEventListener('handmove', handmove);
	initEvents();
  render();
	enterGame();
	enterName();
	// initControl();
};
function enterGame()
{
	showStartGameUI();
};

function resetGameData()
{
	gameState=GAME_READY;
	if (multiplayer){
		scoreLeft=0;
		gameLifeLeft=5;
		ui_gamelifeTextureLeft=assetsManager["gamelife-5"];
		scoreRight=0;
		gameLifeRight=5;
		ui_gamelifeTextureRight=assetsManager["gamelife-5"];
		updateHudLeft = 0;
		updateHudRight = 0;
	} else {
		score=0;
		gameLife=5;
		ui_gamelifeTexture=assetsManager["gamelife-5"];
		updateHud=0;
	}
	updateAutomation=0;
	gameLevel=0.1;
}
function startGame(e)
{
	hideStartGameUI();

	startTime = new Date().getTime();
	bladeHistory = [];
	fruitHistory = [];

	resetGameData();
	showScoreUI();
	gameState=GAME_PLAYING;
	if (multiplayer){
		document.body.className += ' playing';
	}
}
function renderTimer()
{
	if(gameState!=GAME_PLAYING)return;
	timer+=SPP.frameTime;
	if(timer>=interval)
	{
		timer=0;
		throwObject();
	}
};
function throwObject()
{
    var n=(Math.random()*4>>0)+1;
    for(var i=0;i<n;i++)
    {
			if (multiplayer){
				if(isThrowBomb()){
					throwBomb(middleLeftContext);
					throwBomb(middleRightContext);

				} else {
					throwFruit(middleLeftContext, 'left');
					throwFruit(middleRightContext, 'right');
				}
				} else {
					if(isThrowBomb())throwBomb(middleContext);
					else throwFruit(middleContext);
				};
			}
  //  createjs.Sound.play("throwFruit");
}
function isThrowBomb()
{
	// return false;
	var n=Math.random() * 2;
	if(n<gameLevel)return true;
	return false;
};
function levelUpdate()
{
	gameLevel+=levelStep;
	if(gameLevel>1)
	{
		gameLevel=0.1;
	}
};
function neonWrite(text, ctx, x, y, fontSize=30){
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
function typeToScreen(text, x, y, delay=250, fontSize = 30){
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

function clearText(x=0,y=0,width=gameWidth,height=gameHeight){
	textContext.clearRect(x, y, width, height);
}

function flashInput(x, y, char, delay=250, fontSize=90){
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
function enterName(){
	var text = (playerName+('_'.repeat(nameLength - playerName.length))).split('').join(' ');
	typeToScreen('Name:', 50, 300, 250, 90).then(() =>
		typeToScreen(text, 50 + textContext.measureText('Name: ').width, 300, 250, 90).then(() =>
			flashInput(50 + textContext.measureText('Name: ').width, 300, '_', 700, 90)
		)
	)
}

function gameOver(side='middle')
{
	if(gameState==GAME_OVER)return;
	slowMo = true;
	var l = fruitSystem.getParticles().length;
	while (l-- > 0)
	{
		fruitSystem.getParticles()[l].removeEventListener("dead",missHandler);
	}
	gameState=GAME_OVER;
	
	if (multiplayer){
		if (side === 'left') {
			gameLifeLeft=0;
			ui_gamelifeTextureLeft=assetsManager["gamelife-"+gameLifeLeft];
			ui_gameLifeLeft.texture=ui_gamelifeTextureLeft;
		} else if (side === 'right'){
			gameLifeRight=0;
			ui_gamelifeTextureRight=assetsManager["gamelife-"+gameLifeRight];
			ui_gameLifeRight.texture=ui_gamelifeTextureRight;
		}

		document.body.className ='';
	} else {
		gameLife=0;
		ui_gamelifeTexture=assetsManager["gamelife-"+gameLife];
		ui_gameLife.texture=ui_gamelifeTexture;
	}
	if(score>parseInt(storage["highScore"]))storage.highScore=score;
	showGameoverUI();
};
function gameOverComplete()
{
	replay();
};

function replay(e)
{
	hideGameoverUI();
};

function mouseleave(e){
	allBlades = {};
	bladeSystems = {};
}
function mouseenter(e){
	allBlades = {mouse: bladeColors[Math.floor(Math.random() * bladeColors.length)]};

	// bladeSystem.start();
	bladeSystems['mouse'] = new SPP.ParticleSystem();
	bladeSystems['mouse'].start();
	bladeContexes['mouse'] = e.target.getContext('2d');
	bladeCanvases['mouse'] = e.target.canvas;
}
//mouse event
function touchesHandler(e) {
	const touches = e.changedTouches;
	const newBlades = {};
	for(let i = 0; i< touches.length; i++){
		var prefix = 'touch';
		if (touches[i].identifier >= bladeReplayIdentifier){
			prefix = 'replay'
		} else if (touches[i].identifier > autoIdentifier){
			prefix = 'auto'
		}
		if (!bladeSystems[prefix+touches[i].identifier]){
			bladeSystems[prefix+touches[i].identifier] = new SPP.ParticleSystem();
			bladeSystems[prefix+touches[i].identifier].start();
			bladeCanvases[prefix+touches[i].identifier] = e.target;
			bladeContexes[prefix+touches[i].identifier] = e.target.getContext('2d');
		}

		newBlades[prefix+touches[i].identifier] = bladeColors[i]
		touchHandler(e, touches[i], prefix +touches[i].identifier);
	}
	allBlades = newBlades;
};

//mouse event
function mousemove(e) {

	// Get the mouse position relative to the canvas element.
	if (e.layerX || e.layerX == 0)
	{
		// Firefox
		mouse.x = e.layerX;
		mouse.y = e.layerY;
	} else if (e.offsetX || e.offsetX == 0)
	{ // Opera
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
	};
	buildBladeParticle(mouse.x, mouse.y, 'mouse');
};
//hand tracking event
function handmove(e) {
	allBlades=[bladeColors[0]]
	buildBladeParticle(e.x, e.y, 'mouse');
	console.log(e);
}
//render canvas
function render()
{
	setTimeout(() => {
		requestAnimationFrame(render);
	}, slowMo ? 20 : 0)
	// handtracking.tick();

	if (multiplayer){
		topContext.clearRect(0,0,gameWidth,gameHeight);
		middleContext.clearRect(0,0,gameWidth,gameHeight);
		bottomContext.clearRect(0,0,gameWidth,gameHeight);

		topLeftContext.clearRect(0,0,gameWidth/2,gameHeight);
		middleLeftContext.clearRect(0,0,gameWidth/2,gameHeight);
		bottomLeftContext.clearRect(0,0,gameWidth/2,gameHeight);
		showScoreTextUI(bottomLeftContext, scoreLeft);
		
		topRightContext.clearRect(0,0,gameWidth/2,gameHeight);
		middleRightContext.clearRect(0,0,gameWidth/2,gameHeight);
		bottomRightContext.clearRect(0,0,gameWidth/2,gameHeight);
		showScoreTextUI(bottomRightContext, scoreRight);

		if (gameState === GAME_PLAYING){
			topCanvas.style.display = 'block';
			bottomCanvas.style.display = 'block';
			middleCanvas.style.display = 'block';

			topLeftCanvas.style.display = 'block';
			bottomLeftCanvas.style.display = 'block';
			middleLeftCanvas.style.display = 'block';
			
			topRightCanvas.style.display = 'block';
			bottomRightCanvas.style.display = 'block';
			middleRightCanvas.style.display = 'block';
		} else {
			topLeftCanvas.style.display = 'none';
			bottomLeftCanvas.style.display = 'none';
			middleLeftCanvas.style.display = 'none';
			
			topRightCanvas.style.display = 'none';
			bottomRightCanvas.style.display = 'none';
			middleRightCanvas.style.display = 'none';

			topCanvas.style.display = 'block';
			bottomCanvas.style.display = 'block';
			middleCanvas.style.display = 'block';
		}
	} else {
		topContext.clearRect(0,0,gameWidth,gameHeight);
		middleContext.clearRect(0,0,gameWidth,gameHeight);
		bottomContext.clearRect(0,0,gameWidth,gameHeight);
		showScoreTextUI(bottomContext, score);
	}
	if (gameState === GAME_PLAYING){
		clearText();
	}

	fruitSystem.render();
	bombSystem.render();
	particleSystem.render();
	if (transparency){
		middleContext.globalAlpha = .3;
	} else {
		middleContext.globalAlpha = 1;
	}
	if (isAutomation || isAutomationLeft || isAutomationRight){
		var keys = [];
		if (isAutomation){
			keys.push('middle');
		} 
		if (isAutomationLeft) {
			keys.push('left');
		}
		if (isAutomationRight) {
			keys.push('right');
		}
		keys.forEach(key => {
			var wrapClass = 'wrapper' + (key !== 'middle' ? '-' + key : '');
			var wrapper = document.getElementsByClassName(wrapClass)[0];
			if (!(key in automations)){
				automations[key] = new Date().getTime();
				wrapper.className = wrapClass + ' frenzy';
				createjs.Sound.play("automationMode");
			} else {
				if (new Date().getTime() - automations[key] > 10000){
					delete automations[key];
					if (key === 'left'){
						isAutomationLeft = false;
					} else if (key === 'right'){
						isAutomationRight = false;
					} else {
						isAutomation = false;
					}
					slowMo = true;
					setTimeout(()=>slowMo = false, 5000)
					wrapper.className = wrapClass;
				}
			}
		})

		if (Object.keys(automations).length > 0){
			runAutomation();
			interval = .4;
		} else {
			interval = 1.8;
		}
	}
	
	Object.keys(bladeSystems).forEach(key => bladeSystems[key].render())
	// bladeSystem.render();

	Object.keys(allBlades).forEach(key => buildColorBlade(allBlades[key], bladeWidth, key))
	// bladePartic = {};
	collideTest();
	levelUpdate();
	renderTimer();
	// stats.update();
};

function getRandomStartPoint(x, y, radius){
	var angle = Math.random() * Math.PI * 2;
	return {
		x: Math.cos(angle) * radius + radius + x,
		y: Math.sin(angle) * radius + radius + y
	};
}

function runAutomation() {
	var l = fruitSystem.getParticles().length;
	var uncutFalling = fruitSystem.getParticles().filter(p => p.dropScore > 0 && p.velocity.y > 1 && (new Date().getTime()) - p.autoCut > 350);
	var lowestFruits = uncutFalling.sort((a, b) => a.position.y < b.position.y ? 1 : -1);
	var fruitsToCut = [];
	Object.keys(automations).forEach(key => lowestFruits.filter(fruit => fruit.side === key).slice(0, 2).forEach(obj => fruitsToCut.push(obj)))
	if (!fruitsToCut)
		return
	fruitsToCut.forEach(lowestFruit => {
		var cutFruits = fruitSystem.getParticles().filter(p => p.autoCut);
		var bladeStart = getRandomStartPoint(lowestFruit.position.x, lowestFruit.position.y, lowestFruit.radius);
		var bladeEnd = {
			x: lowestFruit.position.x > bladeStart.x ? bladeStart.x + lowestFruit.radius * 1.5 : bladeStart.x - lowestFruit.radius * 1.5 ,
			y: lowestFruit.position.y > bladeStart.y ? bladeStart.y + lowestFruit.radius * 1.5 : bladeStart.y - lowestFruit.radius * 1.5
		};
		var canvas;
		if (lowestFruit.side === 'left' ) {
			if (!isAutomationLeft)
				return
			canvas = topLeftCanvas;
		} else if (lowestFruit.side === 'right'){
			if (!isAutomationRight)
				return
			canvas = topRightCanvas;
		} else {
			if (!isAutomation)
				return
			canvas = topCanvas;
		}
		var e = new TouchEvent('touchmove', {changedTouches: [new Touch({clientX: bladeStart.x, clientY: bladeStart.y, identifier: autoIdentifier + cutFruits.length + 1, target: canvas})]});
		// e.touches = [{pageX: bladeStart.x, pageY: bladeStart.y}]
		canvas.dispatchEvent(e);
		// e = new TouchEvent('touchmove');
		var e = new TouchEvent('touchmove', {changedTouches: [new Touch({clientX: bladeEnd.x, clientY: bladeEnd.y, identifier: autoIdentifier + cutFruits.length + 1, target: canvas})]});
		// e.touches = [{pageX: bladeEnd.x, pageY: bladeEnd.y}]
		canvas.dispatchEvent(e);
		lowestFruit.autoCut = new Date().getTime();
	})
}
async function replayLastGame(){
	hideStartGameUI();
	// bottomContext.clearRect(0,0,gameWidth,gameHeight);
	resetGameData()
	showScoreUI()
	gameState = REPLAY;
	replayBlade();
	replayFruits();
}
async function replayBlade(){
	bladeHistory.forEach(tp => {
		setTimeout(() => {
			var e = new TouchEvent('touchmove', {changedTouches: [new Touch({clientX: tp.x, clientY: tp.y, identifier: bladeReplayIdentifier, target: topCanvas})]});
			topCanvas.dispatchEvent(e);
		}, tp.time - startTime);
	})
}
async function replayFruits(){
	fruitHistory.forEach(tp => {
		setTimeout(() => {
			
			const {yv, rv, x, y, life, texture, side, bottomY, context, isBomb} = tp;
			const p = isBomb ? bombSystem.createParticle(FruitGame.Fruit) : fruitSystem.createParticle(FruitGame.Fruit);
			p.velocity.reset(0, yv);
			p.velocity.rotate(rv);
			p.damp.reset(0, 0);
			p.addForce("g", gravity);
			p.addEventListener("dead",missHandler);
			if (isBomb){
				p.updatePic = 0
				p.onUpdate = bombUpdate;
				p.init(x, y,life,texture,assetsManager.shadow,context);
			} else {
				p.init(x, y,life,texture.w,assetsManager.shadow,context,texture.next,texture.life);
				p.textureObj=texture;
				p.side = side;

			}
			// p.init(gameWidth*0.5+(1-Math.random()*2)*200, gameHeight+textureObj.w.height,Infinity,textureObj.w,assetsManager.shadow,middleContext,textureObj.next,textureObj.life);
			p.bottomY=bottomY;

		}, tp.time - startTime);
	})
}
var GameControl = {
  message: 'Game Control',
  moveThreshold: 5,
  depthThreshold: 70,
  displayShadow: true,
  mirror: true,
};

function initControl() {
  var gui = new dat.GUI();
  gui.add(GameControl, 'message');
  gui.add(GameControl, 'moveThreshold', 0, 10).step(1.0);
  gui.add(GameControl, 'depthThreshold', 10, 255).step(1.0).onChange(function(value) {
    // handtracking.tracker.params.depthThreshold = value;
  });
  gui.add(GameControl, 'displayShadow').onChange(function(value) {
    var shadowCanvas = document.getElementById("shadow");
    if (value)
       shadowCanvas.style.display="block";
    else
       shadowCanvas.style.display="none";
  });
  gui.add(GameControl, 'mirror');
  gui.close();
};

function touchHandler(event, touch, key) {
	// var touch = event.changedTouches[0];

	// var simulatedEvent = document.createEvent("MouseEvent");
	// 		simulatedEvent.initMouseEvent({
	// 		touchstart: "mousedown",
	// 		touchmove: "mousemove",
	// 		touchend: "mouseup"
	// }[event.type], true, true, window, 1,
	// 		touch.screenX, touch.screenY,
	// 		touch.clientX, touch.clientY, false,
	// 		false, false, false, 0, null);

	// touch.target.dispatchEvent(simulatedEvent);
	// event.preventDefault();

	// Get the mouse position relative to the canvas element.
	buildBladeParticle(touch.clientX, touch.clientY, key);
	event.preventDefault();
}
function handleName(e){
	if (((e.keyCode > 65 && e.keyCode < 90) || (e.keyCode > 48 && e.keyCode < 57))&& playerName.length < nameLength){
		playerName += e.key.toUpperCase();
	}
	if (e.keyCode === 8){
		playerName = playerName.slice(0, -1);
	}
	// e.preventDefault();
};


function initEvents() {
	// topCanvas=document.getElementById("top");
	if (multiplayer) {
		topLeftCanvas.addEventListener("touchstart", touchesHandler, true);
		topLeftCanvas.addEventListener("touchmove", touchesHandler, true);
		topLeftCanvas.addEventListener("touchend", touchesHandler, true);
		topLeftCanvas.addEventListener("touchcancel", touchesHandler, true);
		topRightCanvas.addEventListener("touchstart", touchesHandler, true);
		topRightCanvas.addEventListener("touchmove", touchesHandler, true);
		topRightCanvas.addEventListener("touchend", touchesHandler, true);
		topRightCanvas.addEventListener("touchcancel", touchesHandler, true);
		document.body.addEventListener("keydown", (e) => {if(e.keyCode === 13){isAutomationLeft = true}}, true);
		document.body.addEventListener("keydown", (e) => {if(e.keyCode === 8){isAutomationRight = true}}, true);
	} else {
		topCanvas.addEventListener("touchstart", touchesHandler, true);
		topCanvas.addEventListener("touchmove", touchesHandler, true);
		topCanvas.addEventListener("touchend", touchesHandler, true);
		topCanvas.addEventListener("touchcancel", touchesHandler, true);
		document.body.addEventListener("keydown", (e) => {if(e.keyCode === 13){isAutomation = true}}, true);
		document.body.addEventListener("keydown", (e) => {if(e.keyCode === 16){slowMo = !slowMo}}, true);
		document.body.addEventListener("keydown", (e) => {if(e.keyCode === 8 && gameState === GAME_PLAYING){transparency = !transparency}}, true);
		document.body.addEventListener("keydown", (e) => {if(e.keyCode === 27){ultraSlice = !ultraSlice}}, true);
		document.body.addEventListener("keydown", (e) => {handleName(e)}, true);
	}
}

// const clock = (time_warp = 1) => {
    
// 	let starting_time = Date.now(),
// 			offset = 0;
				
// 	let clock = {
			
// 			'tick' : () => (Date.now() - starting_time) * time_warp + offset,
			
// 			'warp' : factor => {
// 					offset = clock.tick();
// 					starting_time = Date.now();
// 					time_warp = factor;
// 			}
			
// 	};
	
// 	return clock;
	
// };