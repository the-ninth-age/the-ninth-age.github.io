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

    t9aTexture = 'images/the-ninth-age-sprites'

    constructor() {
        super(GameScene.name);
    }

    preload() {
        this.load.atlas(this.t9aTexture);
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

        this.cameras.main
            .setBounds(-400, -200, 400*2 + EowSize.BATTLEFIELD_LONG_EDGE * DisplaySize.INCH, 200*2 + EowSize.BATTLEFIELD_SHORT_EDGE * DisplaySize.INCH)
            .setScroll(-150, -100);
        
        this.input.on('wheel', /** @param {Phaser.Input.Pointer} pointer */ (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            Logger.info(`this.cameras.main.zoom = ${this.cameras.main.zoom}`);
            if (deltaY < 0) {
                if (this.cameras.main.zoom < 6) {
                    this.cameras.main.zoom += 0.05;
                }
            } else {
                if (1 < this.cameras.main.zoom) {
                    this.cameras.main.zoom -= 0.05;
                }
            }
        });
        const playerPickedLeft = false;
        const offset = 50;
        const width = 20 * DisplaySize.MM;
        const x = playerPickedLeft ? -offset - width : EowSize.BATTLEFIELD_LONG_EDGE * DisplaySize.INCH + offset;

        this.base = this.add
            .rectangle(x, offset, width, width)
            .setOrigin(0)
            .setStrokeStyle(EowStyle.BATTLEFIELD_EDGE_WIDTH, EowStyle.BATTLEFIELD_EDGE_COLOR);
        this.model = this.add
            .sprite(x - 7, offset + 14, this.t9aTexture, 'cultists/cult-leader/00-cult-leader-0.png')
            .setScale(0.2)
            .setOrigin(0, 1)
            .setInteractive();  
        if (playerPickedLeft) {
            this.model
                .setX(x - (this.model.displayWidth - 7 - this.base.displayWidth))
                .setFlipX(true);
        }
        this.input.setDraggable(this.model);
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });

        const cursors = this.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            speed: 0.5,
            maxZoom: 6,
            minZoom: 1
        };
        
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

        $(window).resize(() => this.drawGameAfterResize());
    }

    drawGameAfterResize() {
    }

    update(time, delta) {
        this.controls.update(delta);
        // if (this.game.input.activePointer.isDown) {
        //     if (this.game.origDragPoint) {
        //         // move the camera by the amount the mouse has moved since last update
        //         this.cameras.main.scrollX +=
        //             (this.game.origDragPoint.x - this.game.input.activePointer.position.x) / this.cameras.main.zoom;
        //         this.cameras.main.scrollY +=
        //             (this.game.origDragPoint.y - this.game.input.activePointer.position.y) / this.cameras.main.zoom;
        //     } // set new drag origin to current position
        //     this.game.origDragPoint = this.game.input.activePointer.position.clone();
        // } else {
        //     this.game.origDragPoint = null;
        // }
    }

    captureWindowSize() {
        this.windowWidth = $(window).width();
        this.windowHeight = $(window).height();
    }
}
