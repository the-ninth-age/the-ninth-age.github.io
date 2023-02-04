class EowBase {

    /** @type {EowDisplayBase} */displayBase = null;

    /** @type {EowBaseSize} */size = null;

    constructor(/** @type {EowBaseSize} */baseSize) {
        this.size = baseSize;
    }

    clone() {
        return new EowBase(this.size);
    }

    disableFreePlacement() {
        this.displayBase.disableFreePlacement();
    }

    changePositionBy(/** @type {Number} */xOffset, /** @type {Number} */yOffset) {
        this.displayBase.changePositionBy(xOffset, yOffset);
    }

    /** @returns {Number} */
    get x() {
        return this.displayBase.x;
    }

    /** @returns {Number} */
    get y() {
        return this.displayBase.y;
    }
}
