class EowRankedUnit {

    /** @type {EowDisplayRankedUnit} */displayRankedUnit = null;

    /** @type {Array<Array<EowSingleModel>>} */models = null;

    constructor(
        /** @type {Array<EowSingleModel>} */models,
        /** @type {Number} */files,
        /** @type {Number} */ranks
    ) {
        this.models = new Array(ranks);

        for (let rankIndex = 0; rankIndex < this.ranks; rankIndex++) {
            this.models[rankIndex] = new Array(files);
            const rank = this.models[rankIndex];

            for (let fileIndex = 0; fileIndex < rank.length; fileIndex++) {
                const singleModel = models[_.random(models.length - 1)];
                const unitModel = singleModel.clone();
                rank[fileIndex] = unitModel;
            }
        }
    }

    /** @returns {EowBase} */
    getSingleBase() {
        return this.models[0][0].base;
    }

    flip() {
        this.displayRankedUnit.flip();
    }

    /** 
     * Width
     * @returns {Number} 
     */
    get files() {
        return this.models[0].length;
    }

    /**
     * Depth
     * @returns {Number} 
     */
    get ranks() {
        return this.models.length;
    }
}
