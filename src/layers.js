var bgLayer = cc.Layer.extend({

    ctor:function() {
        this._super();

        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var spriteBG = cc.Sprite.create(res.background_png);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
    }

});

var menuLayer = cc.Layer.extend({

    labelTime: null,
    timer: 30,

    generateText: function() {
        return "Bottom Left: Jump forward, left;\t" +
            "Bottom Right: Jump forward, right\n" +
            "Top Left: Jump upward, left; \t" +
            "Top right: Jump upward, right \n" +
            "Below: Jump directly up"
    },

    ctor:function() {
        this._super();

        var winsize = cc.director.getWinSize();

        this.labelTime = new cc.LabelTTF(
            this.generateText(30), "Helvetica", 8
        );

        this.labelTime.setPosition(cc.p(winsize.width/2, 16));
        this.labelTime.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.labelTime);
    },

    update: function() {
        this.timer--;

        if(this.timer == 0) {
            cc.director.replaceScene(new gameScene());
        }

        this.labelTime.setString(this.generateText());
    }

});