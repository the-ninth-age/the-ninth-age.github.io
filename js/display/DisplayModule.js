class DisplayModule extends Initialization {

    startInitialization(/** @type {InitializationModule} */initializationModule) {
        $(() => {
            Logger.get(DisplayModule.name).info('Display module initialize');

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
            game.scene.start(BattlefieldScene.name, initializationModule);
        });
    }
}
