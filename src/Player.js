var PlayerClass  = cc.Sprite.extend({
	pName:"Player",
  world:null,
  pbody:null,
  shape:null,
  playerSprite:null,
  jumpSprite:null,
  walkAction:null,
  jumpAction:null,
  spriteSheet:null,
  jspriteSheet:null,
  ctor:function(game,gWorld,posX,posY,width,height,isDynamic) {
   // this._super();
/*
  cc.spriteFrameCache.addSpriteFrames(res.walk_plist);
  this.spriteSheet = new cc.SpriteBatchNode(res.walk_png);
  this.addChild(this.spriteSheet);
  cc.spriteFrameCache.addSpriteFrames(res.jump_plist);
  this.jspriteSheet = new cc.SpriteBatchNode(res.jump_png);
  this.addChild(this.jspriteSheet);
//2.create spriteframe array
var walkFrames = [];
var jumpFrames = [];
for (var i = 1; i < 5; i++) {
    var str = "walk" + i + ".png";
    var frame = cc.spriteFrameCache.getSpriteFrame(str);
    walkFrames.push(frame);
}
for (var j = 1; j < 5; j++) {
    var jstr = "jump" + j + ".png";
    var jframe = cc.spriteFrameCache.getSpriteFrame(jstr);
    jumpFrames.push(jframe);
}
//3.create a animation with the spriteframe array along with a period time
var animation = new cc.Animation(walkFrames, 0.5);
var janimation = new cc.Animation(jumpFrames, 0.2);
//4.wrap the animate action with a repeat forever action
this.walkAction = new cc.RepeatForever(new cc.Animate(animation));
this.jumpAction = new cc.Repeat(new cc.Animate(janimation),1);
playerSprite = new cc.Sprite.create(spriteImage);
    game.addChild(playerSprite,0);
    playerSprite.setPosition(posX,posY);
    var spriteImage = res.player_png;
    world = gWorld;
    playerSprite.runAction(this.walkAction);
    this.spriteSheet.addChild(playerSprite);
    this.fixBody(game,gWorld,posX,posY,width,height,isDynamic,spriteImage);
    return this;*/
},
 fixBody:function(game,gWorld,posX,posY,width,height,isDynamic){
  
     this.pbody = new cp.Body(1,Infinity);
     this.pbody.setPos(cp.v(posX,posY));
     world.addBody(this.pbody);
     this.shape = new cp.BoxShape(this.pbody, width, height);
     this.shape.setFriction(1);
     this.shape.setElasticity(0);
     //this.shape.image = playerSprite;
     world.addShape(this.shape);
},

startJump:function(){
  //prototype.velocity_func.call(pbody, 100, 10, dt); 
  //playerSprite.runAction(this.jumpAction);
  //this.jspriteSheet.addChild(playerSprite); 
  var curPosX = this.pbody.getPos().x;
  var curPosY = this.pbody.getPos().y;
  this.pbody.applyImpulse(cp.v(30, 30), cp.v(0, 100));
  
 }   
})