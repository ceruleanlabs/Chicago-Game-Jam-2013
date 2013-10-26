Crafty.c("Fence", {
    _is_solid: true,

    init: function() {
        this.requires("solid");
        this.bind("ToggleState", function() {
            if(this._is_solid) {
                this.removeComponent("solid", false);
                this._is_solid = false;
            } else {
                this.addComponent("solid");
                this._is_solid = true;
            }
        });
    }
});

Crafty.c("DeathBlock", {
    _animation: "default",

    init: function() {
        this.requires("2D, DOM");
    },

    get_animation: function() {
        return this._animation;
    }
});

Crafty.c("Fire", {
    init: function() {
        this.requires("DeathBlock, Color").color("rgb(255, 0, 0)");
        this._animation = "fire";
    }
});

Crafty.c("Door", {
    open: function() {
        soundManager.playSound("switch_on", 1);
        levelManager.loadMap(gameBoard.getNextMap());
    },

    init: function() {
        this.requires("2D, DOM, Color, Collision").color("rgb(30, 39, 13)");
        this.onHit('Player', function(players) {
            player = players[0].obj;
            if(player.has_key())
                this.open();
            else
                player.resetPosition();
        });

        this.onHit('GhostPlayer', function(players) {
            players[0].obj.resetPosition();
        });
    }
});

Crafty.c("Collectable", {
    _item_name: "default",
    init: function() {
        this.requires("2D, DOM, Color").color("rgb(238, 183, 88)");
    },

    collect: function() {
        soundManager.playSound("switch_off", 1);
        this.destroy();
        return this._item_name;
    },

    Collectable: function(name) {
        this._item_name = name;
        return this;
    }
});