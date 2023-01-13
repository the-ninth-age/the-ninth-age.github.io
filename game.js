$(() => {
    Logger.useDefaults({
        formatter: function (messages, context) {
            messages.unshift('-');

            if (context.name !== undefined) {
                messages.unshift(context.name);
            }
            messages.unshift(new Date().toISOString(), context.level.name);
        }
    });
    Logger.info('start');

    $.i18n = (text) => {
        return text;
    };

    const config = {
        type: Phaser.AUTO,
        width: '100%',
        height: '100%',
        parent: 'canvas-container',
        scale: {
            mode: Phaser.Scale.RESIZE
        },
        scene: [GameScene]
    };

    new Phaser.Game(config);
});

class GameScene extends Phaser.Scene {

    constructor() {
        super(GameScene.name);
    }

    preload() {
    }

    create() {
        this.battlefield = this.add
            .rectangle(0, 0, EowSize.BATTLEFIELD_LONG_EDGE * DisplaySize.INCH, EowSize.BATTLEFIELD_SHORT_EDGE * DisplaySize.INCH)
            .setOrigin(0)
            .setStrokeStyle(EowStyle.BATTLEFIELD_EDGE_WIDTH, EowStyle.BATTLEFIELD_EDGE_COLOR)
            .setVisible(false);
        this.leftDeploymentZone = this.add
            .rectangle(0, 0, EowSize.DEPLOYMENT_ZONE * DisplaySize.INCH, EowSize.BATTLEFIELD_SHORT_EDGE * DisplaySize.INCH)
            .setOrigin(0)
            .setStrokeStyle(EowStyle.BATTLEFIELD_EDGE_WIDTH, EowStyle.BATTLEFIELD_EDGE_COLOR)
            .setVisible(false);
        this.leftDeploymentZone.setInteractive(this.leftDeploymentZone.getBounds(), Phaser.Geom.Rectangle.Contains)
            .disableInteractive();
        this.rightDeploymentZone = this.add
            .rectangle(0 + 3 * EowSize.DEPLOYMENT_ZONE * DisplaySize.INCH, 0, EowSize.DEPLOYMENT_ZONE * DisplaySize.INCH, EowSize.BATTLEFIELD_SHORT_EDGE * DisplaySize.INCH)
            .setOrigin(0)
            .setStrokeStyle(EowStyle.BATTLEFIELD_EDGE_WIDTH, EowStyle.BATTLEFIELD_EDGE_COLOR)
            .setVisible(false);
        this.rightDeploymentZone.setInteractive(this.leftDeploymentZone.getBounds(), Phaser.Geom.Rectangle.Contains)
            .disableInteractive();
        this.pickLeftDeploymentZoneText = this.add
            .text(0, 0, $.i18n('pick-side-of-table'), { color: '#000', fontSize: 75, wordWrap: { width: EowSize.BATTLEFIELD_SHORT_EDGE * DisplaySize.INCH } })
            .setAngle(90)
            .setOrigin(0, 1)
            .setVisible(false);
        this.pickLeftDeploymentZoneText.setPosition(EowSize.DEPLOYMENT_ZONE / 2 * DisplaySize.INCH - this.pickLeftDeploymentZoneText.height / 2, 20);
        this.pickRightDeploymentZoneText = this.add
            .text(0, 0, $.i18n('pick-side-of-table'), { color: '#000', fontSize: 75, wordWrap: { width: EowSize.BATTLEFIELD_SHORT_EDGE * DisplaySize.INCH } })
            .setAngle(90)
            .setOrigin(0, 1)
            .setVisible(false);
        this.pickRightDeploymentZoneText.setPosition(3 * EowSize.DEPLOYMENT_ZONE * DisplaySize.INCH + EowSize.DEPLOYMENT_ZONE / 2 * DisplaySize.INCH - this.pickRightDeploymentZoneText.height / 2, 20);

        this.cameras.main.setBackgroundColor('#8ce8a3');

        $(window).resize(() => this.drawGameAfterResize());
    }

    drawGameAfterResize() {
    }

    captureWindowSize() {
        this.windowWidth = $(window).width();
        this.windowHeight = $(window).height();
    }
}
