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

    toggleState: function() {
        Crafty.trigger("ToggleState");
        Crafty.trigger("toggle_texture");
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
