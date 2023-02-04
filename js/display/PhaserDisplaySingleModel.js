class PhaserDisplaySingleModel extends EowDisplaySingleModel {

    /** @type {EowScene} */#scene = null;

    /** @type {EowSingleModel} */#singleModel = null;

    /** @type {Phaser.GameObjects.Sprite} */sprite = null;

    /** @type {PhaserImageOffset} */#imageOffset = null;

    constructor(
        /** @type {EowScene} */scene,
        /** @type {EowSingleModel} */singleModel,
        /** @type {PhaserImageOffset} */imageOffset
    ) {
        super();
        this.#scene = scene;
        this.#singleModel = singleModel;
        this.#imageOffset = imageOffset;
    }

    /** @returns {PhaserDisplaySingleModel} */
    static unwrap(/** @type {EowSingleModel} */singleModel) {
        return singleModel.displaySingleModel;
    }

    create(/** @type {EowBattlefield} */battlefield) {
        this.sprite = this.#scene.add
            .sprite(
                this.#singleModel.base.x + this.#imageOffset.xOffset,
                this.#singleModel.base.y + this.#imageOffset.yOffset,
                this.#scene.t9aTexture,
                this.#singleModel.imageId.value
            )
            .setScale(0.2)
            .setOrigin(0, 1);
        this.#setDepth(battlefield);

        const displayBase = PhaserDisplayBase.unwrap(this.#singleModel.base);
        displayBase.rectangle
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_START, () => this.sprite.setDepth(EowPhaserDepth.MODEL_DRAGGED))
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG, (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
                this.#setPosition(dragX, dragY);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, () => this.#setDepth(battlefield))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => this.setTint())
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => this.clearTint());
    }

    #setDepth(/** @type {EowBattlefield} */battlefield) {
        this.sprite.setDepth(
            EowPhaserDepth.getDepth(
                this.#singleModel.base.x,
                this.#singleModel.base.y + this.#singleModel.base.size.front * DisplaySize.MM,
                battlefield
            )
        );
    }

    #setPosition(/** @type {Number} */x, /** @type {Number} */y) {
        this.sprite.setPosition(x + this.#imageOffset.xOffset, y + this.#imageOffset.yOffset);
    }

    setTint() {
        this.sprite.setTint(0x44ff44);
    }

    clearTint() {
        this.sprite.clearTint();
    }

    /** @override */
    changePositionBy(/** @type {Number} */xOffset, /** @type {Number} */yOffset) {
        this.sprite.x += xOffset;
        this.sprite.y += yOffset;
    }
}
