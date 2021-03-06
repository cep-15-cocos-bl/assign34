var world;

var gameScene = cc.Scene.extend({
    player: null,
    hazards: [],
    hCounter: 0,
    seconds: -30,
    tokens: [],
    platforms: {},
    graveyard: [],
    bgLayer: null,
    statLayer: null,
    overLayer: null,
    onEnter: function() {
        this._super();
        winSize = cc.director.getWinSize();

        this.bgLayer = new bgLayer();
        this.addChild(this.bgLayer);

        this.statLayer = new StatusLayer();
		this.addChild(this.statLayer);
        world = new cp.Space();
        world.gravity = cp.v(0, -100);
        /*var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);*/

        this.createPlatform(
            0, Infinity, Infinity, 240, 15, ["box", 500, 30], 10.0, 0.0, res.ground_png
        );

        this.createPlatform(
            1, Infinity, Infinity, 105, 80, ["box", 120, 10], 7.5, 0.0, res.plat1_png
        );

        this.createPlatform(
            2, Infinity, cp.momentForCircle(Infinity, 30, 0, cp.vzero), 250, 120, ["circle", 30],
            15.0, 0.0, res.plat2_png
        );

        this.createPlatform(
            3, Infinity, cp.momentForSegment(Infinity, cp.v(-60,-40), cp.v(60,40), 10), 360, 180,
            ["segment", cp.v(-60, -40), cp.v(60, 40), 5], 2.5, 0.0, res.plat3_png
        );

        this.createPlatform(
            4, Infinity, cp.momentForSegment(Infinity, cp.v(40, -60), cp.v(-40, 10), 10), 320, 320,
            ["segment", cp.v(40, -60), cp.v(-40, 60), 5], 1, 0.05, res.plat4_png
        );

        this.createPlatform( // left wall
            6, Infinity, Infinity, 15, 240, ["box", 10, 400], 10.0, 0.0, res.wall_png
        );

        this.createPlatform( // right wall
            7, Infinity, Infinity, 465, 240, ["box", 10, 400], 10.0, 0.0, res.wall_png
        );

        this.player = new PlayerClass(this, world, 120, 200);

        this.tokens[0] = new TokenClass(this, world, 440, 50, 0);
        this.tokens[1] = new TokenClass(this, world, 420, 350, 1);
        this.tokens[2] = new TokenClass(this, world, 250, 160, 2);
        this.tokens[3] = new TokenClass(this, world, 150, 300, 3);

        this.menuLayer = new menuLayer();

        var listener2 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    target.playJump(touch.getLocationX(), touch.getLocationY());
                }
            }
        });

        cc.eventManager.addListener(listener2, this);

        world.env = this;
        world.setDefaultCollisionHandler(
            this.beginCollision,
            this.preCollision,
            this.postCollision,
            null
        );
        
        this.schedule(this.spawnEnemy, 3);
        this.scheduleUpdate();

    },

    update:function(dt) {
        world.step(dt);

        if(this.player.isAlive) {
            this.player.updatePosition();
        }

        for(var i = 0; i < this.hazards.length; i++) {

            if(this.hazards[i].pbody.p.y < -100) {
                this.hazards[i].die();
                continue;
            }

            this.hazards[i].updatePosition();
        }

        for(var i = 0; i < this.graveyard.length; i++) {
            if(this.graveyard[i].type == "token") {
                console.log(this.graveyard[i].id);
                this.tokens[this.graveyard[i].id].die();
            } else if(this.graveyard[i].type == "player") {
                this.statLayer.gameOver();
                this.player.die();
                cc.director.pause();
            }

            this.graveyard.splice(i, 1);
        }
    },

    spawnEnemy: function() {
        this.hazards[this.hCounter] = new HazardClass(this, world, 45 + Math.random() * 395, 600);
        this.hCounter++;
    },

    createPlatform: function(id, mass, moment, x, y, shapeArray, friction, elasticity, spriteImage) {
        var groundsprite = new cc.Sprite.create(spriteImage);
        this.addChild(groundsprite, 0);
        groundsprite.setPosition(x, y);

        var platBody = new cp.Body(mass, moment);
        platBody.setPos(cp.v(x, y))

        var platShape;

        if(shapeArray[0] == "box") {
            platShape = new cp.BoxShape(platBody, shapeArray[1], shapeArray[2]);
        } else if(shapeArray[0] == "circle") {
            platShape = new cp.CircleShape(platBody, shapeArray[1], cp.vzero);
        } else if(shapeArray[0] == "segment") {
            platShape = new cp.SegmentShape(platBody, shapeArray[1], shapeArray[2], shapeArray[3]);
        }

        platShape = world.addShape(platShape);
        platShape.setFriction(friction);
        platShape.setElasticity(elasticity);
        platShape.setCollisionType("ground");
        platShape.name = "platform" + id;

        this.platforms["plat" + id] = platShape;
    },

    playJump: function(x, y) {
        return this.player.jump(x, y);
    },

    restoreJump: function() {
        this.player.canJump = true;
    },

    beginCollision: function(arbiter, space) {
        if(arbiter.a.collision_type == "hazard" && arbiter.b.collision_type != "player" ||
            arbiter.a.collision_type != "player" && arbiter.b.collision_type == "hazard") {
            return false;
        }

        return true;
    },

    preCollision: function(arbiter, space) {
        if(arbiter.a.collision_type == "player" && arbiter.b.collision_type == "token") {
            space.env.graveyard.push(arbiter.b);
            return false;
        } else if(arbiter.a.collision_type == "token" && arbiter.b.collision_type == "player") {
            space.env.graveyard.push(arbiter.a);
            return false;
        } else if(arbiter.a.collision_type == "player" && arbiter.b.collision_type == "hazard") {
            space.env.graveyard.push(arbiter.a);
            return false;
        } else if(arbiter.a.collision_type == "hazard" && arbiter.b.collision_type == "player") {
            space.env.graveyard.push(arbiter.b);
            return false;
        }

        return true;
    },

    postCollision: function(arbiter, space) {
        if(arbiter.a.collision_type == "player" && arbiter.b.collision_type == "ground" ||
            arbiter.a.collision_type == "ground" && arbiter.b.collision_type == "player") {
            space.env.restoreJump();
        }
    },

    addScore: function() {
        this.statLayer.addScore(1);
    }

});
