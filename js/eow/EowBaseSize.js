class EowBaseSize {

    static SMALL = new EowBaseSize(20, 20);
    static MEDIUM = new EowBaseSize(25, 25);
    static LARGE = new EowBaseSize(40, 40);
    static HUGE = new EowBaseSize(50, 50);
    static MOUNT = new EowBaseSize(25, 50);
    static CHARIOT = new EowBaseSize(50, 100);

    /** @type {Number} */front = null;

    /** @type {Number} */side = null;

    constructor(/** @type {Number} */frontSize, /** @type {Number} */sideSize) {
        this.front = frontSize;
        this.side = sideSize;
    }
}
