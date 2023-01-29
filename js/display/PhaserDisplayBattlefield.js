class PhaserDisplayBattlefield extends EowDisplayBattlefield {

    /** @type {EowScene} */#scene = null;

    /** @type {EowBattlefield} */#battlefield = null;

    constructor(/** @type {EowScene} */scene, /** @type {EowBattlefield} */battlefield) {
        super();
        this.#scene = scene;
        this.#battlefield = battlefield;
    }

    create() {
        this.#scene.cameras.main
            .setBounds(
                -this.#battlefield.longSupportEdge * DisplaySize.INCH,
                -this.#battlefield.shortSupportEdge * DisplaySize.INCH,
                this.#battlefield.longEdge * DisplaySize.INCH,
                this.#battlefield.shortEdge * DisplaySize.INCH
            )
            .setScroll(-700, -300)
            .setZoom(3)
            .setBackgroundColor('#8ce8a3');
    }
}
