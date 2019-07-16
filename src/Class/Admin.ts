import IPerson from "../Interfaces/IPerson";
import MAdmin from "../models/Admin"
class Admin implements IPerson {
    email : String
    password : String
    agency: any
    constructor (email : String, password : String) {
        this.email = email
        this.password = password
    }

    setAgency (agency : any) {
        this.agency = agency
    }
    async Save () {
        const newAdmin = new MAdmin()
        newAdmin.set('email',this.email)
        newAdmin.set('password',await newAdmin.schema.methods.encryptPassword(this.password))
        newAdmin.save()
    }

}

export default Admin