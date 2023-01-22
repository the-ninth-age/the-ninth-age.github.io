class App {

    /** @type {EowModule} */eowModule = new EowModule();

    start() {
        const initializationModule = new InitializationModule([
            new LoggerModule(),
            new I18nLoader(),
            new PhaserDisplayModule(this.eowModule),
            new I18nModule()
        ]);
        initializationModule.startInitialization();
    }
}

const app = new App();
app.start();
