(function() {
	bladeColor = "#00ff00";
	bladeWidth = 10;
	var buildBlade = function(width) {
		if (gameState == GAME_OVER)
			return;
		Object.keys(bladeSystems).forEach(key => {
			var system = bladeSystems[key];
			var context = bladeContexes[key];
			var canvas = bladeCanvases[key];
			var i = system.getParticles().length;
			var lineWidth = width;
			var step = width / (i - 1);
			// topContext.beginPath();
			context.beginPath();
			while (i-- > 1)
			{
				if (i == 1)
					context.lineWidth = 1;
					// topContext.lineWidth = 1;
				else
					context.lineWidth = lineWidth;
					// topContext.lineWidth = lineWidth;
				var p = system.getParticles()[i];
				var next = system.getParticles()[i - 1];
				context.moveTo(p.position.x, p.position.y);
				context.lineTo(next.position.x, next.position.y);
				context.stroke();
				// topContext.moveTo(p.position.x, p.position.y);
				// topContext.lineTo(next.position.x, next.position.y);
				// topContext.stroke();
				lineWidth -= step;
				if (lineWidth <=0)
					lineWidth = 1;
			}
		})
	};
	buildColorBlade = function(color, width, key) {
		var context = bladeContexes[key]
		// topContext.strokeStyle = color;
		context.strokeStyle = color;
		buildBlade(width);

		context.strokeStyle = "#ffffff";
		// topContext.strokeStyle = "#ffffff";
		buildBlade(width * 0.6);
	};
	buildBladeParticle = function(x, y, key) {
		if (gameState === GAME_PLAYING)
			bladeHistory.push({time: new Date().getTime(), x, y, key})

		var p = bladeSystems[key].createParticle(SPP.Particle);
		p.init(x, y, 0.2);
	};
}());