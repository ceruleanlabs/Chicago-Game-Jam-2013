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
    },

    hide: function () {
        this.removeComponent("solid", true);
        this.visible = false;
    },

    unhide: function() {
        this.addComponent("solid");
        this.visible = true;
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
        this.requires("DeathBlock, Color, SpriteAnimation, texture_fire").color("rgb(255, 0, 0)")
        .animate("fire_animation", 0, 12, 2)
        .animate('fire_animation', 20, -1);
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

Crafty.c("PressurePlate", {
    _linked_items: [],
    _pressed: false,

    init: function() {
        this.requires("2D, DOM, Color, Collision").color("rgb(255, 183, 88)");
        this.bind("EnterFrame",function(e) {
            if(this._pressed) {
                if(this.hit("Player") == false) {
                    this._pressed = false;
                    for(var i = 0; i < this._linked_items.length; i++) {
                        this._linked_items[i].unhide();
                    }
                }
            }
        });
    },

    press: function() {
        if(!this._pressed) {
            this._pressed = true;
            for(var i = 0; i < this._linked_items.length; i++) {
                this._linked_items[i].hide();
            }
        }
    },

    link_item: function(linked_item) {
        this._linked_items.push(linked_item);
    }
});