(function() {

	//jucie
	var juiceUpdate=function()
	{
		this.scale-=0.013;
		if(this.scale<0)
		{
			this.scale=0;
			this.life=0;
		}
	};
	var buildJuice=function(target,juiceCount)
	{
		for(var i=0;i<juiceCount;i++)
		{
			var juice = particleSystem.createParticle(SPP.SpriteImage);
			// juice.init(target.position.x,target.position.y,Infinity,target.textureObj.j,middleContext);
			juice.init(target.position.x,target.position.y,Infinity,target.textureObj.j,middleLeftContext);
			juice.onUpdate=juiceUpdate;
			juice.scale=Math.random()*0.7;
			juice.damp.reset(0, 0);
			juice.velocity.reset(0, -(4 + Math.random() * 4));
			juice.velocity.rotate(360*Math.random());
			juice.addForce("g", gravity);
		}
	};
	//splash
	var splashUpdate=function()
	{
		this.alpha-=0.005;
		if(this.alpha<0)
		{
			this.alpha=0;
			this.life=0;
		};
	};
	var buildSplash =function(target)
	{
		var splash = particleSystem.createParticle(SPP.SpriteImage);
		// splash.init(target.position.x,target.position.y,Infinity,target.textureObj.s,bottomContext);
		splash.init(target.position.x,target.position.y,Infinity,target.textureObj.s,bottomLeftContext);
		// var img = document.createElement('img');
		// img.src = target.textureObj.s.src;
		// img.style.cssText = `position: absolute; top:${target.position.y / 4}px; left:${target.position.x / 2}px;z-index:9999999;transform: scale(.5);`
		// document.body.appendChild(img)
		// setTimeout(() => {document.body.removeChild(img)}, 500);
		splash.onUpdate=splashUpdate;
		splash.scale=1+Math.random();
		splash.rotation=Math.PI*2*Math.random();
	};
	var buildHalfFruit=function(target, multiplier=1)
	{
		var speed=(3+ Math.random() * 3) * multiplier;
		
		var right = particleSystem.createParticle(FruitGame.Fruit);
		right.init(target.position.x,target.position.y,Infinity,target.textureObj.r,assetsManager.shadow,target.context);
		// right.init(target.position.x,target.position.y,Infinity,target.textureObj.r,assetsManager.shadow,middleContext);
		right.velocity.reset(speed, 0);
		right.damp.reset(0, 0);
		right.bottomY=gameHeight+target.textureObj.r.height;
		right.addForce("g", gravity);
		
		var left=  particleSystem.createParticle(FruitGame.Fruit);
		left.init(target.position.x,target.position.y,Infinity,target.textureObj.l,assetsManager.shadow,target.context);
		// left.init(target.position.x,target.position.y,Infinity,target.textureObj.l,assetsManager.shadow,middleContext);
		left.velocity.reset(-speed, 0);
		left.damp.reset(0, 0);
		left.bottomY=gameHeight+target.textureObj.l.height;
		left.addForce("g", gravity);
		
		if (multiplier === 1){
			right.velocity.rotate(-50*Math.random());
			right.rotation=target.rotation;
			left.velocity.rotate(50*Math.random());
			left.rotation=target.rotation;
		}
	};
	//if miss fruit
	var missUpdate=function()
	{
		this.alpha-=0.01;
		if(this.alpha<0)
		{
			this.alpha=0;
			this.life=0;
		}
	};
	var missFruit=function(target)
	{
		var lose = particleSystem.createParticle(SPP.SpriteImage);
		var x=target.position.x;
		if(x<=0)x=40;
		if(x>gameWidth)x=gameWidth-40;
		lose.init(x,gameHeight-assetsManager.miss.height,Infinity,assetsManager.miss,target.context);
		// lose.init(x,gameHeight-assetsManager.miss.height,Infinity,assetsManager.miss,topContext);
		lose.velocity.reset(0,-1);
		lose.damp.reset(0.01,0.01);
		lose.onUpdate=missUpdate;
	};
	
	//throw fruit
	throwFruit=function(context)
	{
		var textureObj=assetsManager.getRandomFruit();
		
		var p = fruitSystem.createParticle(FruitGame.Fruit);
		p.velocity.reset(0, -(10 + Math.random() * 6));
		p.velocity.rotate(8 - Math.random() * 2);
		p.damp.reset(0, 0);
		p.addForce("g", gravity);
		
		p.addEventListener("dead",missHandler);
		p.init(context.canvas.width*0.5+(1-Math.random()*2)*200, gameHeight+textureObj.w.height,Infinity,textureObj.w,assetsManager.shadow,context,textureObj.next,textureObj.life);
		// p.init(gameWidth*0.5+(1-Math.random()*2)*200, gameHeight+textureObj.w.height,Infinity,textureObj.w,assetsManager.shadow,middleContext,textureObj.next,textureObj.life);
		p.textureObj=textureObj;
		p.bottomY=gameHeight+textureObj.w.height;
	};
	//cut fruit
	cutFruit=function(target)
	{
		score++;
		target.removeEventListener("dead",missHandler);
		
		// buildJuice(target,(Math.random()*30>>0)+30);
		// buildSplash(target);
		if (target.next){
			var textureObj=assetsManager.getFruitByName(target.next);
			
			var newP = fruitSystem.createParticle(FruitGame.Fruit);
			// newP.velocity.reset(0, -(10 + Math.random() * 2));
			newP.velocity.reset(target.velocity.x, target.velocity.y * 1.2);
			newP.damp.reset(0, 0);
			newP.addForce("g", gravity);
			
			newP.addEventListener("dead",missHandler);
			newP.init(target.position.x, target.position.y,Infinity,textureObj.w,assetsManager.shadow,target.context,textureObj.next,textureObj.life);
			// newP.init(target.position.x, target.position.y,Infinity,textureObj.w,assetsManager.shadow,middleContext,textureObj.next,textureObj.life);
			newP.textureObj=textureObj;
			newP.bottomY=gameHeight+textureObj.w.height;
			buildHalfFruit(target, 10);
		} else {
			buildHalfFruit(target);
		}
		target.life=0;
		createjs.Sound.play("splatter");
	};
	missHandler=function(e)
	{
		e.target.removeEventListener("dead",missHandler);
		if ((e.target.dropScore - 1) === 0){
			return
		}
		if(gameState==GAME_OVER)return;
		missFruit(e.target);
		gameLife-=(e.target.dropScore - 1);
		if(gameLife==0)gameOver();
		if(gameLife<0)gameLife=0;
		ui_gamelifeTexture=assetsManager["gamelife-"+gameLife];
		ui_gameLife.texture=ui_gamelifeTexture;
	};
	
}());