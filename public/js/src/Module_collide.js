(function() {
	collide=new FruitGame.Collide();
	collideTest=function()
	{
		if(gameState==GAME_OVER)return;
		var fruits=fruitSystem.getParticles();
		var fruit;
		
		var bombs=bombSystem.getParticles();
		var bomb;
		
		Object.keys(bladeSystems).forEach(key => {
			var blade=bladeSystems[key].getParticles();
			var l=blade.length;
			
			while (l-- > 1)
			{
				var p1= blade[l];
				var p2=blade[l-1];
				
				for(var i in fruits)
				{
					fruit = fruits[i];
					var isCut =collide.lineInEllipse
					(
							[p1.position.x, p1.position.y],
							[p2.position.x, p2.position.y], 
							[fruit.position.x, fruit.position.y ],
							fruit.radius
					);
					// isCut = isCut && Math.abs(p1.position.x - fruit.position.x) > 5 0&&  Math.abs(p1.position.y - fruit.position.y) > 20;
					var side;
					if (bladeContexes[key].canvas.id.indexOf('left') !== -1 ) {
						side = 'left';
					} else if (bladeContexes[key].canvas.id.indexOf('right') !== -1 ) {
						side = 'right';
					} else {
						side = 'middle';
					}
					if(isCut && (!fruit.isCut) && (ultraSlice || (((new Date()).getTime() - fruit.createdAt)) > 250) && fruit.side === side)
					{
						cutFruit(fruit);
					};
				}
				for(var j in bombs)
				{
					bomb = bombs[j];
					var p1= blade[l];
					var p2=blade[l-1];
					var isCut =collide.lineInEllipse
					(
							[p1.position.x, p1.position.y],
							[p2.position.x, p2.position.y], 
							[bomb.position.x, bomb.position.y ],
							bomb.radius
					);
					if(isCut && key.indexOf('auto') === -1)
					{
						cutBomb(bomb);
					};
				}
			};
		});
	};
}());