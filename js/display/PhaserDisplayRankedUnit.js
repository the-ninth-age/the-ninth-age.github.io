class PhaserDisplayRankedUnit extends EowDisplayRankedUnit {

    /** @type {BattlefieldScene} */battlefieldScene = null;

    /** @type {EowRankedUnit} */rankedUnit = null;

    /** @type {Phaser.GameObjects.Container} */container = null;

    constructor(/** @type {BattlefieldScene} */battlefieldScene, /** @type {EowRankedUnit} */rankedUnit) {
        super();
        this.battlefieldScene = battlefieldScene;
        this.rankedUnit = rankedUnit;
    }

    create() {
        const modelBase = this.rankedUnit.getSingleBase();
        const x = modelBase.x;
        const y = modelBase.y;

        this.rankedUnit.models.forEach(rank =>
            rank.forEach(rankedModel => {
                rankedModel.disableFreePlacement();
                rankedModel.changePositionBy(-x - (this.rankedUnit.ranks * modelBase.sideSize * DisplaySize.MM) / 2, -y - (this.rankedUnit.files * modelBase.frontSize * DisplaySize.MM) / 2);
            })
        );
        const /** @type {Array<Phaser.GameObjects.GameObject>} */flattenedModels = this.rankedUnit.models
            .flatMap(rank => rank)
            .flatMap(rankedModel => [rankedModel.displaySingleModel.sprite, rankedModel.base.displayBase.rectangle]);
        
        // show outline - usefull
        this.battlefieldScene.add.rectangle(
            x,
            y,
            this.rankedUnit.ranks * modelBase.sideSize * DisplaySize.MM,
            this.rankedUnit.files * modelBase.frontSize * DisplaySize.MM
        )
            .setStrokeStyle(EowDisplayStyle.BATTLEFIELD_EDGE_WIDTH, EowDisplayStyle.BATTLEFIELD_EDGE_COLOR);

        this.container = this.battlefieldScene.add.container(x, y, flattenedModels)
            .setSize(
                this.rankedUnit.ranks * modelBase.sideSize * DisplaySize.MM,
                this.rankedUnit.files * modelBase.frontSize * DisplaySize.MM
            )
            .setInteractive();
        this.battlefieldScene.input.setDraggable(this.container);
        this.container.on('drag', (pointer, /** @type {Number} */dragX, /** @type {Number} */dragY) => {
            this.container.setPosition(dragX, dragY);
        });

        this.container.on('pointerover', () => {
            this.rankedUnit.models.forEach(rank =>
                rank.forEach(rankedModel => {
                    rankedModel.displaySingleModel.sprite.setTint(0x44ff44);
                })
            );
        });
        this.container.on('pointerout', () => {
            this.rankedUnit.models.forEach(rank =>
                rank.forEach(rankedModel => {
                    rankedModel.displaySingleModel.sprite.clearTint();
                })
            );
        });
    }
}
