class EowModule {

    initialize(/** @type {EowDisplayFactory} */displayFactory) {
        const offset = 50;
        const width = 20;
        const base = new EowBase(offset, offset, width, width);
        displayFactory.createBase(base);

        const cultLeaderImageId = new ImageId('cultists/cult-leader/00-cult-leader-0.png');
        const singleModelBase = new EowBase(150, 250, width, width);
        const singleModel = new EowSingleModel(singleModelBase, cultLeaderImageId);
        displayFactory.createSingleModel(singleModel);
    }
}
