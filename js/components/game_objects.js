Crafty.c("Fence", {
    _is_solid: true,

    init: function() {
        this.requires("solid");
        this.bind("ToggleState", function() {
            if(this._is_solid) {
                this.removeComponent("solid");
                this._is_solid = false;
            } else {
                if(this.visible) this.addComponent("solid");
                this._is_solid = true;
            }
        });
    },

    hide: function () {
        this.removeComponent("solid");
        this.visible = false;
    },

    unhide: function() {
        this.addComponent("solid");
        this.visible = true;
    }
});

Crafty.c("Arrow", {
    _speed: 100,
    _lastFrame: null,
    _direction: [0, 0],
    _direction_set: false,
    init: function() {
        this.requires("2D, DOM, Collision, texture_arrow")
        .collision(new Crafty.polygon([0,10], [32,10], [32,22], [0,22]));
        this._lastFrame = new Date().getTime();

        this.bind("EnterFrame",function(e) {
            if(this._direction_set === false) {
                this._direction_set = true;
                if(this._direction[0] == -1)
                    this.flip("X");
                if(this._direction[1] == 1)
                    this.rotation = 90;
                if(this._direction[1] == -1) {
                    this.rotation = 270;
                }
            }

            var now = new Date().getTime();
            var dt = (now - (this._lastFrame || now)) / 1000; // Elapsed time in seconds
            this._lastFrame = now;
            this.x = this.x + (this._direction[0] * this._speed * dt);
            this.y = this.y + (this._direction[1] * this._speed * dt);
            if((this.x < 0 || this.x > gameBoard.getWidth()) && (this.y < 0 || this.y > gameBoard.getHeight()))
                this.destroy();
        });
    },

    Arrow: function(direction) {
        this._direction = direction;
        return this;
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

Crafty.c("Gargoyle", {
    _arrow_speed:3000,
    _last_shot: null,
    init: function() {
        this.requires("2D, DOM, solid");
        this._last_shot = new Date().getTime();
        this._arrow_speed = 2500 + Math.random() * 1000;

        this.bind("EnterFrame",function(e) {
            var now = new Date().getTime();
            if(now - this._last_shot > this._arrow_speed) {
                this._last_shot = now;
                if(this.has("texture_gargoyle_right"))
                    Crafty.e("Arrow").Arrow([1, 0]).attr({x: this.x, y: this.y, w: gameBoard.tileSize, h: gameBoard.tileSize});
                else if(this.has("texture_gargoyle_left"))
                    Crafty.e("Arrow").Arrow([-1, 0]).attr({x: this.x, y: this.y, w: gameBoard.tileSize, h: gameBoard.tileSize});
                else if(this.has("texture_gargoyle_down"))
                    Crafty.e("Arrow").Arrow([0, 1]).attr({x: this.x + 32, y: this.y, w: gameBoard.tileSize, h: gameBoard.tileSize});
                else if(this.has("texture_gargoyle_up"))
                    Crafty.e("Arrow").Arrow([0, -1]).attr({x: this.x, y: this.y, w: gameBoard.tileSize, h: gameBoard.tileSize});
            }
        });
    }
});

Crafty.c("Door", {
    open: function() {
        if(levelManager.door_opened) return;

        levelManager.door_opened = true;
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
            player = players[0].obj;
            if(player.has_key())
                this.open();
            else
                player.resetPosition();
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
                if(this.hit("Player") === false && this.hit("player_dead_laying_down") === false) {
                    this._pressed = false;
                    soundManager.playSound("switch_off", 0.8);
                    this.removeComponent("texture_pressure_plate_pressed");
                    this.addComponent("texture_pressure_plate");
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
            soundManager.playSound("switch_on", 0.8);
            this.removeComponent("texture_pressure_plate");
            this.addComponent("texture_pressure_plate_pressed");
            for(var i = 0; i < this._linked_items.length; i++) {
                this._linked_items[i].hide();
            }
        }
    },

    link_item: function(linked_item) {
        this._linked_items.push(linked_item);
    }
});
