class EowRankedUnit {

    /** @type {EowDisplayRankedUnit} */displayRankedUnit = null;

    /** @type {Array<Array<EowSingleModel>>} */models = null;

    constructor(
        /** @type {Array<EowSingleModel>} */models,
        /** @type {Number} */files,
        /** @type {Number} */ranks
    ) {
        this.models = new Array(ranks);
        const x = models[0].base.x;
        const y = models[0].base.y;
        const frontSize = models[0].base.frontSize;
        const sideSize = models[0].base.sideSize;

        for (let rankIndex = 0; rankIndex < this.models.length; rankIndex++) {
            this.models[rankIndex] = new Array(files);
            const rank = this.models[rankIndex];

            for (let fileIndex = 0; fileIndex < rank.length; fileIndex++) {
                const singleModel = models[_.random(models.length - 1)];
                const unitModel = singleModel.clone();
                unitModel.base.x = x + rankIndex * frontSize;
                unitModel.base.y = y + fileIndex * sideSize;
                rank[fileIndex] = unitModel;
            }
        }
    }
}
