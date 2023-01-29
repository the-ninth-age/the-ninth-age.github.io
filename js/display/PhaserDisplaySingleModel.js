class PhaserDisplaySingleModel extends EowDisplaySingleModel {

    /** @type {EowScene} */#scene = null;

    /** @type {EowSingleModel} */singleModel = null;

    /** @type {Phaser.GameObjects.Sprite} */sprite = null;

    /** @type {PhaserImageOffset} */#imageOffset = null;

    constructor(
        /** @type {EowScene} */scene,
        /** @type {EowSingleModel} */singleModel,
        /** @type {PhaserImageOffset} */imageOffset
    ) {
        super();
        this.#scene = scene;
        this.singleModel = singleModel;
        this.#imageOffset = imageOffset;
    }

    create(/** @type {EowBattlefield} */battlefield) {
        this.sprite = this.#scene.add
            .sprite(
                this.singleModel.base.x + this.#imageOffset.xOffset,
                this.singleModel.base.y + this.#imageOffset.yOffset,
                this.#scene.t9aTexture,
                this.singleModel.imageId.value
            )
            .setScale(0.2)
            .setOrigin(0, 1);
        this.setDepth(battlefield);

        const /** @type {PhaserDisplayBase} */displayBase = this.singleModel.base.displayBase;
        displayBase.attachImage(this, battlefield);
    }

    setDepth(/** @type {EowBattlefield} */battlefield) {
        const /** @type {PhaserDisplayBase} */displayBase = this.singleModel.base.displayBase;
        this.sprite.setDepth(
            displayBase.rectangle.x
            + (displayBase.rectangle.y + this.singleModel.base.frontSize * DisplaySize.MM)
            * battlefield.longEdge * DisplaySize.INCH
        );
    }

    setPosition(/** @type {Number} */x, /** @type {Number} */y) {
        this.sprite.setPosition(x + this.#imageOffset.xOffset, y + this.#imageOffset.yOffset);
    }

    changePositionBy(/** @type {Number} */xOffset, /** @type {Number} */yOffset) {
        this.sprite.x += xOffset;
        this.sprite.y += yOffset;
    }
}
