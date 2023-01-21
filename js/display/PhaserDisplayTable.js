class PhaserDisplayTable extends EowDisplayTable {

    /** @type {BattlefieldScene} */battlefieldScene = null;

    /** @type {EowTable} */table = null;

    /** @type {Phaser.GameObjects.Rectangle} */tableRectangle = null;

    /** @type {Phaser.GameObjects.Rectangle} */leftDeploymentZone = null;

    /** @type {Phaser.GameObjects.Rectangle} */rightDeploymentZone = null;

    /** @type {Phaser.GameObjects.Text} */pickLeftDeploymentZoneText = null;

    /** @type {Phaser.GameObjects.Text} */pickRightDeploymentZoneText = null;

    constructor(/** @type {BattlefieldScene} */battlefieldScene, /** @type {EowTable} */table) {
        super();
        this.battlefieldScene = battlefieldScene;
        this.table = table;
    }

    create() {
        this.tableRectangle = this.battlefieldScene.add
            .rectangle(0, 0, EowSize.TABLE_LONG_EDGE * DisplaySize.INCH, EowSize.TABLE_SHORT_EDGE * DisplaySize.INCH)
            .setOrigin(0)
            .setStrokeStyle(EowDisplayStyle.BATTLEFIELD_EDGE_WIDTH, EowDisplayStyle.BATTLEFIELD_EDGE_COLOR)
            .setVisible(true);
        this.leftDeploymentZone = this.battlefieldScene.add
            .rectangle(0, 0, EowSize.DEPLOYMENT_ZONE * DisplaySize.INCH, EowSize.TABLE_SHORT_EDGE * DisplaySize.INCH)
            .setOrigin(0)
            .setStrokeStyle(EowDisplayStyle.BATTLEFIELD_EDGE_WIDTH, EowDisplayStyle.BATTLEFIELD_EDGE_COLOR)
            .setVisible(false);
        this.leftDeploymentZone.setInteractive(this.leftDeploymentZone.getBounds(), Phaser.Geom.Rectangle.Contains)
            .disableInteractive();
        this.rightDeploymentZone = this.battlefieldScene.add
            .rectangle(0 + 3 * EowSize.DEPLOYMENT_ZONE * DisplaySize.INCH, 0, EowSize.DEPLOYMENT_ZONE * DisplaySize.INCH, EowSize.TABLE_SHORT_EDGE * DisplaySize.INCH)
            .setOrigin(0)
            .setStrokeStyle(EowDisplayStyle.BATTLEFIELD_EDGE_WIDTH, EowDisplayStyle.BATTLEFIELD_EDGE_COLOR)
            .setVisible(false);
        this.rightDeploymentZone.setInteractive(this.leftDeploymentZone.getBounds(), Phaser.Geom.Rectangle.Contains)
            .disableInteractive();
        this.pickLeftDeploymentZoneText = this.battlefieldScene.add
            .text(0, 0, $.i18n('pick-side-of-table'), { color: '#000', fontSize: 75, wordWrap: { width: EowSize.TABLE_SHORT_EDGE * DisplaySize.INCH } })
            .setAngle(90)
            .setOrigin(0, 1)
            .setVisible(false);
        this.pickLeftDeploymentZoneText.setPosition(EowSize.DEPLOYMENT_ZONE / 2 * DisplaySize.INCH - this.pickLeftDeploymentZoneText.height / 2, 20);
        this.pickRightDeploymentZoneText = this.battlefieldScene.add
            .text(0, 0, $.i18n('pick-side-of-table'), { color: '#000', fontSize: 75, wordWrap: { width: EowSize.TABLE_SHORT_EDGE * DisplaySize.INCH } })
            .setAngle(90)
            .setOrigin(0, 1)
            .setVisible(false);
        this.pickRightDeploymentZoneText.setPosition(3 * EowSize.DEPLOYMENT_ZONE * DisplaySize.INCH + EowSize.DEPLOYMENT_ZONE / 2 * DisplaySize.INCH - this.pickRightDeploymentZoneText.height / 2, 20);
    }

    showDeploymentZones() {
        this.leftDeploymentZone.setVisible(true);
        this.rightDeploymentZone.setVisible(true);
    }

    hideDeploymentZones() {
        this.leftDeploymentZone.setVisible(false);
        this.rightDeploymentZone.setVisible(false);
    }

    showPickDeploymentZoneText() {
        this.pickLeftDeploymentZoneText.setVisible(true);
        this.pickRightDeploymentZoneText.setVisible(true);
        this.leftDeploymentZone.setInteractive();
        this.rightDeploymentZone.setInteractive();

        this.leftDeploymentZone.on('pointerdown', () => {
            this.table.pickLeftDeploymentZone();
        });
        this.rightDeploymentZone.on('pointerdown', () => {
            this.table.pickRightDeploymentZone();
        });
    }

    hidePickDeploymentZoneText() {
        this.pickLeftDeploymentZoneText.setVisible(false);
        this.pickRightDeploymentZoneText.setVisible(false);
        this.leftDeploymentZone.off('pointerdown')
            .disableInteractive();
        this.rightDeploymentZone.off('pointerdown')
            .disableInteractive();
    }
}
