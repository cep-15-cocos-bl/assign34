var world;


var gameScene = cc.Scene.extend({
    player: null,
    platforms: {},
    onEnter: function() {
        this._super();
        winSize = cc.director.getWinSize();

        world = new cp.Space();
        world.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);
        this.scheduleUpdate();

        this.createPlatform(
            0, Infinity, Infinity, 240, 30, ["box", 500, 20], 1.0, 0.0
        );

        this.createPlatform(
            1, Infinity, Infinity, 80, 80, ["box", 120, 20], 0.75, 0.0
        );

        this.createPlatform(
            2, Infinity, cp.momentForCircle(Infinity, 30, 0, cp.vzero), 250, 120, ["circle", 30],
            1.5, 0.0
        );

        this.createPlatform(
            3, Infinity, cp.momentForSegment(Infinity, cp.v(-60,-40), cp.v(60,40), 10), 360, 180,
            ["segment", cp.v(60, -40), cp.v(60, 40), 10], 0.25, 0.0
        );

        this.createPlatform(
            4, Infinity, cp.momentForSegment(Infinity, cp.v(40, -60), cp.v(-40, 60), 10), 320, 320,
            ["segment", cp.v(40, -60), cp.v(-40, 60), 10], 0.5, 0.05
        );

        this.player = new PlayerClass(this, world, 120, 200);

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
    }

});
