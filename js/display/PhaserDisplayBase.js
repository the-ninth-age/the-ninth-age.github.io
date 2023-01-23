class PhaserDisplayBase extends EowDisplayBase {

    /** @type {BattlefieldScene} */battlefieldScene = null

    /** @type {EowBase} */base = null;

    /** @type {Phaser.GameObjects.Rectangle} */rectangle = null;

    constructor(/** @type {BattlefieldScene} */battlefieldScene, /** @type {EowBase} */base) {
        super();
        this.battlefieldScene = battlefieldScene;
        this.base = base;
    }

    create() {
        this.rectangle = this.battlefieldScene.add
            .rectangle(this.base.x, this.base.y, this.base.sideSize * DisplaySize.MM, this.base.frontSize * DisplaySize.MM)
            .setOrigin(0)
            .setStrokeStyle(EowDisplayStyle.BATTLEFIELD_EDGE_WIDTH, EowDisplayStyle.BATTLEFIELD_EDGE_COLOR)
            .setInteractive();
        this.battlefieldScene.input.setDraggable(this.rectangle);
        this.rectangle.on('drag', (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
            this.rectangle.setPosition(dragX, dragY);
        });
    }

    attachImage(/** @type {PhaserDisplaySingleModel} */displaySingleModel) {
        this.rectangle
            .off('drag')
            .on('drag', (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
                this.rectangle.setPosition(dragX, dragY);
                displaySingleModel.setPosition(dragX, dragY);
            });
    }

    disableFreePlacement() {
        this.rectangle
            .disableInteractive()
            .off('drag')
    }

    changePositionBy(/** @type {Number} */xOffset, /** @type {Number} */yOffset) {
        this.rectangle.x += xOffset;
        this.rectangle.y += yOffset;
    }
}
