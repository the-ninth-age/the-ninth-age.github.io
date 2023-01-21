class PhaserDisplaySingleModel {

    /** @type {BattlefieldScene} */battlefieldScene = null;

    /** @type {EowSingleModel} */singleModel = null;

    /** @type {Phaser.GameObjects.Sprite} */sprite = null;

    constructor(/** @type {BattlefieldScene} */battlefieldScene, /** @type {EowSingleModel} */singleModel) {
        this.battlefieldScene = battlefieldScene;
        this.singleModel = singleModel;
    }

    create() {
        this.sprite = this.battlefieldScene.add
            .sprite(this.singleModel.base.x - 7, this.singleModel.base.y + 14, this.battlefieldScene.t9aTexture, this.singleModel.imageId.value)
            .setScale(0.2)
            .setOrigin(0, 1);

        const /** @type {PhaserDisplayBase} */displayBase = this.singleModel.base.displayBase;
        displayBase.attachImage(this);
    }

    setPosition(/** @type {Number} */x, /** @type {Number} */y) {
        this.sprite.setPosition(x - 7, y + 14);
    }
}
