class PhaserDisplaySingleModel extends EowDisplaySingleModel {

    /** @type {BattlefieldScene} */battlefieldScene = null;

    /** @type {EowSingleModel} */singleModel = null;

    /** @type {Phaser.GameObjects.Sprite} */sprite = null;

    /** @type {PhaserImageOffset} */imageOffset = null;

    constructor(
        /** @type {BattlefieldScene} */battlefieldScene,
        /** @type {EowSingleModel} */singleModel,
        /** @type {PhaserImageOffset} */imageOffset
    ) {
        super();
        this.battlefieldScene = battlefieldScene;
        this.singleModel = singleModel;
        this.imageOffset = imageOffset;
    }

    create() {
        this.sprite = this.battlefieldScene.add
            .sprite(this.singleModel.base.x + this.imageOffset.xOffset, this.singleModel.base.y + this.imageOffset.yOffset, this.battlefieldScene.t9aTexture, this.singleModel.imageId.value)
            .setScale(0.2)
            .setOrigin(0, 1);

        const /** @type {PhaserDisplayBase} */displayBase = this.singleModel.base.displayBase;
        displayBase.attachImage(this);
    }

    setPosition(/** @type {Number} */x, /** @type {Number} */y) {
        this.sprite.setPosition(x + this.imageOffset.xOffset, y + this.imageOffset.yOffset);
    }
}
