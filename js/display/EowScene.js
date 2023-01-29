class EowScene extends Phaser.Scene {

    logger = Logger.get(EowScene.name);

    t9aTexture = 'images/the-ninth-age-sprites'

    constructor() {
        super(EowScene.name);
    }

    preload() {
        this.load.atlas(this.t9aTexture);
    }

    /**
     * @param {Object} data 
     * @param {EowModule} data.eowModule
     * @param {InitializationModule} data.initializationModule
     */
    create(data) {
        const imageRegistry = new PhaserImageRegistry();
        const displayFactory = new PhaserDisplayFactory(this, imageRegistry);
        data.eowModule.initialize(displayFactory);

        this.configureCamera();

        $(window).resize(() => this.drawGameAfterResize());

        data.initializationModule.proceedInitialization();
    }

    configureCamera() {
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
        
        this.input.on(Phaser.Input.Events.POINTER_WHEEL, (/** @type {Phaser.Input.Pointer} */pointer, gameObjects, deltaX, /** @type {Number} */deltaY, deltaZ) => {
            this.logger.info(`this.cameras.main.zoom = ${this.cameras.main.zoom}`);
            if (deltaY < 0) {
                if (this.cameras.main.zoom < controlConfig.maxZoom) {
                    this.cameras.main.zoom += 0.05;
                }
            } else {
                if (controlConfig.minZoom < this.cameras.main.zoom) {
                    this.cameras.main.zoom -= 0.05;
                }
            }
        });
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
