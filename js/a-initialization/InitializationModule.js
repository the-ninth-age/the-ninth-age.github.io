class InitializationModule {

    /** @type {Array<Initialization>} */
    initializationChain = [];

    /** @param {Array<Initialization>} initializationChain */
    constructor(initializationChain) {
        this.initializationChain = initializationChain;
    }

    startInitialization() {
        this.proceedInitialization();
    }

    proceedInitialization() {
        if (this.initializationChain.length === 0) {
            return;
        }
        const initialization = this.initializationChain.shift();
        initialization.startInitialization(this);
    }
}
