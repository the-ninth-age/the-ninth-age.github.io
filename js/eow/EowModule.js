class EowModule {

    /** @type {EowRankedUnit} */cultistsUnit = null;

    initialize(/** @type {EowDisplayFactory} */displayFactory) {
        const table = new EowTable();
        displayFactory.createTable(table);

        const width = 20;
        const base = new EowBase(50, 50, width, width);
        displayFactory.createBase(base);

        const cultLeaderImageId = new ImageId('cultists/cult-leader/00-cult-leader-0.png');
        const singleModelBase = new EowBase(150, 150, width, width);
        const singleModel = new EowSingleModel(singleModelBase, cultLeaderImageId);
        displayFactory.createSingleModel(singleModel);

        const cultist0ImageId = new ImageId('cultists/cultist/00-cultist-0.png');
        const cultist1ImageId = new ImageId('cultists/cultist/00-cultist-1.png');
        const cultistModelBase = new EowBase(300, 150, 25, 25);
        const cultist0 = new EowSingleModel(cultistModelBase, cultist0ImageId);
        const cultist1 = new EowSingleModel(cultistModelBase, cultist1ImageId);
        this.cultistsUnit = new EowRankedUnit([cultist0, cultist1], 5, 3);
        displayFactory.createRankedUnit(this.cultistsUnit);
    }
}
