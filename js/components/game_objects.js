Crafty.c("Fence", {
    _is_solid: true,

    init: function() {
        // Clears the key stack
        this.requires("solid, Color").color('rgb(255, 0, 0)');
        this.bind("ToggleState", function() {
            if(this._is_solid) {
                this.removeComponent("solid", false);
                this._is_solid = false;
            } else {
                this.addComponent("solid");
                this._is_solid = true;
            }
        });
    }
});
 