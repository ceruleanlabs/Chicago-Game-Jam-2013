/**
* This file contains the player character.
*  
* Author: Fork It, We'll do it live!
*/

Crafty.c("Player", {
    init: function() {
        this.requires("DOM, Color, 2D, Collision, Movement")
        .color('rgb(20, 75, 40)')
        .stopOnSolids();
    }
});
