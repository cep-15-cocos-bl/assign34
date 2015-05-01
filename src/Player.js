var PlayerClass = cc.Sprite.extend({
    name: "player",
    world: null,
    pbody: null,
    pshape: null,
    playerSprite: null,
    jumpSprite: null,
    walkAction: null,
    jumpAction: null,
    canJump: true,

    ctor: function(game, gWorld, posX, posY) {

        // hard-coded
        width = 25;
        height = 25;

        this.world = gWorld;
        this.world.player = this;

        this.pbody = new cp.Body(1, Infinity);
        this.pbody.setPos(cp.v(posX, posY));
        this.world.addBody(this.pbody);

        this.pshape = this.world.addShape(new cp.BoxShape(this.pbody, width, height));
        this.pshape.setFriction(10.0);
        this.pshape.setElasticity(0.0);
        this.pshape.name = "player";

        this.pshape.setCollisionType("square");


    },

    jump: function(compare) {
        
        if(!this.pshape.canJump) {
            return 0;
        }

        this.pshape.canJump = false;

        if(compare < this.pbody.getPos().x + 10) { // jump left
            this.pbody.applyImpulse(cp.v(-40, 120), cp.v(40, 80));
            return 3;
        } else if(compare > this.pbody.getPos().x + 10) { // jump right
            this.pbody.applyImpulse(cp.v(40, 120), cp.v(-40, 80));
            return 2;
        } else {
            this.pbody.applyImpulse(cp.v(0, 150), cp.v(0, 240));
            return 1;
        }
    }
})