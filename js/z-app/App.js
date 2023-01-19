class App {

    start() {
        const initializationModule = new InitializationModule([
            new LoggerModule(),
            new I18nLoader(),
            new PhaserDisplayModule(new EowModule()),
            new I18nModule()
        ]);
        initializationModule.startInitialization();
    }
}

const app = new App();
app.start();
