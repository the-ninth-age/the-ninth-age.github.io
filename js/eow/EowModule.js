class EowModule {

    /** @type {EowBattlefield} */battlefield = null;

    /** @type {EowTable} */table = null;

    /** @type {EowSingleModel} */cultLeader = null;

    /** @type {EowRankedUnit} */cultistsUnit = null;

    /** @type {EowRankedUnit} */succubiUnit = null;

    /** @type {EowRankedUnit} */clawedFiendUnit = null;

    /** @type {EowSingleModel} */soothsayer = null;

    /** @type {EowRankedUnit} */wildhornHerdUnit = null;

    /** @type {EowRankedUnit} */minotaursUnit = null;

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

        const soothsayerImageId = new ImageId('beast-herds/soothsayer/00-soothsayer-0');
        const soothsayerBase = new EowBase(400, 150, 25, 25);
        this.soothsayer = new EowSingleModel(soothsayerBase, soothsayerImageId);
        displayFactory.createSingleModel(this.soothsayer);

        const wildhornHerd0ImageId = new ImageId('beast-herds/wildhorn-herd/00-wildhorn-herd-0');
        const wildhornHerd1ImageId = new ImageId('beast-herds/wildhorn-herd/00-wildhorn-herd-1');
        const wildhornHerd2ImageId = new ImageId('beast-herds/wildhorn-herd/00-wildhorn-herd-2');
        const wildhornHerdModelBase = new EowBase(470, 150, 25, 25);
        const wildhornHerd0 = new EowSingleModel(wildhornHerdModelBase, wildhornHerd0ImageId);
        const wildhornHerd1 = new EowSingleModel(wildhornHerdModelBase, wildhornHerd1ImageId);
        const wildhornHerd2 = new EowSingleModel(wildhornHerdModelBase, wildhornHerd2ImageId);
        this.wildhornHerdUnit = new EowRankedUnit([wildhornHerd0, wildhornHerd1, wildhornHerd2], 5, 3);
        displayFactory.createRankedUnit(this.wildhornHerdUnit);

        const minotaurImageId = new ImageId('beast-herds/minotaur/00-minotaur-0');
        const minotaurModelBase = new EowBase(435, 280, 40, 40);
        const minotaur = new EowSingleModel(minotaurModelBase, minotaurImageId);
        this.minotaursUnit = new EowRankedUnit([minotaur], 3, 1)
        displayFactory.createRankedUnit(this.minotaursUnit);
    }
}
