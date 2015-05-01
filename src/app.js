var world;

var gameScene = cc.Scene.extend({
    player: null,
    hazards: [],
    platforms: {},
    bgLayer: null,
    onEnter: function() {
        this._super();
        winSize = cc.director.getWinSize();

        this.bgLayer = new bgLayer();
        this.addChild(this.bgLayer);

        world = new cp.Space();
        world.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);
        this.scheduleUpdate();

        world.collisionActions = [
            ["player", ["platform0", "platform1", "platform2", "platform3", "platform4"], function(x, y, space) {
                world.restorePlayerJump();
            }]
        ];

        world.restorePlayerJump = function() {
            this.player.pshape.canJump = true;
        }

        this.createPlatform(
            0, Infinity, Infinity, 240, 20, ["box", 500, 10], 10.0, 0.0
        );

        this.createPlatform(
            1, Infinity, Infinity, 105, 80, ["box", 120, 10], 7.5, 0.0
        );

        this.createPlatform(
            2, Infinity, cp.momentForCircle(Infinity, 30, 0, cp.vzero), 250, 120, ["circle", 30],
            15.0, 0.0
        );

        this.createPlatform(
            3, Infinity, cp.momentForSegment(Infinity, cp.v(-60,-40), cp.v(60,40), 10), 360, 180,
            ["segment", cp.v(-60, -40), cp.v(60, 40), 5], 2.5, 0.0
        );

        this.createPlatform(
            4, Infinity, cp.momentForSegment(Infinity, cp.v(40, -60), cp.v(-40, 60), 10), 320, 320,
            ["segment", cp.v(40, -60), cp.v(-40, 60), 5], 5, 0.05
        );

        this.createPlatform( // left wall
            6, Infinity, Infinity, 15, 260, ["box", 10, 400], 10.0, 0.0
        );

        this.createPlatform( // right wall
            7, Infinity, Infinity, 465, 260, ["box", 10, 400], 10.0, 0.0
        );

        this.player = new PlayerClass(this, world, 120, 200);
        world.player = this.player;

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    target.playJump(touch.getLocationX());
                }
            }
        });

        cc.eventManager.addListener(listener, this);

        world.setDefaultCollisionHandler(null,null,this.collisionBegin,null);
        
        this.scheduleUpdate();

    },

    update:function(dt) {
        world.step(dt);
    },

    createPlatform: function(id, mass, moment, x, y, shapeArray, friction, elasticity) {
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

    playJump: function(x) {
        return this.player.jump(x);
    },

    restoreJump: function() {
        this.player.canJump = true;
    },

    collisionBegin: function(arbiter, space) {
        /*console.log("a = " + arbiter.a.name);
        console.log("b = " + arbiter.b.name);*/
        for(var i = 0; i < space.collisionActions.length; i++) {

            if(arbiter.a.name == space.collisionActions[i][0]) {
                if(space.collisionActions[i][1].indexOf(arbiter.b.name) != -1) {
                    space.collisionActions[i][2](arbiter.a, arbiter.b, space);
                }
            } else if(arbiter.b.name == space.collisionActions[i][0]) {
                if(space.collisionActions[i][1].indexOf(arbiter.a.name) != -1) {
                    space.collisionActions[i][2](arbiter.b, arbiter.a, space);
                }
            }
        }

    }

});
