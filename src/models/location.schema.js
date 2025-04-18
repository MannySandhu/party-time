export default class Location {
    constructor(area, lat, long){
        Object.freeze(this);
        this.area = area;
        this.lat = lat;
        this.long = long;
    }

    get Lat(){
        return this.lat;
    }

    get Long(){
        return this.long;
    }

    get Area(){
        return `This location is: ${this.area}`;
    }

    toString(){
        return `Lat: ${this.lat}, Long: ${this.long}, Area: ${this.area}`;
    }
}