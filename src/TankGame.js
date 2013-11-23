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

            if (targetDist < 20) {
                this.targetMove = null;
            }
        }

        if (!this.targetMove) {
            // Decelerate
            this.linearVelocity = Math.max(this.linearVelocity - 3, 0);
            this.sprite.body.angularAcceleration = 0;
            this.sprite.body.angularVelocity = 0;
        } else {

            // Move in reverse if target is behind, otherwise forward
            var desiredLinearVelocity;
            if (Math.abs(angleDiff) > Math.PI/2) {
                desiredLinearVelocity = -20; // Reverse
            } else {
                // Use cos() to lower our top speed if we're not looking straight at target
                desiredLinearVelocity = 80*Math.cos(angleDiff);
            }
            if (desiredLinearVelocity < this.linearVelocity) {
                this.linearVelocity = Math.max(this.linearVelocity - 3, desiredLinearVelocity);
            } else {
                this.linearVelocity = Math.min(this.linearVelocity + 1, desiredLinearVelocity);
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

        this.game.world.boot();

        // Create the layers where objects will reside, the layers will be rendered in order
        this.layerGround = this.game.add.group();
        this.layerObjects = this.game.add.group();
        this.layerAir = this.game.add.group();
        this.layerGUI = this.game.add.group();
        this.rootGUI = this.layerGUI.add(new Phaser.Sprite(this.game, 0, 0, "empty"));
        this.rootGUI.fixedToCamera = true;

        // Create the ground map that we loaded and resize the world to be that size
        var map = this.game.add.tilemap("desert");
        var tileset = this.game.add.tileset("desertgfx");
        var mapLayer = new Phaser.TilemapLayer(this.game, 0, 0, this.game.width, this.game.height, tileset, map, 0);
        mapLayer.resizeWorld();
        this.layerGround.add(mapLayer);

        // Create the appropriate gameobjects
        this.player = new TankGame.TankObject(this.game, 300, 300, 45);
        this.layerObjects.add(this.player.sprite);

        // Create GUI
        var button = new Phaser.Button(this.game, this.game.width/2, 100, 'quitbtn', this.quitGame, this, 1, 0, 2);
        button.anchor.setTo(0.5, 0.5);
        this.rootGUI.addChild(button);

        this.target = this.layerGround.add(new Phaser.Sprite(this.game, 500, 500, "target"));
        this.target.anchor.setTo(0.5, 0.5);
        this.player.targetMove = this.target.position.clone();

        this.game.input.onUp.add(this.onClick, this);
        this.game.camera.follow(this.player.sprite);
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
