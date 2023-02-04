class EowPhaserDepth {

    static MODEL_DRAGGED = Number.MAX_VALUE;
    static BASE_DRAGGED = Number.MAX_VALUE - 1;
    static BASE = 0;

    /** @returns {Number} */
    static getDepth(/** @type {Number} */x, /** @type {Number} */yBottom, /** @type {EowBattlefield} */battlefield) {
        return x + yBottom * battlefield.longEdge * DisplaySize.INCH
    }
}
