var gameScene = cc.Scene.extend({
	squareSprite:null,		
	onEnter:function () {
	this._super();
	winSize = cc.director.getWinSize();
	
	//squareSprite = new cc.Sprite.create(res.fighter_png);
	//this.addChild(squareSprite);
	//this.squareSprite.setPosition(250,100);
    space = new cp.Space();
    space.gravity = cp.v(0, -100);
    var debugDraw = cc.PhysicsDebugNode.create(space);
    debugDraw.setVisible(true);
    this.addChild(debugDraw);   	
	
	//Ground
	groundBody = new cp.Body(Infinity, Infinity);
    groundBody.setPos(cp.v(250, 70));
    groundShape = space.addShape(new cp.BoxShape(groundBody,800,50));
    groundShape.setFriction(1.0);
    groundShape.setElasticity(0);
    
    groundShape.setCollisionType("ground");
    
    //Square body
    squareBody = new cp.Body(1, cp.momentForBox(1,50,50)); //mass, moment of inertia (momentforbox: 1st: mass, 2nd: width, 3rd: height)
    squareBody.setPos(cp.v(250,140));
    space.addBody(squareBody);
    squareShape = space.addShape(new cp.BoxShape(squareBody,50,50));
    squareShape.setFriction(1.0);
    squareShape.setElasticity(0);
    //squareShape.image = squareSprite;
    
    squareShape.setCollisionType("square");
  	
  	//Circle Body
  	circleBody = new cp.Body(1, cp.momentForCircle(1,50,55,cp.vzero)); // for circle, 2nd: inner diameter, 3rd: outer diameter, offset
    circleBody.setPos(cp.v(250,210));
    space.addBody(circleBody);
    circleShape = space.addShape(new cp.CircleShape(circleBody,50,cp.v(10,10)));
    circleShape.setFriction(0.2);
    circleShape.setElasticity(0);
   
    circleShape.setCollisionType("circle");
    //
    	//Segment Body
  	segBody = new cp.Body(1, cp.momentForSegment(1,cp.v(0,20),cp.v(130,10),1));
    segBody.setPos(cp.v(250,280));
    space.addBody(segBody);
    segShape = space.addShape(new cp.SegmentShape(segBody,cp.v(0,20),cp.v(130,10),1));
    segShape.setFriction(10);
    segShape.setElasticity(0);
    
    segShape.setCollisionType("seg");
    //PolyShape
    var verts = [
			0, 0,
			0, 50,
			80, 100,
			120, 50,
			50, 0
		];
    polyBody = new cp.Body(1, cp.momentForPoly(1,verts,cp.v(0,0)));
    polyBody.setPos(cp.v(20,50));
    space.addBody(polyBody);
    polyShape = space.addShape(new cp.PolyShape(polyBody,verts,cp.v(0, 120)));
    polyShape.setFriction(1);
    polyShape.setElasticity(0);
   
    polyShape.setCollisionType("poly");
    
	this.scheduleUpdate();
	
	},
	update:function (dt) {		
    space.step(dt);
	}
});
 