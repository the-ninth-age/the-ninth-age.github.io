class LoggerModule extends Initialization {
    
    startInitialization(/** @type {InitializationModule} */initializationModule) {
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
            Logger.get(LoggerModule.name).info('Logger module initialized');

            initializationModule.proceedInitialization();
        });
    }
}
