class PhaserDisplayRankedUnit extends EowDisplayRankedUnit {

    /** @type {EowScene} */#scene = null;

    /** @type {EowRankedUnit} */#rankedUnit = null;

    /** @type {Phaser.GameObjects.Container} */#container = null;

    constructor(/** @type {EowScene} */scene, /** @type {EowRankedUnit} */rankedUnit) {
        super();
        this.#scene = scene;
        this.#rankedUnit = rankedUnit;
    }

    /** @returns {PhaserDisplayRankedUnit} */
    static unwrap(/** @type {EowRankedUnit} */rankedUnit) {
        return rankedUnit.displayRankedUnit;
    }

    create(/** @type {EowBattlefield} */battlefield) {
        const modelBase = this.#rankedUnit.getSingleBase();
        const x = modelBase.x;
        const y = modelBase.y;

        this.#rankedUnit.models.forEach(rank =>
            rank.forEach(rankedModel => {
                rankedModel.disableFreePlacement();
                rankedModel.changePositionBy(-x - this.#getHalfSideSize(), -y - this.#getHalfFrontSize());
            })
        );
        const /** @type {Array<Phaser.GameObjects.Rectangle>} */bases = this.#rankedUnit.models
            .flatMap((/** @type {Array<EowSingleModel>} */rank) => rank)
            .map((/** @type {EowSingleModel} */rankedModel) => PhaserDisplayBase.unwrap(rankedModel.base).rectangle);
        const /** @type {Array<Phaser.GameObjects.Sprite>} */models = this.#rankedUnit.models
            .flatMap((/** @type {Array<EowSingleModel>} */rank) => rank)
            .map((/** @type {EowSingleModel} */rankedModel) => PhaserDisplaySingleModel.unwrap(rankedModel).sprite);

        this.#container = this.#scene.add.container(x, y, bases.concat(models))
            .setSize(this.#getSideSize(), this.#getFrontSize())
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_START, () => this.#container.setDepth(EowPhaserDepth.MODEL_DRAGGED))
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG, (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
                this.#container.setPosition(dragX, dragY);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, () => this.#setDepth(battlefield));
        this.#setDepth(battlefield);
        this.#scene.input.setDraggable(this.#container);

        this.#container.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.#rankedUnit.models.forEach(rank =>
                rank.forEach(rankedModel => {
                    PhaserDisplaySingleModel.unwrap(rankedModel).setTint();
                })
            );
        });
        this.#container.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.#rankedUnit.models.forEach(rank =>
                rank.forEach(rankedModel => {
                    PhaserDisplaySingleModel.unwrap(rankedModel).clearTint();
                })
            );
        });
    }

    #setDepth(/** @type {EowBattlefield} */battlefield) {
        this.#container.setDepth(
            EowPhaserDepth.getDepth(
                this.#container.x - this.#getHalfSideSize(),
                this.#container.y + this.#getHalfFrontSize(),
                battlefield
            )
        );
    }

    #showOutline() {
        this.#scene.add.rectangle(
            this.#container.x,
            this.#container.y,
            this.#getSideSize(),
            this.#getFrontSize()
        )
            .setStrokeStyle(EowDisplayStyle.BATTLEFIELD_EDGE_WIDTH, EowDisplayStyle.BATTLEFIELD_EDGE_COLOR);
    }

    /** @returns {Number} */
    #getHalfSideSize() {
        return this.#getSideSize() / 2;
    }

    /** @returns {Number} */
    #getSideSize() {
        const modelBase = this.#rankedUnit.getSingleBase();

        return this.#rankedUnit.ranks * modelBase.size.side * DisplaySize.MM;
    }

    /** @returns {Number} */
    #getHalfFrontSize() {
        return this.#getFrontSize() / 2;
    }

    /** @returns {Number} */
    #getFrontSize() {
        const modelBase = this.#rankedUnit.getSingleBase();

        return this.#rankedUnit.files * modelBase.size.front * DisplaySize.MM;
    }

    /** @override */
    flip() {
        this.#rankedUnit.models.forEach(rank =>
            rank.forEach(rankedModel => {
                rankedModel.flip();
            })
        );
    }
}
