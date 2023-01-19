class PhaserDisplayBase {

    /** @type {BattlefieldScene} */battlefieldScene = null

    /** @type {EowBase} */base = null;

    /** @type {Phaser.GameObjects.Rectangle} */rectangle = null;

    constructor(/** @type {BattlefieldScene} */battlefieldScene, /** @type {EowBase} */base) {
        this.battlefieldScene = battlefieldScene;
        this.base = base;
    }

    create() {
        this.rectangle = this.battlefieldScene.add
            .rectangle(this.base.x, this.base.y, this.base.sideSize * DisplaySize.MM, this.base.frontSize * DisplaySize.MM)
            .setOrigin(0)
            .setStrokeStyle(EowStyle.BATTLEFIELD_EDGE_WIDTH, EowStyle.BATTLEFIELD_EDGE_COLOR)
            .setInteractive();
        this.battlefieldScene.input.setDraggable(this.rectangle);
        this.rectangle.on('drag', (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
            this.rectangle.x = dragX;
            this.rectangle.y = dragY;
        });
    }
}
