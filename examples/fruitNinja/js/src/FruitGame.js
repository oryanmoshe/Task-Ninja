var FruitGame = FruitGame || {
	REVISION : '1',
	AUTHOR : "flashhawk",
	GITHUB:"https://github.com/flashhawk"
};

var gameWidth=window.innerWidth;
var gameHeight=window.innerHeight;

var topCanvas;
var topContext;
var middleCanvas;
var middleContext;
var bottomCanvas;
var bottomContext;
var bottomScoreContext;

var topLeftCanvas;
var topLeftContext;
var middleLeftCanvas;
var middleLeftContext;
var bottomLeftCanvas;
var bottomLeftContext;
var bottomLeftScoreContext;

var topRightCanvas;
var topRightContext;
var middleRightCanvas;
var middleRightContext;
var bottomRightCanvas;
var bottomRightContext;
var bottomRightScoreContext;

var particleSystem;
var fruitSystem;
var bombSystem;
var bladeSystem;
var gravity;

var timer=0;
var interval=1.8;


var bladeColor;
var bladeWidth;
//game data
var mouse = {};
var score;
var scoreLeft;
var scoreRight;
var gameLife;
var gameLifeLeft;
var gameLifeRight;
var storage;
var isPlaying;
var GAME_READY=1,GAME_PLAYING=2,GAME_OVER=3;
var gameState;
var gameLevel;
var levelStep=0.0001;

//start game ui
var ui_gameTitle;
var ui_newGame;
var ui_startFruit;

var ui_scoreIcon;
var ui_gameLife;
var ui_gamelifeTexture;
var ui_gameover;

//--collideTest
var collide;
var allBlades={};
var bladeSystems={};
var bladeColors=['#00FF00', '#FF0000', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
var isAutomation=true;
var autoIdentifier=30;

var bladeCanvases = {};
var bladeContexes = {};
var multiplayer = false;