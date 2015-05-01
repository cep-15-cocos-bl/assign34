var menuScene = cc.Scene.extend({
    instructionLayer: null,
    onEnter: function() {

        this.instructionLayer = new menuLayer();
        this.addChild(this.instructionLayer);

        this.schedule(this.countdown, 1);
        this.scheduleUpdate();
    },

    update: function(dt) {

    },

    countdown: function() {
        console.log("why");
        this.instructionLayer.update();
    }
});