var world;


var gameScene = cc.Scene.extend({
    player: null,
    platforms: {

    },
    onEnter: function() {
        this._super();
        winSize = cc.director.getWinSize();

        world = new cp.Space();
        world.gravity = cp.v(0, -5);
        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);
        this.scheduleUpdate();

        var groundBody = new cp.Body(Infinity, Infinity);
        groundBody.setPos(cp.v(240, 30));
        world.addBody(groundBody);
        var groundShape = world.addShape(new cp.BoxShape(groundBody, 500, 20));
        groundShape.setFriction(1.0);
        groundShape.setElasticity(0.0);
        groundShape.setCollisionType("ground");
        groundShape.name = "ground";
        this.platforms.ground = groundShape;

        var plat1Body = new cp.Body(Infinity, Infinity);
        plat1Body.setPos(cp.v(80, 80));
        world.addBody(plat1Body);
        var plat1Shape = world.addShape(new cp.BoxShape(plat1Body, 120, 20));
        plat1Shape.setFriction(0.75);
        plat1Shape.setElasticity(0.0);
        plat1Shape.setCollisionType("ground");
        plat1Shape.name = "platform1";
        this.platforms.plat1 = plat1Shape;

        var plat2Body = new cp.Body(Infinity, cp.momentForCircle(Infinity, 30, 0, cp.vzero));
        plat2Body.setPos(cp.v(250, 120));
        world.addBody(plat2Body);
        var plat2Shape = world.addShape(new cp.CircleShape(plat2Body, 30, cp.vzero));
        plat2Shape.setFriction(1.5);
        plat2Shape.setElasticity(0.0);
        plat2Shape.setCollisionType("ground");
        plat2Shape.name = "platform2";
        this.platforms.plat2 = plat2Shape;

        var plat3Body = new cp.Body(Infinity, cp.momentForSegment(Infinity, cp.v(-60,-40), cp.v(60,40), 10));
        plat3Body.setPos(cp.v(360, 180));
        world.addBody(plat3Body);
        var plat3Shape = world.addShape(new cp.SegmentShape(plat3Body, cp.v(-60, -40), cp.v(60, 40), 10));
        plat3Shape.setFriction(0.25);
        plat3Shape.setElasticity(0.0);
        plat3Shape.setCollisionType("ground");
        plat3Shape.name = "platform3";
        this.platforms.plat3 = plat3Shape;

        var plat4Body  = new cp.Body(Infinity, cp.momentForSegment(Infinity, cp.v(40, -60), cp.v(-40, 60)), 5);
        plat4Body.setPos(cp.v(320, 320));
        world.addBody(plat4Body);
        var plat4Shape = world.addShape(new cp.SegmentShape(plat4Body, cp.v(40, -60), cp.v(-40, 60)), 10);
        plat4Shape.setFriction(0.5);
        plat4Shape.setElasticity(0.05);
        plat4Shape.setCollisionType("ground");
        plat4Shape.name = "platform4";
        this.platforms.plat4 = plat4Shape;

    }

});