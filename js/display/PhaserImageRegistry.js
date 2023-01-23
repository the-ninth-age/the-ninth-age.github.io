class PhaserImageRegistry {

    /** @type {Map} */ registry = new Map();

    constructor() {
        this.registry.set('cultists/cult-leader/00-cult-leader-0.png', new PhaserImageOffset(-7, 14));
        this.registry.set('cultists/cultist/00-cultist-0.png', new PhaserImageOffset(-4, 16));
        this.registry.set('cultists/cultist/00-cultist-1.png', new PhaserImageOffset(-2, 15));
        this.registry.set('cultists/succubi/00-succubi-0.png', new PhaserImageOffset(-3, 17));
        this.registry.set('cultists/succubi/00-succubi-1.png', new PhaserImageOffset(-1, 17));
        this.registry.set('cultists/clawed-fiend/00-clawed-fiend-0.png', new PhaserImageOffset(-30, 27));
    }

    /** @returns {PhaserImageOffset} */
    getImageOffset(/** @type {ImageId} */imageId) {
        return this.registry.get(imageId.value);
    }
}
