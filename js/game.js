/**
* Main entry point for the game.
* 
* Author: Fork It, We'll do it live!
*/

var gameBoard = {
    height: 16,       // Height in tiles
    width: 16,        // Width in tiles
    tileSize: 32,     // Tile size in px squared
    actionKey: 72,    // H is the action key
    removeKey: 70,    // F is the remove key
    colorKey: 69,     // E is the take / give color key
    standardAnimationLength: 50,   // Number of frames to play animations
    nextMap: '',
    currentMap: '',
    livesLeft: 0,

    getHeight: function () {
        return this.height * this.tileSize;
    },
  
    getWidth: function () {
        return this.width * this.tileSize;
    },
  
    setNextMap: function(name) {
        this.nextMap = name;
    },
  
    getNextMap: function() {
        return this.nextMap;
    },

    setLives: function(num) {
        this.livesLeft = num;
        $("#lives").width(16 * num);
    },

    toggleState: function() {
        Crafty.trigger("ToggleState");
        Crafty.trigger("toggle_texture");
        $("body").toggleClass("dead");
    },

    startTimer: function(ms_seconds) {
        $("#lives").hide();
        $("#timer").show().animate({
            width: "0"
        }, ms_seconds, "linear", function() {
            $(this).hide().width(255);
            $("#lives").show();
        });
    },

    playerDied: function() {
        this.livesLeft -= 1;
        var w = $("#lives").width();
        $("#lives").width(w - 16);
    }
}

var soundManager = {
    music_started: false,

    playSound: function(sound_id) {
        Crafty.audio.play(sound_id);
    },

    startBackgroundMusic: function() {
        if(!this.music_started) {
            Crafty.audio.play("background_music", -1, 1);
            this.music_started = true;
        }
    },

    pauseBackgroundMusic: function() {
        Crafty.audio.pause("background_music");
    },

    unpauseBackgroundMusic: function() {
        Crafty.audio.unpause("background_music");
    }
}

$(document).ready(function () {
  Crafty.init(gameBoard.getWidth(), gameBoard.getHeight());
  Crafty.scene("loading");
  
  // Disable space bar page scrolling
  window.onkeydown = function(e) { 
    return !($.inArray(e.keyCode, [33,34,35,36,37,38,39,40,72]));
  };
});
