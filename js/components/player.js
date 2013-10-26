/**
* This file contains the player character.
*  
* Author: Fork It, We'll do it live!
*/

Crafty.c("Player", {
    _dead: false,
    _items: [],

    init: function() {
        this.requires("DOM, 2D, Collision, Movement, player_standing")
        .stopOnSolids();

        this.onHit('DeathBlock', function (deathblocks) {
            if(!this._dead) {
                // Play animation
                console.log('Play Animation', deathblocks[0].obj.get_animation());
                this._dead = true;
                that = this;
                setTimeout(function(){that.kill()},1000);
            }
        });

        this.onHit('Collectable', function (collectibles) {
            for (var i = 0 ; i < collectibles.length ; i++)
                this._items.push(collectibles[i].obj.collect());
        });
    },

    kill: function() {
        var dead_body = Crafty.e("2D, DOM, Color, player_dead_laying_down").attr({x: this.x, y: this.y, w: this.h, h: this.w});
        var new_player = Crafty.e("GhostPlayer").attr({x: this.x, y: this.y, w: this.w, h: this.h});
        new_player.set_items(this._items);
        if(Math.random() < 0.5) {
            dead_body.flip("X");
        }
        gameBoard.toggleState();
        gameBoard.playerDied();
        this.destroy();
    },

    has_key: function() {
        return _.contains(this._items, "key");
    },

    set_items: function(items) {
        this._items = items;
    }
});

Crafty.c("GhostPlayer", {
    _dead: false,
    _timer: 1000 * 10, // 10 seonds
    _items: [],

    init: function() {
        this.requires("DOM, 2D, Collision, Movement, player_dead_standing")
        .stopOnSolids();
        that = this;
        setTimeout(function(){that.kill()}, this._timer);
        gameBoard.startTimer(this._timer);
    },

    kill: function() {
        var new_player = Crafty.e("Player").attr({x: this.x, y: this.y, w: this.w, h: this.h});
        new_player.set_items(this._items);
        gameBoard.toggleState();
        this.destroy();
    },

    set_items: function(items) {
        this._items = items;
    }
});