window.FruitGame = window.FruitGame || {
	REVISION : '1',
	AUTHOR : "flashhawk",
	GITHUB:"https://github.com/flashhawk"
};

window.gameWidth=window.innerWidth;
window.gameHeight=window.innerHeight;

window.topCanvas = {};
window.topContext = {};
window.middleCanvas = {};
window.middleContext = {};
window.bottomCanvas = {};
window.bottomContext = {};
window.textCanvas = {};
window.scoreCanvas = {};

window.textContext = {};
window.scoreContext = {};

window.topLeftCanvas = {};
window.topLeftContext = {};
window.middleLeftCanvas = {};
window.middleLeftContext = {};
window.bottomLeftCanvas = {};
window.bottomLeftContext = {};
window.bottomLeftScoreContext = {};

window.topRightCanvas = {};
window.topRightContext = {};
window.middleRightCanvas = {};
window.middleRightContext = {};
window.bottomRightCanvas = {};
window.bottomRightContext = {};
window.bottomRightScoreContext = {};

window.particleSystem = {};
window.fruitSystem = {};
window.bombSystem = {};
window.bladeSystem = {};
window.gravity = {};

window.timer=0;
window.interval=1.8;


window.bladeColor = {};
window.bladeWidth = {};
//game data
window.mouse = {};
window.score = {};
window.scoreLeft=0;
window.scoreRight=0;
window.gameLife = {};
window.gameLifeLeft = {};
window.gameLifeRight = {};
window.storage = {};
window.isPlaying = {};
window.GAME_READY=1,GAME_PLAYING=2,GAME_OVER=3,REPLAY=4;
window.gameState = {};
window.gameLevel = {};
window.levelStep=0.0001;

//start game ui
window.ui_gameTitle = {};
window.ui_newGame = {};
window.ui_startFruit = {};

window.ui_scoreIcon = {};
window.ui_gameLife = {};
window.ui_gamelifeTexture = {};
window.ui_gameLifeLeft = {};
window.ui_gamelifeTextureLeft = {};
window.ui_gameLifeRight = {};
window.ui_gamelifeTextureRight = {};
window.ui_gameover = {};

//--collideTest
window.collide = {};
window.allBlades={};
window.bladeSystems={};
window.bladeColors=['#00FF00', '#FF0000', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
window.isAutomation=false;
window.isAutomationLeft=false;
window.isAutomationRight=false;
window.automations={};
window.automationStarted = {};
window.autoIdentifier=30;

window.bladeCanvases = {};
window.bladeContexes = {};
window.multiplayer = false;
window.lineDrawn = false;

window.startTime = {};
window.endTime = {};
window.bladeHistory=[];
window.fruitHistory=[];
window.cutHistory=[];
window.bladeReplayIdentifier=100;
window.bombUpdate = {};

window.slowMo = false;

window.updateHud = {};
window.updateHudLeft = {};
window.updateHudRight = {};
window.updateAutomation=0;
var ui_replayFruit;

window.transparency = false;
window.ultraSlice = false;
window.playerName='';
window.nameLength=3;
window.powerUpsHistory=[];
window.showGood = {};
window.showingGood=false;
window.ui_hudPowerActive={};
window.ui_hudPower={position: {}};
window.scoresController = {};
window.getStats = {};
window.isLlamas=false;
window.letters= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '@', '!', '&'];
window.themeMusic = {};
window.realSlowmo = false;

window.currentlyPlaying = {};
window.royTheme = {};
window.slowMoTheme = {};
window.kpiTheme = {};
window.gameOverTime = null;
window.startNewGame = {};
window.getLocation = {};