/**
* This file contains the player character.
*
* Author: Fork It, We'll do it live!
*/

Crafty.c("SwitchableTexture", {
    _texture: null,
    _toggled: false,

    init: function() {
        this.bind("toggle_texture", function() {
            this.removeComponent(this.texture_name(), false);
            this._toggled = !this._toggled;
            this.addComponent(this.texture_name());
        });
    },

    SwitchableTexture: function (texture_name) {
        // Change the color of any attached fancy text
        this._texture = texture_name;
        this.addComponent(this.texture_name());
        return this;
    },

    texture_name: function() {
        if(this._toggled)
            return this._texture + "_afterlife";
        else
            return this._texture;
    }
});
