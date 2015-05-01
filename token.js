var TokenClass  = cc.Sprite.extend({
    pName:"token",
  world:null,
  pbody:null,
  shape:null,
  tokenSprite:null,
  tokenAction:null,
  spriteSheet:null,
  isDynamic:false,
  ctor:function(game,gWorld,posX,posY,width,height,isDynamic) {
   width = 10;
        height = 10;
        this.world = gWorld;
        this.pbody = new cp.Body(1, cp.momentForBox(10, 10, 10));
        this.pbody.setPos(cp.v(posX, posY));
        this.pshape = this.world.addShape(new cp.BoxShape(this.pbody, 20, 20));
        this.pshape.setFriction(10.0);
        this.pshape.setElasticity(0.0);
        this.pshape.setCollisionType("square");
  cc.spriteFrameCache.addSpriteFrames(res.token_plist);
  this.spriteSheet = new cc.SpriteBatchNode(res.token_png);
  this.addChild(this.spriteSheet);
var tokenFrames = [];
for (var i = 1; i < 5; i++) {
    var str = "token" + i + ".png";
    var frame = cc.spriteFrameCache.getSpriteFrame(str);
    tokenFrames.push(frame);
}
//3.create a animation with the spriteframe array along with a period time
var animation = new cc.Animation(tokenFrames, 0.5);
//4.wrap the animate action with a repeat forever action
this.tokenAction = new cc.RepeatForever(new cc.Animate(animation));
tokenSprite = new cc.Sprite.create(spriteImage);
    game.addChild(tokenSprite,0);
    tokenSprite.setPosition(posX,posY);
    var spriteImage = res.tokens_png;
    world = gWorld;
    tokenSprite.runAction(this.tokenAction);
    this.spriteSheet.addChild(tokenSprite);
    return this;
},
