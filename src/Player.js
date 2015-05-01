var PlayerClass = cc.Sprite.extend({
    pName: "player",
    world: null,
    pbody: null,
    pshape: null,
    playerSprite: null,
    jumpSprite: null,
    walkAction: null,
    jumpAction: null,

    ctor: function(game, gWorld, posX, posY) {

        // hard-coded
        width = 40;
        height = 40;

        this.world = gWorld;

        this.pbody = new cp.Body(1, cp.momentForBox(10, 10, 10));
        this.pbody.setPos(cp.v(posX, posY));
        this.world.addBody(this.pbody);

        this.pshape = this.world.addShape(new cp.BoxShape(this.pbody, 20, 20));
        this.pshape.setFriction(10.0);
        this.pshape.setElasticity(0.0);

        this.pshape.setCollisionType("square");
    },

    jump: function(compare) {
        if(compare > this.pbody.getPos().x) { // jump left
            this.pbody.applyImpulse(cp.v(-10, 20), cp.v(0, 480));
            return 2;
        } else if(compare < this.pbody.getPos().x) { // jump right
            this.pbody.applyImpulse(cp.v(10, 20), cp.v(0, 0));
            return 1;
        } else {
            this.pbody.applyImpulse(cp.v(0, 25), cp.v(0, 240));
            return 0;
        }
    }
})