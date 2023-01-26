class PhaserDisplayRankedUnit extends EowDisplayRankedUnit {

    /** @type {BattlefieldScene} */#battlefieldScene = null;

    /** @type {EowRankedUnit} */#rankedUnit = null;

    /** @type {Phaser.GameObjects.Container} */#container = null;

    constructor(/** @type {BattlefieldScene} */battlefieldScene, /** @type {EowRankedUnit} */rankedUnit) {
        super();
        this.#battlefieldScene = battlefieldScene;
        this.#rankedUnit = rankedUnit;
    }

    create() {
        const modelBase = this.#rankedUnit.getSingleBase();
        const x = modelBase.x;
        const y = modelBase.y;

        this.#rankedUnit.models.forEach(rank =>
            rank.forEach(rankedModel => {
                rankedModel.disableFreePlacement();
                rankedModel.changePositionBy(-x - (this.#rankedUnit.ranks * modelBase.sideSize * DisplaySize.MM) / 2, -y - (this.#rankedUnit.files * modelBase.frontSize * DisplaySize.MM) / 2);
            })
        );
        const /** @type {Array<Phaser.GameObjects.Rectangle>} */bases = this.#rankedUnit.models
            .flatMap(rank => rank)
            .map((/** @type {EowSingleModel} */rankedModel) => rankedModel.base.displayBase.rectangle);
        const /** @type {Array<Phaser.GameObjects.Sprite>} */models = this.#rankedUnit.models
            .flatMap(rank => rank)
            .flatMap((/** @type {EowSingleModel} */rankedModel) => rankedModel.displaySingleModel.sprite);

        this.#container = this.#battlefieldScene.add.container(x, y, bases.concat(models))
            .setSize(
                this.#rankedUnit.ranks * modelBase.sideSize * DisplaySize.MM,
                this.#rankedUnit.files * modelBase.frontSize * DisplaySize.MM
            )
            .setDepth(y + (this.#rankedUnit.files * modelBase.frontSize * DisplaySize.MM) / 2)
            .setInteractive();
        this.#battlefieldScene.input.setDraggable(this.#container);
        this.#container
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_START, () => this.#container.setDepth(Number.MAX_VALUE))
            .on('drag', (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
                this.#container.setPosition(dragX, dragY);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, () => this.#container.setDepth(this.#container.y + (this.#rankedUnit.files * modelBase.frontSize * DisplaySize.MM) / 2));

        this.#container.on('pointerover', () => {
            this.#rankedUnit.models.forEach(rank =>
                rank.forEach(rankedModel => {
                    rankedModel.displaySingleModel.sprite.setTint(0x44ff44);
                })
            );
        });
        this.#container.on('pointerout', () => {
            this.#rankedUnit.models.forEach(rank =>
                rank.forEach(rankedModel => {
                    rankedModel.displaySingleModel.sprite.clearTint();
                })
            );
        });
    }

    #showOutline() {
        const modelBase = this.#rankedUnit.getSingleBase();

        this.#battlefieldScene.add.rectangle(
            this.#container.x,
            this.#container.y,
            this.#rankedUnit.ranks * modelBase.sideSize * DisplaySize.MM,
            this.#rankedUnit.files * modelBase.frontSize * DisplaySize.MM
        )
            .setStrokeStyle(EowDisplayStyle.BATTLEFIELD_EDGE_WIDTH, EowDisplayStyle.BATTLEFIELD_EDGE_COLOR);
    }
}
