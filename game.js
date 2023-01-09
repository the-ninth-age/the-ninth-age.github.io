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
    Logger.log('start');

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
        this.graphics = this.add.graphics();

        $(window).resize(() => this.drawGameAfterResize());
    }

    drawGameAfterResize() {
        this.graphics.clear();
    }

    captureWindowSize() {
        this.windowWidth = $(window).width();
        this.windowHeight = $(window).height();
    }
}
