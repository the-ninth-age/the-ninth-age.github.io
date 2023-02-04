class PhaserDisplayFactory extends EowDisplayFactory {

    /** @type {EowScene} */#scene = null;

    /** @type {PhaserImageRegistry} */#imageRegistry = null;

    /** @type {EowBattlefield} */#battlefield = null;

    constructor(/** @type {EowScene} */scene, /** @type {PhaserImageRegistry} */imageRegistry) {
        super();
        this.#scene = scene;
        this.#imageRegistry = imageRegistry;
    }

    /** @override */
    createBattlefield(/** @type {EowBattlefield} */battlefield) {
        const displayBattlefield = new PhaserDisplayBattlefield(this.#scene, battlefield);
        battlefield.displayBattlefield = displayBattlefield;
        displayBattlefield.create();
        this.#battlefield = battlefield;
    }

    /** @override */
    createTable(/** @type {EowTable} */table) {
        const displayTable = new PhaserDisplayTable(this.#scene, table);
        table.displayTable = displayTable;
        displayTable.create();
    }

    /** @override */
    createBase(
        /** @type {Number} */x,
        /** @type {Number} */y,
        /** @type {EowBase} */base
    ) {
        const displayBase = new PhaserDisplayBase(this.#scene, base);
        base.displayBase = displayBase;
        displayBase.create(x, y);
    }

    /** @override */
    createSingleModel(
        /** @type {Number} */x,
        /** @type {Number} */y,
        /** @type {EowSingleModel} */singleModel
    ) {
        this.createBase(x, y, singleModel.base);

        const imageOffset = this.#imageRegistry.getImageOffset(singleModel.imageId);
        const displaySingleModel = new PhaserDisplaySingleModel(this.#scene, singleModel, imageOffset);
        singleModel.displaySingleModel = displaySingleModel;
        displaySingleModel.create(this.#battlefield);
    }

    /** @override */
    createRankedUnit(
        /** @type {Number} */x,
        /** @type {Number} */y,
        /** @type {EowRankedUnit} */rankedUnit
    ) {
        rankedUnit.models.forEach((rank, rankIndex) => {
            rank.forEach((unitModel, fileIndex) => {
                this.createSingleModel(
                    x + rankIndex * unitModel.base.size.front,
                    y + fileIndex * unitModel.base.size.side,
                    unitModel
                );
            });
        });
        const displayRankedUnit = new PhaserDisplayRankedUnit(this.#scene, rankedUnit);
        rankedUnit.displayRankedUnit = displayRankedUnit;
        displayRankedUnit.create(this.#battlefield);
    }
}
