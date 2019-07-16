import IPackage from "../Interfaces/IPackage";
import MPackage from "../models/Package"
import PackageFactory from '../Class/PackageFactory';
import IBuilder from '../Interfaces/IBuilder'
import IPrototype from '../Interfaces/IPrototype'
class Package extends IPrototype implements IPackage , IBuilder {
    public static Clone(tour: any) {
        return PackageFactory.getInstance("Package",tour.name,tour.description,null)
    }
   
    name: String    
    description: String
    ubication! : String
    pckPrice! : Number 
    admin : any
    packages!: Array<any>
    Model : String  
    constructor ( name : String, description : String, admin : any) {
        super()
        this.name = name
        this.description = description
        this.admin = admin
        this.packages =new Array<any>()
        this.Model = ''
        
    }

    

    public Addflights(id : String) {
        const newPlusV = PackageFactory.getInstance("Plus","Vuelos", this.description, id )
        newPlusV.setPrice(50)
        this.packages.push(newPlusV)
    }
    public Addlodging(id : String) {
        const newPlusH = PackageFactory.getInstance("Plus","Hospedaje",this.description,  id)
        newPlusH.setPrice(50)
        this.packages.push(newPlusH)
    }
    public Addfeeding(id : String) {
        const newPlusA = PackageFactory.getInstance("Plus","Alimentacion",this.description,  id)
        newPlusA.setPrice(50)
        this.packages.push(newPlusA)
    }

    setUbication ( ubication : String) {
        this.ubication = ubication
    }

    setPkcPrice ( price : Number) {
        this.pckPrice = price 
    }

    async updatePackages () {
        const pack = await MPackage.findById(this.Model)
        console.log(pack);
        
    }

    async save  ()  {
        const newPackage = new MPackage()
        newPackage.set('name',this.name)
        newPackage.set('description',this.description)
        newPackage.set('ubication',this.ubication)
        newPackage.set('pckPrice',this.pckPrice)
        newPackage.set('admin',this.admin)
        newPackage.set('pluses',this.packages)
        
        await newPackage.save()
        this.Model = newPackage.get('_id')
        console.log('Model id'+ this.Model);
         
    }
}

export default Package