var world;
var shapeArray=[];
var worldScale = 30;
var gameScene = cc.Scene.extend({
	player:null,
	onEnter:function () {
		this._super();
		winSize = cc.director.getWinSize();
		var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf,0x9f,0x83,255), cc.color(0xfa,0xf7,0x9f,255));
    	this.addChild(backgroundLayer);    	
    	world = new cp.Space();
        world.gravity = cp.v(0, -10);
        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);   
        this.scheduleUpdate();  
		this.statLayer = new StatusLayer();
		this.addChild(this.statLayer);
		this.addBody(240,0,480,20,false,res.ground_png,"ground");
		this.addBody(254,50,100,24,false,res.platform_png,"platform");
  	    this.addBody(300,100,40,24,false,res.platform_png,  "platform");
  	    //this.addBody(50,30,24,24,true,res.player_png,  "#walk1.png");
  	player = new PlayerClass(this,world,40,23,24,24,true, res.player_png);
  	
  	  var listener = cc.EventListener.create({
  		event: cc.EventListener.TOUCH_ONE_BY_ONE,
  		swallowTouches: true,
  
  onTouchBegan: function (touch, event) { 
            var target = event.getCurrentTarget();  
            var location = target.convertToNodeSpace(touch.getLocation());    
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            //Check the click area
            if (cc.rectContainsPoint(rect, location)) {       
            	if (touch.getLocationX() >= target.x){
            		target.playJump();
            	}else{
            		
            	}
                return true;
            }
            return false;
        },
        //Trigger when moving touch
        /*onTouchMoved: function (touch, event) {         
            //Move the position of current button sprite
            var target = event.getCurrentTarget();
            var delta = touch.getDelta();
            target.x += delta.x;
            target.y += delta.y;
        },*/
        //Process the touch end event
       
})
   cc.eventManager.addListener(listener.clone(), this);
	},
	
	update:function (dt) {		
	 world.step(dt);
   
  	player.shape.image.x = player.pbody.p.x;
    player.shape.image.y = player.pbody.p.y;
	},
	playJump:function(){	
	 player.startJump();
	},
  setInvOff:function(dt){
  },
  addBody: function(posX,posY,width,height,isDynamic,spriteImage,type){
  
  if(isDynamic){
    var body = new cp.Body(1,cp.momentForBox(1,width,height));
  }
  else{
    var body = new cp.Body(Infinity,Infinity);
  }
  body.setPos(cp.v(posX,posY));
  if(isDynamic){
    world.addBody(body);
  }
  var shape = new cp.BoxShape(body, width, height);
  shape.setFriction(0);
  shape.setElasticity(0);
  shape.name=type;
  world.addShape(shape);
  shapeArray.push(shape);
}
	
});
