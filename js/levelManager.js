var levelManager = {
    tileMap: {
        X: function (x, y) { levelManager.createWall(x, y); }
    },

    createWall: function (x, y) {
        Crafty.e("2D, DOM, solid, stone_wall").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize});
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
                console.log("set", nextMap);
              
                for (var a = 0; a < mapData.layers.length; a++) {
                    map = mapData.layers[a];
                    for (var i = 0; i < map.length; i++) {
                        for (var j = 0; j < map[0].length; j++) {
                            if(levelManager.tileMap[map[i][j]])
                                levelManager.tileMap[map[i][j]](j, i);
                            else
                                Crafty.e("2D, DOM, stone_floor").attr({x: j*gameBoard.tileSize, y: i*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize});
                        }
                    }
                }
                if(loadComplete) loadComplete();
            });
            Crafty.scene(level.toString());
            Crafty.trigger("StopMovement");
            Crafty.e("Player").attr({x: 3*gameBoard.tileSize, y: 3*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize});
        });
    },
    
    resetLevel: function () {
      Crafty.scene(gameBoard.currentMap);
    }
}

