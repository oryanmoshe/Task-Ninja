(function() {
	// throw bomb
	var bombSmokeUpdate = function() {
		this.scale -= 0.03;
		if (this.scale < 0)
		{
			this.scale = 0;
			this.life = 0;
		}
	};
	bombUpdate = function() {
		this.updatePic += 1/32
		 this.texture = (Math.floor(this.updatePic) % 2) ?assetsManager.bomblight : assetsManager.bomb;
		var smoke = particleSystem.createParticle(SPP.SpriteImage);
		var r = 1.414 * assetsManager.bomb.width * 0.5 - 5;
		var px = this.position.x + r
				* Math.cos(this.rotation - SPP.MathUtils.toRadian(135));
		var py = this.position.y + r
				* Math.sin(this.rotation - SPP.MathUtils.toRadian(135));
		// smoke.init(px, py, Infinity, assetsManager.star, this.context);
		smoke.init(px, py, Infinity, assetsManager.star, topContext);
		smoke.onUpdate = bombSmokeUpdate;
		smoke.scale = 0.8;
		smoke.damp.reset(0, 0);
		smoke.velocity.reset(0, -(1 + Math.random() * 1));
		smoke.velocity.rotate(360 * Math.random());
		smoke.addForce("g", gravity);
		//light

		var smoke = particleSystem.createParticle(SPP.SpriteImage);
		var r = 1.414 * assetsManager.bomblight.width * 0.5 - 5;
		var px = this.position.x + r
				* Math.cos(this.rotation - SPP.MathUtils.toRadian(135));
		var py = this.position.y + r
				* Math.sin(this.rotation - SPP.MathUtils.toRadian(135));
		// smoke.init(px, py, Infinity, assetsManager.star, this.context);
		smoke.init(px, py, Infinity, assetsManager.star, topContext);
		smoke.onUpdate = bombSmokeUpdate;
		smoke.scale = 0.8;
		smoke.damp.reset(0, 0);
		smoke.velocity.reset(0, -(1 + Math.random() * 1));
		smoke.velocity.rotate(360 * Math.random());
		smoke.addForce("g", gravity);
	};
	// bomb explode
	var explodeSmokeUpdate = function() {
		this.scale -= 0.02;
		if (this.scale < 0)
		{
			this.scale = 0;
			this.life = 0;
		}
	};
	var bombExplode = function(target) {
		for ( var i = 0; i < 150; i++)
		{
			var smoke = particleSystem.createParticle(SPP.SpriteImage);
			smoke.init(target.position.x, target.position.y, Infinity,
					// assetsManager.star, this.context);
					assetsManager.star, topContext);
			smoke.onUpdate = explodeSmokeUpdate;
			smoke.scale = 2;
			smoke.damp.reset(0, 0);
			smoke.velocity.reset(0, -(3 + Math.random() * 7));
			smoke.velocity.rotate(360 * Math.random());
			smoke.addForce("g", gravity);
		}
		createjs.Sound.stop();
		createjs.Sound.play("bombExplode");
	};
	throwBomb = function(context) {
		var rand = Math.floor((Math.random() * 999999 + 1));
		if (rand % 10 === 0 && !isAutomation) {
			// createjs.Sound.stop();
			createjs.Sound.play("dueDates");
		}
		var p = bombSystem.createParticle(FruitGame.Fruit);
		var yv = -(10 + Math.random() * 3);
		var rv = 8 - Math.random() * 16;
		p.velocity.reset(0, yv);
		p.velocity.rotate(rv);
		p.damp.reset(0, 0);
		p.addForce("g", gravity);
		p.onUpdate = bombUpdate;
		var x = context.canvas.width * 0.5 + (1 - Math.random() * 2) * 300;
		var y = gameHeight + assetsManager.bomb.height;
		var life = Infinity;
		var texture = assetsManager.bomb;
		p.init(x, y, life, texture,
				assetsManager.shadow, context);
				// assetsManager.shadow, middleContext);
		p.bottomY = gameHeight + assetsManager.bomb.height;
		p.updatePic = 0

		fruitHistory.push({x, y, yv, rv, life, texture, side: p.side, bottomY: p.bottomY, context, time: new Date().getTime(), isBomb: true});
	};
	// cut bomb
	cutBomb = function(target) {
		if (transparency){
			cutHistory.push({name: 'bombTransparent', time: new Date().getTime()});
			return;
		}
		cutHistory.push({name: 'bomb', time: new Date().getTime()});
		bombExplode(target);
		target.life = 0;
		gameOver();
	};
}());
