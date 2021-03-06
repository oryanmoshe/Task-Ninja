FruitGame.assets = {
  fruits:       ["done", "working", "stuck",  "automation", "transparency", "slowMo", "llama", "mann", "kpi"],
  fruitsLives:  [1,       2,        3,        1,            1,              1,        1,       1,      1],
  nextFruits:   [null,   "done",   "working", null,         null,           null,     null,    null,   null],
  other: [
    { id: "gameover", src: "assets/gameover.png" },
    { id: "shadow", src: "assets/shadow.png" },
    { id: "bomb", src: "assets/bomb.png" },
    { id: "bomblight", src: "assets/bomb-light.png" },
    { id: "miss", src: "assets/miss.png" },
    { id: "score", src: "assets/score.png" },
    { id: "star", src: "assets/star.png" },

    { id: "hud", src: "assets/hud.png" },
    { id: "hudPower", src: "assets/hudPower.png" },
    { id: "hudbad", src: "assets/hudbad.png" },

    { id: "gamelife-5", src: "assets/5Life.png" },
    { id: "gamelife-4", src: "assets/4Life.png" },
    { id: "gamelife-3", src: "assets/3Life.png" },
    { id: "gamelife-2", src: "assets/2Life.png" },
    { id: "gamelife-1", src: "assets/1Life.png" },

    { id: "zinmanImage", src: "assets/zinman.png" },
    { id: "niceImage", src: "assets/Nice.png" },
    { id: "wowImage", src: "assets/wow.png" },
    { id: "boomImage", src: "assets/Boom.png" },
    { id: "excellentImage", src: "assets/Excellent_.png" },
    { id: "newgame", src: "assets/newgame-new.png" },
    
    { id: "automationPink", src: "assets/OtemationLogoPink.png" },
    { id: "automationBlue", src: "assets/OtemationLogoBlue.png" },
    { id: "automationGreen", src: "assets/OtemationLogoGreen.png" },
    { id: "automationActive", src: "assets/HUD_OtemationActive.png" },
    
    { id: "slowMoPink", src: "assets/TimeLineLogoPink.png" },
    { id: "slowMoBlue", src: "assets/TimeLineLogoBlue.png" },
    { id: "slowMoGreen", src: "assets/TimeLineLogoGreen.png" },
    { id: "slowMoActive", src: "assets/HUD_SlowMoActive.png" },
    
    { id: "transparencyPink", src: "assets/ZinmanPink.png" },
    { id: "transparencyBlue", src: "assets/ZinmanBlue.png" },
    { id: "transparencyGreen", src: "assets/ZinmanGreen.png" },
    { id: "transparencyActive", src: "assets/HUD_ZinmanActive.png" },

    { id: "kpiPink", src: "assets/KPIPink.png" },
    { id: "kpiBlue", src: "assets/KPIBlue.png" },
    { id: "kpiGreen", src: "assets/KPIGreen.png" },
    { id: "kpiActive", src: "assets/HUD_KPIActive.png" },

    { id: "mannPink", src: "assets/MannPink.png" },
    { id: "mannBlue", src: "assets/MannBlue.png" },
    { id: "mannGreen", src: "assets/MannGreen.png" },
    { id: "mannActive", src: "assets/HUD_MannActive.png" },

    { id: "automationActivated", src: "assets/sound/AutomationActivated.mp3" },
    { id: "slowMoActivated", src: "assets/sound/SlowMoActivate_01.mp3" },

    { id: "automationMode", src: "assets/sound/Automation_01.mp3" },
    { id: "mainTheme", src: "assets/sound/maintheme.wav" },
    { id: "slowMoTheme", src: "assets/sound/SlowMoTheme_01.mp3" },
    { id: "kpiTheme", src: "assets/sound/kpiTheme.mpeg" },
    { id: "royTheme", src: "assets/sound/RoyTheme2.mp3" },

    { id: "dueDates", src: "assets/sound/DueDates_02.mp3" },

    { id: "gameOver1", src: "assets/sound/GameOver_01.mp3" },
    { id: "gameOver2", src: "assets/sound/GameOver_02.mp3" },
    { id: "gameOver3", src: "assets/sound/GameOver_03.mp3" },
    { id: "gameOver4", src: "assets/sound/GameOver_04.mp3" },
    { id: "gameOver5", src: "assets/sound/GameOver_05.mp3" },
    { id: "topTen1", src: "assets/sound/TopTen1_01.mp3" },
    { id: "topTen2", src: "assets/sound/TopTen2_01.mp3" },

    { id: "touchMe1", src: "assets/sound/TouchMe_01.mp3" },
    { id: "touchMe2", src: "assets/sound/TouchMe2_01.mp3" },
    { id: "touchMe3", src: "assets/sound/TouchMe3_01.mp3" },

    { id: "kpi1", src: "assets/sound/KPIActive_01.mp3" },
    { id: "kpi2", src: "assets/sound/KPIActive_02.mp3" },

    { id: "transparency1", src: "assets/sound/Transparency_01.mp3" },
    { id: "transparency2", src: "assets/sound/Transparency_02.mp3" },
    { id: "transparency3", src: "assets/sound/Transparency_03.mp3" },
    { id: "transparency4", src: "assets/sound/Transparency_04.mp3" },
    { id: "transparency5", src: "assets/sound/Transparency_05.mp3" },
    { id: "transparency6", src: "assets/sound/Transparency_06.mp3" },
    
    { id: "zinman", src: "assets/sound/Zinman_01.mp3" },
    { id: "excellent", src: "assets/sound/Excellent.mp3" },
    { id: "wow", src: "assets/sound/WOW.mp3" },
    { id: "nice", src: "assets/sound/NICE.mp3" },
    { id: "boom", src: "assets/sound/Boom.mp3" },

    { id: "bombExplode", src: "assets/sound/bomb-explode.mp3" },
    { id: "ankYou", src: "assets/sound/ankYou2.m4a" },
    { id: "?", src: "assets/sound/abc/questionMark.mp3" },
    { id: "hash", src: "assets/sound/abc/hash.mp3" },
  ]
};
letters.forEach(l => {
  FruitGame.assets.other.push({id: l, src: `assets/sound/abc/${l}.mp3`})
})
for (let i = 0; i < 10; i++){
  FruitGame.assets.other.push({id: `num${i}`, src: `assets/sound/abc/${i}.mp3`})
}