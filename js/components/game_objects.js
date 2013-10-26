Crafty.c("Fence", {
    _is_solid: true,

    init: function() {
        this.requires("solid");
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

Crafty.c("DeathBlock", {
    _animation: "default",

    init: function() {
        this.requires("2D, DOM");
    },

    get_animation: function() {
        return this._animation;
    }
});

Crafty.c("Fire", {
    init: function() {
        this.requires("DeathBlock, Color").color("rgb(255, 0, 0)");
        this._animation = "fire";
    }
});