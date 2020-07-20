export class Mission {
    id?: number;
    name?: String;
    dateDeMission?: Date;
    adresseMission?: String;
    motoMission?: String;

    constructor(id: number , name: String, dateDeMission: Date, adresseMission: String, motoMission: String ) {
        this.id = id;
        this.name = name;
        this.dateDeMission = dateDeMission;
        this.adresseMission = adresseMission;
        this.motoMission = motoMission;
    }
}