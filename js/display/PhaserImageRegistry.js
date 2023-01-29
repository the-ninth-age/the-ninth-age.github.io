class PhaserImageRegistry {

    /** @type {Map} */#registry = new Map();

    constructor() {
        this.#registry.set('cultists/cult-leader/00-cult-leader-0', new PhaserImageOffset(-7, 14));
        this.#registry.set('cultists/cultist/00-cultist-0', new PhaserImageOffset(-4, 16));
        this.#registry.set('cultists/cultist/00-cultist-1', new PhaserImageOffset(-2, 15));
        this.#registry.set('cultists/succubi/00-succubi-0', new PhaserImageOffset(-3, 17));
        this.#registry.set('cultists/succubi/00-succubi-1', new PhaserImageOffset(-1, 17));
        this.#registry.set('cultists/clawed-fiend/00-clawed-fiend-0', new PhaserImageOffset(-30, 27));
        
        this.#registry.set('beast-herds/soothsayer/00-soothsayer-0', new PhaserImageOffset(-7, 18));
        this.#registry.set('beast-herds/wildhorn-herd/00-wildhorn-herd-0', new PhaserImageOffset(-6, 18));
        this.#registry.set('beast-herds/wildhorn-herd/00-wildhorn-herd-1', new PhaserImageOffset(-3, 18));
        this.#registry.set('beast-herds/wildhorn-herd/00-wildhorn-herd-2', new PhaserImageOffset(-6, 18));
        this.#registry.set('beast-herds/minotaur/00-minotaur-0', new PhaserImageOffset(-12, 30));
    }

    /** @returns {PhaserImageOffset} */
    getImageOffset(/** @type {ImageId} */imageId) {
        return this.#registry.get(imageId.value);
    }
}
