class PhaserDisplayBase extends EowDisplayBase {

    /** @type {EowScene} */#scene = null

    /** @type {EowBase} */base = null;

    /** @type {Phaser.GameObjects.Rectangle} */rectangle = null;

    constructor(/** @type {EowScene} */scene, /** @type {EowBase} */base) {
        super();
        this.#scene = scene;
        this.base = base;
    }

    create() {
        this.rectangle = this.#scene.add
            .rectangle(this.base.x, this.base.y, this.base.sideSize * DisplaySize.MM, this.base.frontSize * DisplaySize.MM)
            .setOrigin(0)
            .setStrokeStyle(EowDisplayStyle.BATTLEFIELD_EDGE_WIDTH, EowDisplayStyle.BATTLEFIELD_EDGE_COLOR)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_START, () => this.rectangle.setDepth(Number.MAX_VALUE))
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG, (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
                this.rectangle.setPosition(dragX, dragY);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, () => this.rectangle.setDepth(0));
        this.#scene.input.setDraggable(this.rectangle);
    }

    attachImage(/** @type {PhaserDisplaySingleModel} */displaySingleModel, /** @type {EowBattlefield} */battlefield) {
        this.rectangle
            .off(Phaser.Input.Events.GAMEOBJECT_DRAG_START)
            .off(Phaser.Input.Events.GAMEOBJECT_DRAG)
            .off(Phaser.Input.Events.GAMEOBJECT_DRAG_END)
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_START, () => {
                this.rectangle.setDepth(Number.MAX_VALUE - 1);
                displaySingleModel.sprite.setDepth(Number.MAX_VALUE);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG, (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
                this.rectangle.setPosition(dragX, dragY);
                displaySingleModel.setPosition(dragX, dragY);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, () => {
                this.rectangle.setDepth(0);
                displaySingleModel.setDepth(battlefield);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => displaySingleModel.sprite.setTint(0x44ff44))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => displaySingleModel.sprite.clearTint());
    }

    disableFreePlacement() {
        this.rectangle.disableInteractive();
    }

    changePositionBy(/** @type {Number} */xOffset, /** @type {Number} */yOffset) {
        this.rectangle.x += xOffset;
        this.rectangle.y += yOffset;
    }
}
