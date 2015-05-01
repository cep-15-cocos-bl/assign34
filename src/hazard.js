var HazardClass = cc.Sprite.extend({
    name: "hazard",
    world: null,
    pbody: null,
    pshape: null,

    ctor: function(game, gWorld, posX, posY, id) {

        // hard-coded
        width = 80;
        height = 80;

        this.world = gWorld;
        this.world.hazards[id] = this;

        this.pbody = new cp.Body(4, Infinity);
        this.pbody.addBody(this.pbody);

        this.pshape = this.world.addShape(this.pbody, width, height);
        this.pshape.setFriction(5);
        this.pshape.setElasticity(0.0);
        this.pshape.name = "hazard" + id;
        this.pshape.type = "hazard";
        this.pshape.id = id;

        this.pshape.setCollisionType("square");


    },

    die: function() {
        this.world.removeBody(this.pbody);
        this.world.removeShape(this.pshape);
        this.parent.removeChild(this);
    }
});