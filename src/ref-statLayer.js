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

        this.labelScore = new cc.LabelTTF("Score:0", "Helvetica", 20);
        this.labelScore.setColor(cc.color(254,254,254));//black color
        this.labelScore.setPosition(cc.p(70, winsize.height - 20));
        this.addChild(this.labelScore);

    },
    addScore:function (num) {
        this.score += num;
        this.labelScore.setString("Score:" + this.score);
    }

});