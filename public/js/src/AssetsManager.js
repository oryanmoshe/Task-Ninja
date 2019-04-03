FruitGame.AssetsManager=function() 
{
	SPP.EventDispatcher.call(this);
	var _this=this,i=0,j=0;
	var fruitsDir="assets/fruits/";
	var fruitStateLabels=["w","l","r"];
	var fruitImageType=".png";

	this.fruitsObj={};
	this.fruitsArray=[];
	this.images={};
	this.sounds={};
	this.loader = new createjs.LoadQueue();
	this.loader.installPlugin(createjs.Sound);
	this.loader.setMaxConnections(20);
	var handleComplete=function()
	{
		var fruits=FruitGame.assets.fruits;
		var fruitsLives=FruitGame.assets.fruitsLives;
		var nextFruits=FruitGame.assets.nextFruits;
		for(i=0;i<fruits.length;i++)
		{
			var obj={};
			for(j=0;j<fruitStateLabels.length;j++)
			{
				obj[fruitStateLabels[j]]=_this.loader.getResult(fruits[i]+fruitStateLabels[j]);
			}
			obj['life'] = fruitsLives[i];
			obj['next'] = nextFruits[i];
			obj['name'] = fruits[i];

			_this.fruitsArray.push(obj);
			_this.fruitsObj[fruits[i]]=obj;
		}
		var other=FruitGame.assets.other;
		for(i=0;i<other.length;i++)
		{
			_this[other[i].id]=_this.loader.getResult(other[i].id);
		};
		_this.dispatchEvent(new SPP.Event("complete"));
	};
	this.loader.addEventListener("complete", handleComplete);
	
	this.start=function()
	{
		var fruits=FruitGame.assets.fruits;
		for(i=0;i<fruits.length;i++)
		{
			for(j=0;j<fruitStateLabels.length;j++)
			{
				this.loader.loadFile(
				{
					id:fruits[i]+fruitStateLabels[j], 
					src:fruitsDir+fruits[i]+"-"+fruitStateLabels[j]+fruitImageType
				},false);
			}
		};
		this.loader.loadManifest(FruitGame.assets.other,false);
		this.loader.load();
	};
	this.getRandomFruit=function()
	{
		if (isLlamas)
			return this.fruitsObj.llama
		
		// return this.fruitsObj['mann'];
		var ret = this.fruitsArray[this.fruitsArray.length*Math.random()>>0];
		if (ret.name === 'automation' || ret.name === 'slowMo' || ret.name === 'transparency' || ret.name === 'mann' || ret.name === 'kpi'){
			var rand = Math.floor((Math.random() * 30 + 1));
			if (rand % 30 === 0 && !isAutomation && !slowMo && !transparency){
				return ret;
			}
			return this.getRandomFruit();
		} else if (ret.name === 'llama'){
			return this.getRandomFruit();
		}
		return ret;
	};
	this.getFruitByName=function(fruit)
	{
		return this.fruitsObj[fruit];
	};
};