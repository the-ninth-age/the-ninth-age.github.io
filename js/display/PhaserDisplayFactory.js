class PhaserDisplayFactory extends EowDisplayFactory {

    /** @type {BattlefieldScene} */battlefieldScene = null;

    /** @type {PhaserImageRegistry} */imageRegistry = null;

    constructor(/** @type {BattlefieldScene} */battlefieldScene, /** @type {PhaserImageRegistry} */imageRegistry) {
        super();
        this.battlefieldScene = battlefieldScene;
        this.imageRegistry = imageRegistry;
    }

    createTable(/** @type {EowTable} */table) {
        const displayTable = new PhaserDisplayTable(this.battlefieldScene, table);
        table.displayTable = displayTable;
        displayTable.create();
    }

    createBase(/** @type {EowBase} */base) {
        const displayBase = new PhaserDisplayBase(this.battlefieldScene, base);
        base.displayBase = displayBase;
        displayBase.create();
    }

    createSingleModel(/** @type {EowSingleModel} */singleModel) {
        this.createBase(singleModel.base);
        
        const imageOffset = this.imageRegistry.getImageOffset(singleModel.imageId);
        const displaySingleModel = new PhaserDisplaySingleModel(this.battlefieldScene, singleModel, imageOffset);
        singleModel.displaySingleModel = displaySingleModel;
        displaySingleModel.create();
    }

    createRankedUnit(/** @type {EowRankedUnit} */rankedUnit) {
        rankedUnit.models.forEach(rank => {
            rank.forEach(unitModel => {
                this.createSingleModel(unitModel);
            });
        });
        const displayRankedUnit = new PhaserDisplayRankedUnit(this.battlefieldScene, rankedUnit);
        rankedUnit.displayRankedUnit = displayRankedUnit;
    }
}
