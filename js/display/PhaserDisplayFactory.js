class PhaserDisplayFactory extends EowDisplayFactory {

    /** @type {EowScene} */#scene = null;

    /** @type {PhaserImageRegistry} */#imageRegistry = null;

    /** @type {EowBattlefield} */#battlefield = null;

    constructor(/** @type {EowScene} */scene, /** @type {PhaserImageRegistry} */imageRegistry) {
        super();
        this.#scene = scene;
        this.#imageRegistry = imageRegistry;
    }

    createBattlefield(/** @type {EowBattlefield} */battlefield) {
        const displayBattlefield = new PhaserDisplayBattlefield(this.#scene, battlefield);
        battlefield.displayBattlefield = displayBattlefield;
        displayBattlefield.create();
        this.#battlefield = battlefield;
    }

    createTable(/** @type {EowTable} */table) {
        const displayTable = new PhaserDisplayTable(this.#scene, table);
        table.displayTable = displayTable;
        displayTable.create();
    }

    createBase(/** @type {EowBase} */base) {
        const displayBase = new PhaserDisplayBase(this.#scene, base);
        base.displayBase = displayBase;
        displayBase.create();
    }

    createSingleModel(/** @type {EowSingleModel} */singleModel) {
        this.createBase(singleModel.base);
        
        const imageOffset = this.#imageRegistry.getImageOffset(singleModel.imageId);
        const displaySingleModel = new PhaserDisplaySingleModel(this.#scene, singleModel, imageOffset);
        singleModel.displaySingleModel = displaySingleModel;
        displaySingleModel.create(this.#battlefield);
    }

    createRankedUnit(/** @type {EowRankedUnit} */rankedUnit) {
        rankedUnit.models.forEach(rank => {
            rank.forEach(unitModel => {
                this.createSingleModel(unitModel);
            });
        });
        const displayRankedUnit = new PhaserDisplayRankedUnit(this.#scene, rankedUnit);
        rankedUnit.displayRankedUnit = displayRankedUnit;
        displayRankedUnit.create(this.#battlefield);
    }
}
