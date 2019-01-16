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
			-texture.width*.5 / 2,
			-texture.height*.5 / 2,
			texture.width / 2,
			texture.height / 2
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
FruitGame.Fruit.prototype.init = function(x,y,life,texture,shadow,context,next=null,dropScore=1) 
{
	SPP.Particle.prototype.init.apply(this,[x,y,life]);
	this.context=context;
	this.texture=texture;
	this.shadow=shadow;
	this.rotation=0;
	this.scale=1;
	this.radius=texture.width>=texture.height/2?texture.width*0.5/2:texture.height*0.5/2;
	this.radius*=this.scale;
	this.bottomY=null;
	this.next=next;
	this.dropScore=dropScore;
	this.createdAt=(new Date()).getTime();
	this.autoCut=0;
	
	
	this.rotationStep=(1-Math.random()*2)*0.1;
	if(this.rotationStep<=0)this.rotationStep=-0.1;
	else if(this.rotationStep>0)this.rotationStep=0.1;
};