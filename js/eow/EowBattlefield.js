class EowBattlefield {

    /** @type {EowDisplayBattlefield} */displayBattlefield = null;

    /** @type {Number} */longSupportEdge = 16;

    /** @type {Number} */shortSupportEdge = 8;

    /** @type {Number} */longEdge = this.longSupportEdge * 2 + EowSize.TABLE_LONG_EDGE;

    /** @type {Number} */shortEdge = this.shortSupportEdge * 2 + EowSize.TABLE_SHORT_EDGE;
}
