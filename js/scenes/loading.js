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
        texture_stone_wall: [0, 1],
        texture_stone_floor: [0, 0],
        texture_stone_wall_afterlife: [1, 1],
        texture_stone_floor_afterlife: [1, 0],
        texture__fence_up: [0, 2],
        texture__fence_up_afterlife: [1, 2],
        texture__fence_right: [0, 3],
        texture__fence_right_afterlife: [1, 3],
        texture__fence_down: [0, 4],
        texture__fence_down_afterlife: [1, 4],
        texture__fence_left: [0, 5],
        texture__fence_left_afterlife: [1, 5],
        texture__fence_left_afterlife: [1, 5]
    });

    Crafty.sprite("images/Player_sprite_sheet.png", {
        player_standing: [0,0,32,55],
        player_dead_standing: [32,0,32,55],
        player_dead_laying_down: [0,55,55,32]
    });

    // Audio
    Crafty.audio.add({
        switch_off: ["sounds/switch_off_sfx.mp3",
        "sounds/switch_off_sfx.wav"],
        switch_on: ["sounds/switch_on_sfx.mp3",
        "sounds/switch_on_sfx.wav"]
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
