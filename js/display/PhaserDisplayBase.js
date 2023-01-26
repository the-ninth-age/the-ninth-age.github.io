class PhaserDisplayBase extends EowDisplayBase {

    /** @type {BattlefieldScene} */#battlefieldScene = null

    /** @type {EowBase} */base = null;

    /** @type {Phaser.GameObjects.Rectangle} */rectangle = null;

    constructor(/** @type {BattlefieldScene} */battlefieldScene, /** @type {EowBase} */base) {
        super();
        this.#battlefieldScene = battlefieldScene;
        this.base = base;
    }

    create() {
        this.rectangle = this.#battlefieldScene.add
            .rectangle(this.base.x, this.base.y, this.base.sideSize * DisplaySize.MM, this.base.frontSize * DisplaySize.MM)
            .setOrigin(0)
            .setStrokeStyle(EowDisplayStyle.BATTLEFIELD_EDGE_WIDTH, EowDisplayStyle.BATTLEFIELD_EDGE_COLOR)
            .setInteractive();
        this.#battlefieldScene.input.setDraggable(this.rectangle);
        this.rectangle
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_START, () => this.rectangle.setDepth(Number.MAX_VALUE))
            .on('drag', (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
                this.rectangle.setPosition(dragX, dragY);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, () => this.rectangle.setDepth(0));
    }

    attachImage(/** @type {PhaserDisplaySingleModel} */displaySingleModel) {
        this.rectangle
            .off('drag')
            .off(Phaser.Input.Events.GAMEOBJECT_DRAG_START)
            .off(Phaser.Input.Events.GAMEOBJECT_DRAG_END)
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_START, () => {
                this.rectangle.setDepth(Number.MAX_VALUE - 1);
                displaySingleModel.sprite.setDepth(Number.MAX_VALUE);
            })
            .on('drag', (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
                this.rectangle.setPosition(dragX, dragY);
                displaySingleModel.setPosition(dragX, dragY);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, () => {
                this.rectangle.setDepth(0);
                displaySingleModel.sprite.setDepth(this.rectangle.y + displaySingleModel.singleModel.base.frontSize * DisplaySize.MM);
            })
            .on('pointerover', () => displaySingleModel.sprite.setTint(0x44ff44))
            .on('pointerout', () => displaySingleModel.sprite.clearTint());
    }

    disableFreePlacement() {
        this.rectangle.disableInteractive();
    }

    changePositionBy(/** @type {Number} */xOffset, /** @type {Number} */yOffset) {
        this.rectangle.x += xOffset;
        this.rectangle.y += yOffset;
    }
}
