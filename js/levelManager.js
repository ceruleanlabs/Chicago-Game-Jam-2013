var levelManager = {
    items: [],
    metadata: null,
    tileMap: {
        X: function (x, y) { levelManager.createWall(x, y); },
        F: function (x, y) { levelManager.items.push(Crafty.e("2D, DOM, Fence, SwitchableTexture").SwitchableTexture("texture_fence_up").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        G: function (x, y) { levelManager.items.push(Crafty.e("2D, DOM, Fence, SwitchableTexture").SwitchableTexture("texture_fence_right").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        H: function (x, y) { levelManager.items.push(Crafty.e("2D, DOM, Fence, SwitchableTexture").SwitchableTexture("texture_fence_left").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        J: function (x, y) { levelManager.items.push(Crafty.e("2D, DOM, Fence, SwitchableTexture").SwitchableTexture("texture_fence_down").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        C: function (x, y) { levelManager.items.push(Crafty.e("2D, DOM, Fire").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        D: function (x, y) { levelManager.items.push(Crafty.e("Door").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        K: function (x, y) { levelManager.items.push(Crafty.e("Collectable, SwitchableTexture").SwitchableTexture("texture_key").Collectable("key").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        B: function (x, y) { levelManager.items.push(Crafty.e("Collectable, SwitchableTexture").SwitchableTexture("texture_skeleton_key").Collectable("key").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        O: function (x, y) { levelManager.items.push(Crafty.e("Door, SwitchableTexture").SwitchableTexture("texture_door_right_left").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        P: function (x, y) { levelManager.items.push(Crafty.e("Door, SwitchableTexture").SwitchableTexture("texture_door_right_right").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        S: function (x, y) { Crafty.e("Player").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: 32, h: 55, z:52}); },
        V: function (x, y) { levelManager.items.push(Crafty.e("PressurePlate, SwitchableTexture").SwitchableTexture("texture_pressure_plate").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize, z: -2})); },
        T: function (x, y) { levelManager.items.push(Crafty.e("Gargoyle, SwitchableTexture").SwitchableTexture("texture_gargoyle_down").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        Y: function (x, y) { levelManager.items.push(Crafty.e("Gargoyle, SwitchableTexture").SwitchableTexture("texture_gargoyle_up").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        U: function (x, y) { levelManager.items.push(Crafty.e("Gargoyle, SwitchableTexture").SwitchableTexture("texture_gargoyle_right").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        I: function (x, y) { levelManager.items.push(Crafty.e("Gargoyle, SwitchableTexture").SwitchableTexture("texture_gargoyle_left").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); },
        Z: function (x, y) { levelManager.items.push(Crafty.e("2D, DOM, solid, SwitchableTexture").SwitchableTexture("texture_wall_torch").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize})); }
    },

    createWall: function (x, y) {
        Crafty.e("2D, DOM, solid, SwitchableTexture").SwitchableTexture("texture_stone_wall").attr({x: x*gameBoard.tileSize, y: y*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize});
    },

    loadMap: function (level, loadComplete) {
        var map = null;
        var that = this;
        gameBoard.stopTimer();
        $.get('map/load/'+level, function(data) {
            Crafty.scene(level.toString(), function () {
                var floor_type = "texture_stone_floor";
                that.items = [];
                mapData = jQuery.parseJSON(data);
                var map = null;
                // Set the background to light gray
                Crafty.background("#9F9F9F");
                // get next map
                var nextMap = mapData.metadata.nextMap;
                levelManager.metadata = mapData.metadata;
                gameBoard.setNextMap(nextMap);
                gameBoard.currentMap = level;
                gameBoard.setLives(mapData.metadata.lives);
                if(mapData.metadata.floor_type != null)
                    floor_type = mapData.metadata.floor_type;
                console.log("set", nextMap);
              
                for (var a = 0; a < mapData.layers.length; a++) {
                    map = mapData.layers[a];
                    for (var i = 0; i < map.length; i++) {
                        for (var j = 0; j < map[0].length; j++) {
                            Crafty.e("2D, DOM, SwitchableTexture").SwitchableTexture(floor_type).attr({x: j*gameBoard.tileSize, y: i*gameBoard.tileSize, w: gameBoard.tileSize, h: gameBoard.tileSize, z: -2});
                            if(levelManager.tileMap[map[i][j]])
                                levelManager.tileMap[map[i][j]](j, i);
                        }
                    }
                }

                levelManager.linkMetaDataItems();
                Crafty.trigger("StopMovement");
                if(loadComplete) loadComplete();
            });
            Crafty.scene(level.toString());
            Crafty.trigger("StopMovement");
            soundManager.startBackgroundMusic();
        });
    },
    
    resetLevel: function () {
      Crafty.scene(gameBoard.currentMap);
      levelManager.linkMetaDataItems();
    },

    findItemAtCoordinates: function (x, y)  {
        return _.find(this.items, function(item){ return (Math.floor((item.x / gameBoard.tileSize)) == x) && (Math.floor((item.y / gameBoard.tileSize)) == y) });
    },

    linkItems: function(x1, y1, x2, y2) {
        item1 = this.findItemAtCoordinates(x1, y1);
        item2 = this.findItemAtCoordinates(x2, y2);

        if(item1 != null && item2 != null) {
            item1.link_item(item2);
        } else {
            console.log('Cant link items', x1, y1, x2, y2);
        }
    },

    linkMetaDataItems: function() {
        if(levelManager.metadata.link_items != null) {
            for (var i=0; i < levelManager.metadata.link_items.length; i++) {
                link_set = levelManager.metadata.link_items[i];
                levelManager.linkItems(link_set[0][0], link_set[0][1], link_set[1][0], link_set[1][1]);
            }
        }
    }
}

