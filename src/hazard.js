var HazardClass = cc.Sprite.extend({
    name: "hazard",
    world: null,
    pbody: null,
    pshape: null,
    isStatic: false,

    ctor: function(game, gWorld, posX, posY, id) {

        // hard-coded
        width = 50;
        height = 50;

        this.world = gWorld;
        this.world.env.hazards[id] = this;

        this.pbody = new cp.Body(4, Infinity);
        this.pbody.setPos(cp.v(posX, posY));
        this.world.addBody(this.pbody);

        this.pshape = this.world.addShape(new cp.BoxShape(this.pbody, width, height));
        this.pshape.setFriction(5);
        this.pshape.setElasticity(0.0);
        this.pshape.name = "hazard";
        this.pshape.id = id;

        this.pshape.setCollisionType("hazard");
    },

    die: function() {
        this.world.removeBody(this.pbody);
        this.world.removeShape(this.pshape);
        this.parent.removeChild(this);
    }
});