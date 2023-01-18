class I18nModule extends Initialization {

    startInitialization(/** @type {InitializationModule} */initializationModule) {
        Logger.get(I18nModule.name).info('i18n initialize');

        $('body').i18n();

        initializationModule.proceedInitialization();
    }
}
