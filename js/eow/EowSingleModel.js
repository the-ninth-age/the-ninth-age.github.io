class EowSingleModel {

    /** @type {EowDisplaySingleModel} */displaySingleModel = null;

    /** @type {EowBase} */base = null;

    /** @type {ImageId} */imageId = null;

    constructor(/** @type {EowBase} */base, /** @type {ImageId} */imageId) {
        this.base = base;
        this.imageId = imageId;
    }

    clone() {
        return new EowSingleModel(this.base.clone(), this.imageId);
    }

    disableFreePlacement() {
        this.base.disableFreePlacement();
    }

    changePositionBy(/** @type {Number} */xOffset, /** @type {Number} */yOffset) {
        this.base.changePositionBy(xOffset, yOffset);
        this.displaySingleModel.changePositionBy(xOffset, yOffset);
    }
}
