var levelManager = {
    tileMap: {
        X: function (x, y) { levelManager.createWall(x, y); },
        F: function (x, y) { Crafty.e("2D, DOM, Fence, SwitchableTexture").SwitchableTexture("texture_fence_up").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize}); },
        G: function (x, y) { Crafty.e("2D, DOM, Fence, SwitchableTexture").SwitchableTexture("texture_fence_right").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize}); },
        H: function (x, y) { Crafty.e("2D, DOM, Fence, SwitchableTexture").SwitchableTexture("texture_fence_left").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize}); },
        J: function (x, y) { Crafty.e("2D, DOM, Fence, SwitchableTexture").SwitchableTexture("texture_fence_down").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize}); },
        C: function (x, y) { Crafty.e("2D, DOM, Fire").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize}); },
        D: function (x, y) { Crafty.e("Door").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize}); },
        K: function (x, y) { Crafty.e("Collectable").Collectable("key").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize}); },
        O: function (x, y) { Crafty.e("Door, SwitchableTexture").SwitchableTexture("texture_door_right_left").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize}); },
        P: function (x, y) { Crafty.e("Door, SwitchableTexture").SwitchableTexture("texture_door_right_right").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize}); }
    },

    createWall: function (x, y) {
        Crafty.e("2D, DOM, solid, SwitchableTexture").SwitchableTexture("texture_stone_wall").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize});
    },

    loadMap: function (level, loadComplete) {
        var map = null;
        $.get('map/load/'+level, function(data) {
            Crafty.scene(level.toString(), function () {
                mapData = jQuery.parseJSON(data);
                var map = null;
                // Set the background to light gray
                Crafty.background("#9F9F9F");
                // get next map
                var nextMap = mapData.metadata.nextMap;
                gameBoard.setNextMap(nextMap);
                gameBoard.currentMap = level;
                gameBoard.setLives(mapData.metadata.lives);
                console.log("set", nextMap);
              
                for (var a = 0; a < mapData.layers.length; a++) {
                    map = mapData.layers[a];
                    for (var i = 0; i < map.length; i++) {
                        for (var j = 0; j < map[0].length; j++) {
                             Crafty.e("2D, DOM, SwitchableTexture").SwitchableTexture("texture_stone_floor").attr({x: j*gameBoard.tileSize, y: i*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize});
                            if(levelManager.tileMap[map[i][j]])
                                levelManager.tileMap[map[i][j]](j, i);
                        }
                    }
                }
                if(loadComplete) loadComplete();
            });
            Crafty.scene(level.toString());
            Crafty.trigger("StopMovement");
            Crafty.e("Player").attr({x: 3*gameBoard.tileSize, y: 3*gameBoard.tileSize, w: 32, h: 55});
            soundManager.startBackgroundMusic();
        });
    },
    
    resetLevel: function () {
      Crafty.scene(gameBoard.currentMap);
    }
}

