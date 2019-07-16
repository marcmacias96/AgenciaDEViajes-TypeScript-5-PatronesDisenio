import IFactory from "../Interfaces/IFactory";
import Plus from "../Class/Plus";
import IPackage from "../Interfaces/IPackage";
import Package from "../Class/Package";

class PackageFactory extends IFactory {

    public static getInstance(type : String, name: String, description : String, admin : any ): any {
        switch (type)
        {
            case  'Plus' : {
                return new Plus(name,description)
            }
            case 'Package' : {
                return new Package(name,description,admin)
            }
            default : {
                throw new Error('Incorrect Type')
            }
        }
    }

}

export default PackageFactory