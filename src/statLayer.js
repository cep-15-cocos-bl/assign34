var StatusLayer = cc.Layer.extend({
    labelScore:null,
    score:0,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();

        this.labelScore = new cc.LabelTTF("0 of 4 tokens collected", "Helvetica", 15);
        this.labelScore.setColor(cc.color(254,254,254));
        this.labelScore.setPosition(cc.p(100, winsize.height - 20));
        this.addChild(this.labelScore);

    },
    addScore:function (num) {
        this.score += num;
        if(this.score < 4) {
            this.labelScore.setString(this.score + " of 4 tokens collected");
            return false;
        } else {
            this.labelScore.set
            this.labelScore.setString("You win!\nAll tokens collected!");
            this.labelScore.setColor(cc.color(0,254,0));
            return true;
        }
    },
    gameOver:function() {
        this.labelScore.setString("Game over! You died!");
        this.labelScore.setColor(cc.color(254,0,0));
    }
	

});