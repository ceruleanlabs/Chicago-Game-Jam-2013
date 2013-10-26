/**
* This file contains the player character.
*  
* Author: Fork It, We'll do it live!
*/

Crafty.c("Player", {
    _dead: false,

    init: function() {
        this.requires("DOM, Color, 2D, Collision, Movement")
        .color('rgb(20, 75, 40)')
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
    },

    kill: function() {
        Crafty.e("2D, DOM, Color").color("rgb(200, 0, 0)").attr({x: this.x, y: this.y, w: gameBoard.tileSize, h: gameBoard.tileSize});
        Crafty.e("GhostPlayer").attr({x: this.x, y: this.y, w: gameBoard.tileSize, h: gameBoard.tileSize});
        gameBoard.toggleState();
        this.destroy();
    },

    has_key: function() {
        return true;
    }
});

Crafty.c("GhostPlayer", {
    _dead: false,
    _timer: 1000 * 10, // 10 seonds

    init: function() {
        this.requires("DOM, Color, 2D, Collision, Movement")
        .color('rgb(20, 40, 75)')
        .stopOnSolids();
        that = this;
        setTimeout(function(){that.kill()}, this._timer);
    },

    kill: function() {
        Crafty.e("Player").attr({x: this.x, y: this.y, w: gameBoard.tileSize, h: gameBoard.tileSize});
        gameBoard.toggleState();
        this.destroy();
    }
});