class PhaserDisplayFactory extends EowDisplayFactory {

    /** @type {BattlefieldScene} */battlefieldScene = null;

    constructor(/** @type {BattlefieldScene} */battlefieldScene) {
        super();
        this.battlefieldScene = battlefieldScene;
    }

    createBase(/** @type {EowBase} */base) {
        const displayBase = new PhaserDisplayBase(this.battlefieldScene, base);
        base.displayBase = displayBase;
        displayBase.create();
    }

    createSingleModel(/** @type {EowSingleModel} */singleModel) {
        this.createBase(singleModel.base);
        
        const displaySingleModel = new PhaserDisplaySingleModel(this.battlefieldScene, singleModel);
        singleModel.displaySingleModel = displaySingleModel;
        displaySingleModel.create();
    }
}
