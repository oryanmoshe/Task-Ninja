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
	var bombUpdate = function() {
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
		for ( var i = 0; i < 500; i++)
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
		createjs.Sound.play("bombExplode");
	};
	throwBomb = function(context) {
		var p = bombSystem.createParticle(FruitGame.Fruit);
		p.velocity.reset(0, -(10 + Math.random() * 3));
		p.velocity.rotate(8 - Math.random() * 16);
		p.damp.reset(0, 0);
		p.addForce("g", gravity);
		p.onUpdate = bombUpdate;
		p.init(context.canvas.width * 0.5 + (1 - Math.random() * 2) * 300, gameHeight
		// p.init(gameWidth * 0.5 + (1 - Math.random() * 2) * 300, gameHeight
				+ assetsManager.bomb.height, Infinity, assetsManager.bomb,
				assetsManager.shadow, context);
				// assetsManager.shadow, middleContext);
		p.bottomY = gameHeight + assetsManager.bomb.height;
		p.updatePic = 0
	};
	// cut bomb
	cutBomb = function(target) {
		bombExplode(target);
		target.life = 0;
		gameOver();
	};
}());
