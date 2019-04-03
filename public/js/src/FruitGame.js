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
var textCanvas;
var scoreCanvas;

var textContext;
var scoreContext;

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
var scoreLeft=0;
var scoreRight=0;
var gameLife;
var gameLifeLeft;
var gameLifeRight;
var storage;
var isPlaying;
var GAME_READY=1,GAME_PLAYING=2,GAME_OVER=3,REPLAY=4;
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
var ui_gameLifeLeft;
var ui_gamelifeTextureLeft;
var ui_gameLifeRight;
var ui_gamelifeTextureRight;
var ui_gameover;

//--collideTest
var collide;
var allBlades={};
var bladeSystems={};
var bladeColors=['#00FF00', '#FF0000', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
var isAutomation=false;
var isAutomationLeft=false;
var isAutomationRight=false;
var automations={};
var automationStarted;
var autoIdentifier=30;

var bladeCanvases = {};
var bladeContexes = {};
var multiplayer = false;
var lineDrawn = false;

var startTime;
var endTime;
var bladeHistory=[];
var fruitHistory=[];
var cutHistory=[];
var bladeReplayIdentifier=100;
var bombUpdate;

var slowMo = false;

var updateHud;
var updateHudLeft;
var updateHudRight;
var updateAutomation=0;
var ui_replayFruit;

var transparency = false;
var ultraSlice = false;
var playerName='';
var nameLength=3;
var powerUpsHistory=[];
var showGood;
var showingGood=false;
var ui_hudPowerActive={};
var ui_hudPower={position: {}};
var scoresController;
var getStats;
var isLlamas=false;
var letters= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '@', '!', '&'];
var themeMusic = {};
var realSlowmo = false;

var currentlyPlaying = {};