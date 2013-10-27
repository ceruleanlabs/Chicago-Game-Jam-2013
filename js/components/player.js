/**
* This file contains the player character.
*  
* Author: Fork It, We'll do it live!
*/

Crafty.c("Player", {
    init: function() {
        this._dead = false;
        this._items = [];
        this.requires("DOM, 2D, Collision, Movement, player_standing")
        .stopOnSolids();

        this.onHit('DeathBlock', function (deathblocks) {
            if(!this._dead) {
                // Play animation
                if(deathblocks[0].obj.get_animation() == "fire"){
                    this.removeComponent("player_standing");
                    this.addComponent("player_on_fire");
                }
                soundManager.playSound("player_hurt", 0.5);
                this._dead = true;
                that = this;
                gameBoard.registerTimeout(setTimeout(function(){that.kill()},1000));
            }
        });

        this.onHit('Arrow', function (arrows) {
            arrows[0].obj.destroy();
            soundManager.playSound("player_hurt", 0.5);
            this._dead = true;
            this.kill();
        });

        that = this;
        this.onHit('Collectable', function (collectibles) {
            for (var i = 0 ; i < collectibles.length ; i++) {
                if(!(collectibles[i].obj.has("texture_skeleton_key") || collectibles[i].obj.has("texture_skeleton_key_afterlife")))
                    that._items.push(collectibles[i].obj.collect());
            }
        });

        this.onHit('PressurePlate', function (plates) {
            plates[0].obj.press();
        });
    },

    kill: function() {
        if(gameBoard.playerDied() == false) return;
        var dead_body = Crafty.e("2D, DOM, Color, player_dead_laying_down").attr({x: this.x, y: this.y, w: this.h, h: this.w, z: -1});
        var new_player = Crafty.e("GhostPlayer").attr({x: this.x, y: this.y, w: this.w, h: this.h});
        new_player.set_items(this._items);
        if(Math.random() < 0.5) {
            dead_body.flip("X");
        }
        gameBoard.toggleState();
        soundManager.pauseBackgroundMusic();
        soundManager.playSound("spirit_music", 0.1);
        Crafty.trigger("StopMovement");
        this.destroy();
    },

    has_key: function() {
        that = this;
        return _.contains(that._items, "key");
    },

    set_items: function(items) {
        this._items = items;
    }
});

Crafty.c("GhostPlayer", {
    _dead: false,
    _timer: 1000 * 6, // 6 seconds
    _items: [],

    init: function() {
        this.requires("DOM, 2D, Collision, Movement, player_dead_standing")
        .stopOnSolids();
        that = this;
        gameBoard.registerTimeout(setTimeout(function(){that.kill()}, this._timer));
        gameBoard.startTimer(this._timer);

        this.onHit('Collectable', function (collectibles) {
            for (var i = 0 ; i < collectibles.length ; i++) {
                if(collectibles[i].obj.has("texture_skeleton_key") || collectibles[i].obj.has("texture_skeleton_key_afterlife"))
                    this._items.push(collectibles[i].obj.collect());
            }
        });
    },

    kill: function() {
        var new_player = Crafty.e("Player").attr({x: this.x, y: this.y, w: this.w, h: this.h});
        new_player.set_items(this._items);
        gameBoard.toggleState();
        soundManager.unpauseBackgroundMusic();
        Crafty.trigger("StopMovement");
        this.destroy();
    },

    set_items: function(items) {
        this._items = items;
    },

    has_key: function() {
        that = this;
        return _.contains(that._items, "key");
    },
});
