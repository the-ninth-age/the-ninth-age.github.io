class PhaserDisplayBase extends EowDisplayBase {

    /** @type {EowScene} */#scene = null

    /** @type {EowBase} */#base = null;

    /** @type {Phaser.GameObjects.Rectangle} */rectangle = null;

    constructor(/** @type {EowScene} */scene, /** @type {EowBase} */base) {
        super();
        this.#scene = scene;
        this.#base = base;
    }

    /** @returns {PhaserDisplayBase} */
    static unwrap(/** @type {EowBase} */base) {
        return base.displayBase;
    }

    create() {
        this.rectangle = this.#scene.add
            .rectangle(this.#base.x, this.#base.y, this.#base.sideSize * DisplaySize.MM, this.#base.frontSize * DisplaySize.MM)
            .setOrigin(0)
            .setStrokeStyle(EowDisplayStyle.BATTLEFIELD_EDGE_WIDTH, EowDisplayStyle.BATTLEFIELD_EDGE_COLOR)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_START, () => this.rectangle.setDepth(EowPhaserDepth.BASE_DRAGGED))
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG, (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
                this.rectangle.setPosition(dragX, dragY);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, () => this.rectangle.setDepth(EowPhaserDepth.BASE));
        this.#scene.input.setDraggable(this.rectangle);
    }

    /** @override */
    disableFreePlacement() {
        this.rectangle.disableInteractive();
    }

    /** @override */
    changePositionBy(/** @type {Number} */xOffset, /** @type {Number} */yOffset) {
        this.rectangle.x += xOffset;
        this.rectangle.y += yOffset;
    }
}
