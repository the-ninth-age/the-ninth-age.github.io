class PhaserDisplayFactory extends EowDisplayFactory {

    /** @type {BattlefieldScene} */battlefieldScene = null;

    constructor(/** @type {BattlefieldScene} */battlefieldScene) {
        super();
        this.battlefieldScene = battlefieldScene;
    }

    createBase(/** @type {EowBase} */base) {
        const displayBase = new PhaserDisplayBase(this.battlefieldScene, base);
        base.displayBase = displayBase;
        displayBase.create();
    }
}
