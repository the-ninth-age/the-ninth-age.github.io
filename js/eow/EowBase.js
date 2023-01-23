class EowBase {

    /** @type {EowDisplayBase} */displayBase = null;

    /** @type {Number} */x = null;

    /** @type {Number} */y = null;

    /** @type {Number} */frontSize = null;

    /** @type {Number} */sideSize = null

    constructor(
        /** @type {Number} */x,
        /** @type {Number} */y,
        /** @type {Number} */frontSize,
        /** @type {Number} */sideSize
    ) {
        this.x = x;
        this.y = y;
        this.frontSize = frontSize;
        this.sideSize = sideSize;
    }

    clone() {
        return new EowBase(this.x, this.y, this.frontSize, this.sideSize);
    }

    disableFreePlacement() {
        this.displayBase.disableFreePlacement();
    }

    changePositionBy(/** @type {Number} */xOffset, /** @type {Number} */yOffset) {
        this.displayBase.changePositionBy(xOffset, yOffset);
    }
}
