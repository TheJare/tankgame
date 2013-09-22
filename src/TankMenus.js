var TankGame = TankGame || {};

// -------------------------------------
//
// -------------------------------------
TankGame.Preloader = function (game) {
    this.game = game;
    console.log("preloader")
}

TankGame.Preloader.prototype = {
    preload: function () {
        this.game.load.image('menubkg', 'images/MenuBackground.png');
        this.game.load.spritesheet('startbtn', 'images/StartGameBtn.png', 0, -3);
        this.game.load.spritesheet('quitbtn', 'images/QuitGameBtn.png', 0, -3);
        this.game.load.spritesheet('creditsbtn', 'images/CreditsBtn.png', -1, -3);

        this.game.load.bitmapFont('regular', 'fonts/gunplay24_0.png', 'fonts/gunplay24.fnt');

        this.game.load.image('target', 'images/Target.png');
        this.game.load.image('tankbody', 'images/GreenTankBody_2.png');
        this.game.load.image('tankturret', 'images/GreenTankTurret_2.png');

        this.game.load.tilemap('desert', 'maps/tmw_desert_spacing.png', 'maps/desert.json', null, Phaser.Tilemap.JSON);

        // this.game.load.atlas('breakout', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json');
    },
    update: function () {
        console.log("preloader created")
        this.game.state.start('mainmenu');
    }
}

// -------------------------------------
//
// -------------------------------------

TankGame.MainMenu = function (game) {
    this.game = game;
    console.log("mainmenu")
};

TankGame.MainMenu.prototype = {
    create: function () {
        console.log("mainmenu created")
        var bg = this.game.add.sprite(0, 0, 'menubkg');
        //bg.scale.setTo(2.5, 2.5);

        // var t = this.game.add.sprite(100, 600, 'touhou');
        // t.anchor.setTo(0, 1);

        var button;
        button = this.game.add.button(this.game.width/2, 300, 'startbtn', this.startGame, this, 1, 0, 2);
        button.anchor.setTo(0.5, 0.5);
        button = this.game.add.button(this.game.width/2, 500, 'creditsbtn', this.credits, this, 1, 0, 2);
        button.anchor.setTo(0.5, 0.5);
    },

    startGame: function () {
        this.game.state.start('game');
    },
    credits: function () {
        this.game.state.start('creditsmenu');
    }
}

// -------------------------------------
//
// -------------------------------------

TankGame.CreditsMenu = function (game) {
    this.game = game;
    console.log("creditsmenu")
};

TankGame.CreditsMenu.prototype = {
    create: function () {
        console.log("creditsmenu created")
        this.game.add.bitmapText(this.game.width/2, 100, 'Credits', { font: '96 Gunplay', align: 'center' }).anchor.setTo(0.5, 0.5);
        this.creditsText = this.game.add.bitmapText(this.game.width/2, 300, 'Tank Game\nby\nJavier Arevalo\nyeah', { font: 'Gunplay', align: 'center' });
        this.creditsText.anchor.setTo(0.5, 0.5);

        this.game.input.onUp.add(this.quitCredits, this);
    },

    update: function() {
        this.creditsText.angle += 1;
    },

    quitCredits: function () {
        this.game.state.start('mainmenu');
    }
}
