var PlayerClass = cc.Sprite.extend({
    name: "player",
    game: null,
    world: null,
    pbody: null,
    pshape: null,
    playerSprite: null,
    jumpSprite: null,
    walkAction: null,
    jumpAction: null,
    canJump: false,
    isAlive: true,

    ctor: function(game, gWorld, posX, posY) {

        this.game = game;
        this.world = gWorld;
        this.world.player = this;

        cc.spriteFrameCache.addSpriteFrames(res.walk_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.walk_png);
        this.addChild(this.spriteSheet);
        cc.spriteFrameCache.addSpriteFrames(res.jump_plist);
        this.jspriteSheet = new cc.SpriteBatchNode(res.jump_png);
        this.addChild(this.jspriteSheet);

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

        var animation = new cc.Animation(walkFrames, 0.5);
        var janimation = new cc.Animation(jumpFrames, 0.2);

        this.walkAction = new cc.RepeatForever(new cc.Animate(animation));
        this.jumpAction = new cc.Repeat(new cc.Animate(janimation),1);
        this.playerSprite = new cc.Sprite.create(spriteImage);

        this.game.addChild(this.playerSprite,0);
        this.playerSprite.setPosition(posX,posY);
        var spriteImage = res.player_png;
        this.playerSprite.runAction(this.walkAction);
        this.spriteSheet.addChild(this.playerSprite);

        // hard-coded
        width = 25;
        height = 25;

        this.pbody = new cp.Body(1, Infinity);
        this.pbody.setPos(cp.v(posX, posY));
        this.world.addBody(this.pbody);

        this.pshape = this.world.addShape(new cp.BoxShape(this.pbody, width, height));
        this.pshape.setFriction(10.0);
        this.pshape.setElasticity(0.0);
        this.pshape.name = "player";
        this.pshape.id = 0;
        this.pshape.image = this.playerSprite;
        this.pshape.type = "player";

        this.pshape.setCollisionType("player");

    },

    jump: function(x, y) {
        
        if(!this.canJump) {
            return 0;
        }

        this.canJump = false;

        this.playerSprite.runAction(this.jumpAction);
        this.jspriteSheet.addChild(this.playerSprite);

        if(x < this.pbody.getPos().x - 10 && y < this.pbody.getPos().y + 10) { // left, forward
            this.pbody.applyImpulse(cp.v(-100, 25), cp.v(x, y));
        } else if(x < this.pbody.getPos().x - 10 && y >= this.pbody.getPos().y + 10) { // left, upward
            this.pbody.applyImpulse(cp.v(-80, 120), cp.v(x, y));

        } else if(x > this.pbody.getPos().x + 10 && y < this.pbody.getPos().y + 10) { // right, forward
            this.pbody.applyImpulse(cp.v(100, 25), cp.v(x, y));
        } else if(x > this.pbody.getPos().x + 10 && y >= this.pbody.getPos().y + 10) { // right, upward
            this.pbody.applyImpulse(cp.v(80, 120), cp.v(x, y));

        } else {
            this.pbody.applyImpulse(cp.v(0, 160), cp.v(x, y)); // directly upward
        }
    },

    updatePosition: function() {
        this.pshape.image.x = this.pbody.p.x;
        this.pshape.image.y = this.pbody.p.y;
    },

    die: function() {
        this.isAlive = false;
        this.world.removeBody(this.pbody);
        this.world.removeShape(this.pshape);
        this.game.removeChild(this.playerSprite);
    }
})