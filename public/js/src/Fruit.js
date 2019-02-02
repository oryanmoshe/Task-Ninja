FruitGame.Fruit=function()
{
	SPP.Particle.call(this);
	this.drawTexture=function(context,texture,x,y)
	{
		context.drawImage
		(
			texture, x,y,
			texture.width,
			texture.height,
			-texture.width*.5,
			-texture.height*.5,
			texture.width,
			texture.height
		);
	};
	//this.onUpdate=null;
};
FruitGame.Fruit.prototype = SPP.inherit(SPP.Particle.prototype);
FruitGame.Fruit.prototype.constructor = FruitGame.Fruit;
FruitGame.Fruit.prototype.update = function()
{
	this.rotation+=this.rotationStep;
	this.context.translate(this.position.x-20,this.position.y-20);
	//this.context.rotate(this.rotation);
	this.context.scale(this.scale,this.scale);
	if (this.textureObj && (this.textureObj.name === 'automation' || this.textureObj.name === 'slowMo' || this.textureObj.name === 'transparency' || this.textureObj.name === 'mann')){
		updateAutomation += 1/32;
		if (Math.floor(updateAutomation) % 3 === 0){
			// this.textureObj = assetsManager.fruitsObj.done;
			this.texture = assetsManager[this.textureObj.name + 'Blue'];
		} else if (Math.floor(updateAutomation) % 3 === 1){
			// this.textureObj = assetsManager.fruitsObj.working;
			this.texture = assetsManager[this.textureObj.name + 'Green'];
		} else if (Math.floor(updateAutomation) % 3 === 2){
			// this.textureObj = assetsManager.fruitsObj.stuck;
			this.texture = assetsManager[this.textureObj.name + 'Pink'];
		}
		this.scale = .5;
	}
	this.drawTexture(this.context,this.shadow,0,0);
	this.context.setTransform(1,0,0,1,0,0);

	this.context.translate(this.position.x,this.position.y);
	this.context.rotate(this.rotation);
	this.context.scale(this.scale,this.scale);
	this.drawTexture(this.context,this.texture,0,0);
	this.context.setTransform(1,0,0,1,0,0);

	if(this.position.y>this.bottomY&&this.bottomY!=null || ((this.position.x<=0 || this.position.x>gameWidth)))
	{
		this.life=0;
		return;
	}
	//if(this.onUpdate)this.onUpdate.apply(this);
};
FruitGame.Fruit.prototype.init = function(x,y,life,texture,shadow,context,next=null,dropScore=1,isHalf=false)
{
	SPP.Particle.prototype.init.apply(this,[x,y,life]);
	this.context=context;
	this.texture=texture;
	this.shadow=shadow;
	this.rotation=0;
	this.scale=1;
	this.radius=texture.width>=texture.height?texture.width*0.5:texture.height*0.5;
	this.radius*=this.scale;
	this.bottomY=null;
	this.next=next;
	this.dropScore=dropScore;
	this.createdAt=(new Date()).getTime();
	this.autoCut=0;
	this.isHalf=isHalf;
	this.isCut=false;


	this.rotationStep=(1-Math.random()*2)*0.1;
	if(this.rotationStep<=0)this.rotationStep=-0.1;
	else if(this.rotationStep>0)this.rotationStep=0.1;
};
