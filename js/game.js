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
    timerActive: false,
    timeouts: [],

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
        lives = $("#lives");

        lives.children().remove();
        for (var i = 0; i < num; i++) {
            lives.append("<div></div>");
        }

        $("#lives").children().bind("flicker", function() {
            $(this).fadeOut(500).delay(100).fadeIn(500).delay(50)
            .fadeOut(400).delay(50).fadeIn(400).delay(100)
            .fadeOut(300, function() {
                $(this).remove();
            });
        });
    },

    toggleState: function() {
        Crafty.trigger("ToggleState");
        Crafty.trigger("toggle_texture");
        $("body").toggleClass("dead");
    },

    hideTimer: function() {
        $("#timer").hide().width(255);
        $("#lives").show();

        if (gameBoard.timerActive) {
            $("#lives div:visible:last").trigger("flicker");
        }
    },

    startTimer: function(ms_seconds) {
        gameBoard.timerActive = true;
        $("#lives").hide();
        $("#timer").show().animate({
            width: "0"
        }, ms_seconds, "linear", gameBoard.hideTimer);
    },

    stopTimer: function() {
        gameBoard.timerActive = false;
        gameBoard.hideTimer();
        for (var i = 0; i < this.timeouts.length; i++)
        {
            clearTimeout(this.timeouts[i]);
        }
    },

    registerTimeout: function(tm) {
        this.timeouts.push(tm);
    },

    playerDied: function(ms_seconds) {
        this.livesLeft -= 1;
        if(this.livesLeft < 0) {
            levelManager.resetLevel();
            return false;
        } else {
            return true;
        }
    },

    writeDesc: function(content) {
        var contentArray = content.split(""),
            current = 0,
            elem = $("#game-info");
        elem.empty();
        setInterval(function() {
            if(current < contentArray.length) {
                elem.text(elem.text() + contentArray[current++]);
            }
        }, 100);
    }
}

var soundManager = {
    music_started: false,

    playSound: function(sound_id, volume) {
        Crafty.audio.play(sound_id, 1, volume);
    },

    startBackgroundMusic: function() {
        if(!this.music_started) {
            Crafty.audio.play("background_music", -1, 0.5);
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
