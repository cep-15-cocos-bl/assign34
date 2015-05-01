var HazardClass = cc.Sprite.extend({
    game: null,
    name: "hazard",
    world: null,
    pbody: null,
    pshape: null,
    enemysprite: null,

    ctor: function(game, gWorld, posX, posY, id) {

        this.game = game;

        this.enemysprite = new cc.Sprite.create(res.enemy_png);
        this.game.addChild(this.enemysprite,0);
        this.enemysprite.setPosition(posX,posY);

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
        this.pshape.image = this.enemysprite;
        this.pshape.id = id;

        this.pshape.setCollisionType("hazard");
    },

    updatePosition: function() {
        this.enemysprite.setPosition(this.pbody.p.x, this.pbody.p.y);
    },

    die: function() {
        try {
            this.world.removeBody(this.pbody);
            this.world.removeShape(this.pshape);
            this.game.removeChild(this.enemysprite);
        } catch(err) {
            
        }
    }
});