/**
* This file contains the player movement component.
*
* Author: Fork It, We'll do it live!
*/

Crafty.c("Moveable", {
    // Init the speed in px per second
    Moveable: function(cSpeed) {
        this._speed = cSpeed;
        this._previous_x = null;
        this._previous_y = null;
        return this;
    },

    init: function() {
        this._speed = 3 || this._speed;
    },

    EntityMove: function (direction) {
        this._previous_x = this.x;
        this._previous_y = this.y;
        this.x += direction[0] * this._speed;
        this.y += direction[1] * this._speed;
    },

    resetPosition: function() {
        if (typeof(this._previous_x) !== "undefined" && typeof(this._previous_y) !== "undefined") {
            this.x = this._previous_x;
            this.y = this._previous_y;
        } else if (this.x < 0 || this.y < 0) {
            levelManager.resetLevel();
        } else {
            this.x -= 1;
            this.y -= 1;
        }
    },

    // Registers a stop-movement function to be called when
    // this entity hits an entity with the "Solid" component
    stopOnSolids: function() {
        this.onHit('solid', this.resetPosition);

        return this;
    }
});

Crafty.c("Movement", {
    movementEnabled: true,
    _speed: 3,
    _facing: [],
    _directions: [],
    _keys: {
        UP_ARROW: [0,-1],
        DOWN_ARROW: [0,1],
        RIGHT_ARROW: [1,0],
        LEFT_ARROW: [-1,0],
        W: [0,-1],
        S: [0,1],
        D: [1,0],
        A: [-1,0]
    },

    init: function() {
        this.requires('Keyboard, Moveable');

        // Map the defined keys to the key codes
        for(var k in this._keys) {
          var keyCode = Crafty.keys[k] || k;
          this._keys[keyCode] = this._keys[k];
        }

        // Trigger a movement in the direction
        this.bind("KeyDown",function(e) {
            if(this._keys[e.key] && this.movementEnabled) {
                var direction = this._keys[e.key];
                // Add the direction to the movement stack
                this._directions.push(direction);
                // Tell the player to face a new direction
                this.trigger('NewDirection',direction);
            }
        });

        // Reenable movement if space is up
        this.bind("KeyUp",function(e) {
            if(e.key == gameBoard.actionKey || e.key == gameBoard.colorKey) {
                if(e.key == gameBoard.actionKey) this.movementEnabled = true;
                if(!this.isDown(gameBoard.actionKey)) this.trigger('NewDirection',this._facing);
            }
            // Remove a direction key from the movement stack if necessary
            else if(this._keys[e.key]) {
                var that = this;
                var direction = this._keys[e.key];
                $.each(this._directions, function(i){
                    if(that._directions[i] === direction) that._directions.splice(i,1);
                });
            }
        });

        // Causes the player to move if their is a direction being pushed
        this.bind("EnterFrame",function(e) {
            if(this._directions.length > 0 && this.movementEnabled) {
                this.EntityMove(this._directions[this._directions.length - 1]);
                this._facing = this._directions[this._directions.length - 1];
            }
        });

        // Clears the key stack
        this.bind("StopMovement", function() {
            this._directions = [];
        });
    },

    applyTrigger: function(action) {
        for(var k in this._keys) {
            if(this.isDown(k)) {
                var direction = this._keys[k];
                this.trigger(action, direction);
                return;
            }
        }
    }
});
