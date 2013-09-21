var TankGame = TankGame || {};

// -------------------------------------
//
// -------------------------------------

TankGame.TankObject = function(game, x, y, angle) {
    this.game = game;

    this.bodySpr = this.game.add.sprite(x, y, 'tankbody');
    this.bodySpr.anchor.setTo(0.5, 0.5);
    this.turretSpr = new Phaser.Sprite(this.game, 0, this.bodySpr.height*.1, 'tankturret');
    this.turretSpr.anchor.setTo(0.5, 0.7);
    this.bodySpr.addChild(this.turretSpr);
}

TankGame.TankObject.prototype = {
    update: function () {
        this.bodySpr.angle += 1;
        this.turretSpr.angle += 1;
    },
}

// -------------------------------------
//
// -------------------------------------

TankGame.Game = function (game) {
    this.game = game;
    console.log("game")
};

TankGame.Game.prototype = {
    create: function () {
        console.log("game created")
        // var bg = this.game.add.sprite(0, 100, 'nocooper');
        // bg.scale.setTo(2.5, 2.5);

        // var t = this.game.add.sprite(100, 600, 'touhou');
        // t.anchor.setTo(0, 1);

        this.game.add.tilemap(0, 0, "desert");


        this.player = new TankGame.TankObject(this.game, 300, 300, 45);



        button = this.game.add.button(this.game.width/2, 100, 'quitbtn', this.quitGame, this, 1, 0, 2);
        button.anchor.setTo(0.5, 0.5);
    },

    update: function () {
        this.player.bodySpr.angle += 1;
        this.player.turretSpr.angle += 1;
    },

    quitGame: function () {
        this.game.state.start('mainmenu');
    }
}
