class PhaserImageOffset {

    /** @type {Number} */xOffset = 0;

    /** @type {Number} */yOffset = 0;

    constructor(/** @type {Number} */xOffset, /** @type {Number} */yOffset) {
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }

    /** @returns {PhaserImageOffset} */
    withXOffset(/** @type {Number} */xOffset) {
        return new PhaserImageOffset(xOffset, this.yOffset);
    }
}
