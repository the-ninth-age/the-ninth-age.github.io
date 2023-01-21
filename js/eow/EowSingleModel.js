class EowSingleModel {

    /** @type {EowDisplaySingleModel} */displaySingleModel = null;

    /** @type {EowBase} */base = null;

    /** @type {ImageId} */imageId = null;

    constructor(/** @type {EowBase} */base, /** @type {ImageId} */imageId) {
        this.base = base;
        this.imageId = imageId;
    }
}
