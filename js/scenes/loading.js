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
        texture_fence_up: [0, 2],
        texture_fence_up_afterlife: [1, 2],
        texture_fence_right: [0, 3],
        texture_fence_right_afterlife: [1, 3],
        texture_fence_down: [0, 4],
        texture_fence_down_afterlife: [1, 4],
        texture_fence_left: [0, 5],
        texture_fence_left_afterlife: [1, 5],
        texture_fence_left_afterlife: [1, 5],
        texture_door_up_left: [0, 6],
        texture_door_up_right: [1, 6],
        texture_door_right_left: [0, 7],
        texture_door_right_right: [0, 8],
        texture_door_down_left: [1, 9],
        texture_door_down_right: [0, 0],
        texture_door_left_left: [0, 11],
        texture_door_left_right: [0, 10],
        texture_door_up_left_afterlife: [2, 6],
        texture_door_up_right_afterlife: [3, 6],
        texture_door_right_left_afterlife: [2, 7],
        texture_door_right_right_afterlife: [2, 8],
        texture_door_down_left_afterlife: [3, 9],
        texture_door_down_right_afterlife: [2, 0],
        texture_door_left_left_afterlife: [2, 11],
        texture_door_left_right_afterlife: [2, 10],
        texture_fire: [0, 12],
        texture_key: [0, 13],
        texture_key_afterlife: [1, 13],
        texture_skeleton_key: [2, 13],
        texture_skeleton_key_afterlife: [3, 13],
        texture_pressure_plate: [0, 14],
        texture_pressure_plate_afterlife: [1, 14],
        texture_pressure_plate_pressed: [0, 15],
        texture_pressure_plate_pressed_afterlife: [1, 15],
        texture_arrow: [0, 16],
        texture_wall_torch: [2, 1],
        texture_wall_torch_afterlife: [3, 1],
        texture_wood_floor: [2, 0],
        texture_wood_floor_afterlife: [3, 0]
    });

    Crafty.sprite("images/Player_sprite_sheet.png", {
        player_standing: [0,0,32,55],
        player_dead_standing: [32,0,32,55],
        player_dead_laying_down: [0,55,55,32],
        player_on_fire: [0,142,32,55],
        texture_gargoyle_down: [0, 197, 32, 32],
        texture_gargoyle_up: [32, 197, 32, 32],
        texture_gargoyle_right: [64, 197, 32, 32],
        texture_gargoyle_left: [96, 197, 32, 32],
        texture_gargoyle_down_afterlife: [0, 229, 32, 32],
        texture_gargoyle_up_afterlife: [32, 229, 32, 32],
        texture_gargoyle_right_afterlife: [64, 229, 32, 32],
        texture_gargoyle_left_afterlife: [96, 229, 32, 32]
    });

    // Audio
    Crafty.audio.add({
        switch_off: ["sounds/switch_off_sfx.mp3",
        "sounds/switch_off_sfx.wav"],
        switch_on: ["sounds/switch_on_sfx.mp3",
        "sounds/switch_on_sfx.wav"],
        turning_ghost: ["sounds/turning_ghost.mp3",
        "sounds/turning_ghost.wav"],
        background_music: ["sounds/on_a_quest.mp3"],
        spirit_music: ["sounds/spirit_music.mp3"],
        player_hurt: ["sounds/player_hurt.wav"]
    });

    // Loads the sprite color module from an external source
    Crafty.modules({ SpriteColor: 'RELEASE' }, function () {
        // Simulate a load time for now to make sure this works
        setTimeout(function () {
          levelManager.loadMap(1, null); //when everything is loaded, run the main scene
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
