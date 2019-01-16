window.onload=loadAssets;
var stats;

function loadAssets()
{
	assetsManager=new FruitGame.AssetsManager();
	assetsManager.addEventListener("complete",init);
	assetsManager.start();
};
function init()
{
	document.getElementById("loading").style.display='none';
	document.getElementById("info").style.display='block';

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
		bottomLeftContext.fillStyle="rgb(235, 63, 124)";
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
		bottomRightContext.fillStyle="rgb(235, 63, 124)";
		bottomRightContext.textAlign="Right";
		bottomRightContext.textBaseline="top";
	} else {
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
		bottomContext.fillStyle="rgb(235, 63, 124)";
		bottomContext.textAlign="left";
		bottomContext.textBaseline="top";
	}
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
	score=0;
	gameLife=5;
	ui_gamelifeTexture=assetsManager["gamelife-5"];
	gameLevel=0.1;

    // fps
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		stats.domElement.style.display = 'none';
    document.body.appendChild( stats.domElement );

	if (multiplayer){
		topLeftCanvas.addEventListener('mousemove', mousemove, false);
		topLeftCanvas.addEventListener('mouseleave', mouseleave, false);
		topLeftCanvas.addEventListener('mouseenter', mouseenter, false);
		topRightCanvas.addEventListener('mousemove', mousemove, false);
		topRightCanvas.addEventListener('mouseleave', mouseleave, false);
		topRightCanvas.addEventListener('mouseenter', mouseenter, false);
	} else {
		topCanvas.addEventListener('mousemove', mousemove, false);
		topCanvas.addEventListener('mouseleave', mouseleave, false);
		topCanvas.addEventListener('mouseenter', mouseenter, false);
	}
	// Use hand tracking or mouse to control
	handtracking = new HandTracking(topCanvas.width, topCanvas.height);
  handtracking.tracker.params.simple = true;
	handtracking.addEventListener('handmove', handmove);
	initEvents();
  render();
	enterGame();

	// initControl();
};
function enterGame()
{
	showStartGameUI();
};

function resetGameData()
{
	gameState=GAME_READY;
	score=0;
	gameLife=5;
	ui_gamelifeTexture=assetsManager["gamelife-5"];
	gameLevel=0.1;
}
function startGame(e)
{
	hideStartGameUI();

	resetGameData();
	showScoreUI();
	gameState=GAME_PLAYING;

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
					throwFruit(middleLeftContext);
					throwFruit(middleRightContext);
				}
				} else {
					if(isThrowBomb())throwBomb(middleContext);
					else throwFruit(middleContext);
				};
			}
   createjs.Sound.play("throwFruit");
}
function isThrowBomb()
{
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

function gameOver()
{
	if(gameState==GAME_OVER)return;
	var l = fruitSystem.getParticles().length;
	while (l-- > 0)
	{
		fruitSystem.getParticles()[l].removeEventListener("dead",missHandler);
	}
	gameState=GAME_OVER;
	gameLife=0;
	ui_gamelifeTexture=assetsManager["gamelife-"+gameLife];
	ui_gameLife.texture=ui_gamelifeTexture;
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
		if (touches[i].identifier > autoIdentifier){
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
	requestAnimationFrame(render);
	handtracking.tick();

	if (multiplayer){
		topLeftContext.clearRect(0,0,gameWidth / 2,gameHeight);
		middleLeftContext.clearRect(0,0,gameWidth / 2,gameHeight);
		bottomLeftContext.clearRect(0,0,gameWidth / 2,gameHeight);
		showScoreTextUI(bottomLeftContext, scoreLeft);

		topRightContext.clearRect(gameWidth / 2,0,gameWidth / 2,gameHeight);
		middleRightContext.clearRect(gameWidth / 2,0,gameWidth / 2,gameHeight);
		bottomRightContext.clearRect(gameWidth / 2,0,gameWidth / 2,gameHeight);
		showScoreTextUI(bottomRightContext, scoreRight);

	} else {
		topContext.clearRect(0,0,gameWidth,gameHeight);
		middleContext.clearRect(0,0,gameWidth,gameHeight);
		bottomContext.clearRect(0,0,gameWidth,gameHeight);
		showScoreTextUI(bottomContext, score);
	}

	fruitSystem.render();
	bombSystem.render();
	particleSystem.render();
	runAutomation();
	Object.keys(bladeSystems).forEach(key => bladeSystems[key].render())
	// bladeSystem.render();

	Object.keys(allBlades).forEach(key => buildColorBlade(allBlades[key], bladeWidth, key))
	// bladePartic = {};
	collideTest();
	levelUpdate();
	renderTimer();
	stats.update();
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
	var lowestFruits = uncutFalling.sort((a, b) => a.position.y < b.position.y ? 1 : -1).slice(0, 2);
	if (!lowestFruits)
	return
	lowestFruits.forEach(lowestFruit => {
		var cutFruits = fruitSystem.getParticles().filter(p => p.autoCut);
		var bladeStart = getRandomStartPoint(lowestFruit.position.x, lowestFruit.position.y, lowestFruit.radius);
		var bladeEnd = {
			x: lowestFruit.position.x > bladeStart.x ? bladeStart.x + lowestFruit.radius * 1.5 : bladeStart.x - lowestFruit.radius * 1.5 ,
			y: lowestFruit.position.y > bladeStart.y ? bladeStart.y + lowestFruit.radius * 1.5 : bladeStart.y - lowestFruit.radius * 1.5
		};
		var e = new TouchEvent('touchmove', {changedTouches: [new Touch({clientX: bladeStart.x, clientY: bladeStart.y, identifier: autoIdentifier + cutFruits.length + 1, target: topCanvas})]});
		// e.touches = [{pageX: bladeStart.x, pageY: bladeStart.y}]
		topCanvas.dispatchEvent(e);
		// e = new TouchEvent('touchmove');
		var e = new TouchEvent('touchmove', {changedTouches: [new Touch({clientX: bladeEnd.x, clientY: bladeEnd.y, identifier: autoIdentifier + cutFruits.length + 1, target: topCanvas})]});
		// e.touches = [{pageX: bladeEnd.x, pageY: bladeEnd.y}]
		topCanvas.dispatchEvent(e);
		lowestFruit.autoCut = new Date().getTime();
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
    handtracking.tracker.params.depthThreshold = value;
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
	} else {
		topCanvas.addEventListener("touchstart", touchesHandler, true);
		topCanvas.addEventListener("touchmove", touchesHandler, true);
		topCanvas.addEventListener("touchend", touchesHandler, true);
		topCanvas.addEventListener("touchcancel", touchesHandler, true);
	}
}
