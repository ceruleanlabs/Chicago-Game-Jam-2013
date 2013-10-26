/**
* The loading screen that will display while our assets load
*
* Author: Fork It, We'll do it live!
*/

Crafty.scene("loading", function () {
  //load takes an array of assets and a callback when complete
  Crafty.load(["images/sprite_sheet.png"], function () {
    // Creates the sprite for the player
    Crafty.sprite(32, "images/sprite_sheet.png", {
        stone_wall: [0, 1],
        stone_floor: [0, 0]
    });
    
    // Loads the sprite color module from an external source
    Crafty.modules({ SpriteColor: 'RELEASE' }, function () {
        // Simulate a load time for now to make sure this works
        setTimeout(function () {
          levelManager.loadMap(0, null); //when everything is loaded, run the main scene
        }, 500);
    });
  });

  //black background with some loading text
  Crafty.background("#000");
  Crafty.e("2D, DOM, Text").attr({ w: 515, h: 515, x: 0, y: 0 })
      .text("Loading...")
      .css({  "padding-top": "200px",
              "text-align": "center",
              "background-color": "black",
              "font-weight": "bold",
              "font-size": "24px",
              "color": "white" });
});
