class EowModule {

    initialize(/** @type {EowDisplayFactory} */displayFactory) {
        const offset = 50;
        const width = 20;
        const base = new EowBase(offset, offset, width, width);
        displayFactory.createBase(base);
    }
}
