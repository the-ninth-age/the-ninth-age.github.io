class EowModule {

    /** @type {EowBattlefield} */battlefield = null;

    /** @type {EowTable} */table = null;

    /** @type {EowSingleModel} */cultLeader = null;

    /** @type {EowRankedUnit} */cultistsUnit = null;

    /** @type {EowRankedUnit} */succubiUnit = null;

    /** @type {EowRankedUnit} */clawedFiendUnit = null;

    initialize(/** @type {EowDisplayFactory} */displayFactory) {
        this.battlefield = new EowBattlefield();
        displayFactory.createBattlefield(this.battlefield);

        this.table = new EowTable();
        displayFactory.createTable(this.table);

        const width = 20;
        const base = new EowBase(50, 50, width, width);
        displayFactory.createBase(base);

        const cultLeaderImageId = new ImageId('cultists/cult-leader/00-cult-leader-0');
        const cultLeaderBase = new EowBase(200, 150, width, width);
        this.cultLeader = new EowSingleModel(cultLeaderBase, cultLeaderImageId);
        displayFactory.createSingleModel(this.cultLeader);

        const cultist0ImageId = new ImageId('cultists/cultist/00-cultist-0');
        const cultist1ImageId = new ImageId('cultists/cultist/00-cultist-1');
        const cultistModelBase = new EowBase(300, 150, 25, 25);
        const cultist0 = new EowSingleModel(cultistModelBase, cultist0ImageId);
        const cultist1 = new EowSingleModel(cultistModelBase, cultist1ImageId);
        this.cultistsUnit = new EowRankedUnit([cultist0, cultist1], 5, 3);
        displayFactory.createRankedUnit(this.cultistsUnit);

        const succubi0ImageId = new ImageId('cultists/succubi/00-succubi-0');
        const succubi1ImageId = new ImageId('cultists/succubi/00-succubi-1');
        const succubiModelBase = new EowBase(200, 270, 25, 25);
        const succubi0 = new EowSingleModel(succubiModelBase, succubi0ImageId);
        const succubi1 = new EowSingleModel(succubiModelBase, succubi1ImageId);
        this.succubiUnit = new EowRankedUnit([succubi0, succubi1], 5, 3);
        displayFactory.createRankedUnit(this.succubiUnit);

        const clawedFiendImageId = new ImageId('cultists/clawed-fiend/00-clawed-fiend-0');
        const clawedFiendModelBase = new EowBase(150, 150, 40, 40);
        const clawedFiend = new EowSingleModel(clawedFiendModelBase, clawedFiendImageId);
        this.clawedFiendUnit = new EowRankedUnit([clawedFiend], 2, 1)
        displayFactory.createRankedUnit(this.clawedFiendUnit);
    }
}
