class PhaserDisplayModule extends Initialization {

    /** @type {EowModule} */
    eowModule = null;

    constructor(/** @type {EowModule} */eowModule) {
        super();
        this.eowModule = eowModule;
    }

    startInitialization(/** @type {InitializationModule} */initializationModule) {
        $(() => {
            Logger.get(PhaserDisplayModule.name).info('Display module initialize');

            const config = {
                type: Phaser.AUTO,
                width: '100%',
                height: '100%',
                parent: 'canvas-container',
                scale: {
                    mode: Phaser.Scale.RESIZE
                }
            };
        
            const game = new Phaser.Game(config);
            game.scene.add(BattlefieldScene.name, BattlefieldScene);
            game.scene.start(BattlefieldScene.name, {
                eowModule: this.eowModule,
                initializationModule: initializationModule
            });
        });
    }
}
