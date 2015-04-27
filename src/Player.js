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
        this.pshape.setFriction(1.0);
        this.pshape.setElasticity(0.0);

        this.pshape.setCollisionType("square");
    }
})