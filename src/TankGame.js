var TankGame = {};

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
        this.game.load.image('startbtn', 'images/StartGame.png');
        this.game.load.image('startbtn_h', 'images/StartGameHover.png');
        this.game.load.image('quitbtn', 'images/QuitGame.png');
        this.game.load.image('quitbtn_h', 'images/QuitGameHover.png');
        this.game.load.image('creditsbtn', 'images/Credits.png');
        this.game.load.image('creditsbtn_h', 'images/CreditsHover.png');

        this.game.load.bitmapFont('regular', 'fonts/gunplay24_0.png', 'fonts/gunplay24.fnt');

        this.game.load.tilemap('desert', 'maps/tmw_desert_spacing.png', 'maps/desert.json', null, Phaser.Tilemap.JSON);

        // this.game.load.image('cougar', '../assets/pics/cougar_ihsf.png');
        // this.game.load.spritesheet('button', '../assets/buttons/button_sprite_sheet.png', 193, 71);
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
        button = this.game.add.button(this.game.width/2, 300, 'startbtn', this.startGame, this, "startbtn_h", 1, 0);
        button.anchor.setTo(0.5, 0.5);
        button = this.game.add.button(this.game.width/2, 500, 'creditsbtn', this.credits, this, "creditsbtn_h", 1, 0);
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

        button = this.game.add.button(this.game.width/2, 100, 'quitbtn', this.quitGame, this, "quitbtn_h", 1, 0);
        button.anchor.setTo(0.5, 0.5);
    },

    quitGame: function () {
        this.game.state.start('mainmenu');
    }
}
