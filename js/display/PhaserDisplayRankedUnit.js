class PhaserDisplayRankedUnit extends EowDisplayRankedUnit {

    /** @type {BattlefieldScene} */battlefieldScene = null;

    /** @type {EowRankedUnit} */rankedUnit = null;

    constructor(/** @type {BattlefieldScene} */battlefieldScene, /** @type {EowRankedUnit} */rankedUnit) {
        super();
        this.battlefieldScene = battlefieldScene;
        this.rankedUnit = rankedUnit;
    }
}
