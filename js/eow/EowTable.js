class EowTable {

    /** @type {EowDisplayTable} */displayTable = null;

    showDeploymentZones() {
        this.displayTable.showDeploymentZones();
    }

    hideDeploymentZones() {
        this.displayTable.hideDeploymentZones();
    }

    showPickDeploymentZoneText() {
        this.displayTable.showPickDeploymentZoneText();
    }

    hidePickDeploymentZoneText() {
        this.displayTable.hidePickDeploymentZoneText();
    }

    pickLeftDeploymentZone() {
        this.displayTable.hidePickDeploymentZoneText();
    }

    pickRightDeploymentZone() {
        this.displayTable.hidePickDeploymentZoneText();
    }
}
