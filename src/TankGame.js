var TankGame = TankGame || {};

// -------------------------------------
//
// -------------------------------------

TankGame.TankObject = function(game, x, y, angle, graphic) {
    this.game = game;

    this.alive = true;

    this.sprite = new Phaser.Sprite(this.game, x, y, 'tankbody');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.turretSpr = new Phaser.Sprite(this.game, -this.sprite.width*.1, 0, 'tankturret');
    this.turretSpr.anchor.setTo(0.25, 0.5);
    this.sprite.addChild(this.turretSpr);
    this.linearVelocity = 0;

    this.targetMove = new Phaser.Point(500, 500); //null;
}

TankGame.TankObject.prototype = {

    updateMoveToTarget: function() {

        // Compute relative distances to target
        if (this.targetMove) {
            var targetDist = this.game.physics.distanceBetween(this.sprite, this.targetMove);
            var targetAngle = this.game.physics.angleBetween(this.sprite, this.targetMove);
            var angleDiff = this.game.math.normalizeAngle(targetAngle - this.sprite.rotation);

            if (targetDist < 5) {
                this.targetMove = null;
            }
        }

        if (!this.targetMove) {
            // Decelerate
            this.linearVelocity = Math.max(this.linearVelocity - 5, 0);
            this.sprite.body.angularAcceleration = 0;
            this.sprite.body.angularVelocity = 0;
        } else {

            // Move in reverse if target is behind, otherwise forward
            if (Math.abs(angleDiff) > Math.PI/2) {
                this.linearVelocity = Math.max(this.linearVelocity - 3, -20);
            } else {
                this.linearVelocity = Math.min(this.linearVelocity + 3, 80)
            }

            // Rotate towards target
            this.sprite.body.angularDrag = 0;
            if (Math.abs(angleDiff) < 0.05) {
                this.sprite.body.angularAcceleration = 0;
                this.sprite.body.angularVelocity = 0;
                this.sprite.rotation = targetAngle;
            } else if (angleDiff < 0) {
                this.sprite.body.angularVelocity = Math.max(this.sprite.body.angularVelocity - 3, -60);
            } else {
                this.sprite.body.angularVelocity = Math.min(this.sprite.body.angularVelocity + 3, 60);
            }
        }

        // Set velocity from rotation and linear velocity
        this.game.physics.velocityFromAngle(this.sprite.angle, this.linearVelocity, this.sprite.body.velocity);

    },

    update: function () {
        // this.sprite.angle += 1;
        // this.turretSpr.angle += 1;
        // this.game.physics.velocityFromAngle(this.sprite.angle, 50, this.sprite.body.velocity);
        this.updateMoveToTarget();
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

        // Create the layers where objects will reside, the layers will be rendered in order
        this.layerGround = this.game.add.group();
        this.layerObjects = this.game.add.group();
        this.layerAir = this.game.add.group();
        this.layerGUI = this.game.add.group();

        // Create the ground map that we loaded.
        var map = this.game.add.tilemap("desert");
        var tileset = this.game.add.tileset("desertgfx");
        this.layerGround.add(new Phaser.TilemapLayer(this.game, 0, 0, map.layers[0].width*tileset.tileWidth, 600, tileset, map, 0));

        // Create the appropriate gameobjects
        this.player = new TankGame.TankObject(this.game, 300, 300, 45);
        this.layerGround.add(this.player.sprite);

        // Create GUI
        var button = new Phaser.Button(this.game, this.game.width/2, 100, 'quitbtn', this.quitGame, this, 1, 0, 2);
        button.anchor.setTo(0.5, 0.5);
        this.layerGUI.add(button);

        this.target = this.layerGround.add(new Phaser.Sprite(this.game, 500, 500, "target"));
        this.target.anchor.setTo(0.5, 0.5);
        this.player.targetMove = this.target.position.clone();

        this.game.input.onUp.add(this.onClick, this);
    },

    update: function () {
        this.player.update();
    },

    onClick: function() {
        this.target.x = this.game.input.worldX;
        this.target.y = this.game.input.worldY;
        this.target.body.reset();
        this.player.targetMove = new Phaser.Point(this.target.x, this.target.y);
    },

    quitGame: function () {
        this.game.state.start('mainmenu');
    }
}
