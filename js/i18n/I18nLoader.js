class I18nLoader extends Initialization {

    startInitialization(/** @type {InitializationModule} */initializationModule) {
        $(() => {
            $.i18n()
                .load({
                    en: 'i18n/en.json'
                })
                .done(() => this.initialize(initializationModule));
        });
    }

    initialize(/** @type {InitializationModule} */initializationModule) {
        Logger.get(I18nLoader.name).info('i18n loaded');

        initializationModule.proceedInitialization();
    }
}