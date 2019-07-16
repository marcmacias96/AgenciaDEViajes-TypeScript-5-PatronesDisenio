import IPackage from "../Interfaces/IPackage";
import MPlus from "../models/Plus"
class Plus implements IPackage {
    name: String;    
    description: String;
    price! : Number

    constructor (name : String, description : String ) {
        this.name = name
        this.description = description
    }

    setPrice (price : Number) {
        this.price = price
    }

    save () {
        const newPlus = new MPlus()
        newPlus.set('name',this.name)
        newPlus.set('description',this.description)
        newPlus.set('price',this.price)
        newPlus.save()
    }
}

export default Plus