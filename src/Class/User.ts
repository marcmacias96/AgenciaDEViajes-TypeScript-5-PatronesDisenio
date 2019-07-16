import IPerson from "../Interfaces/IPerson";
import MUser from "../models/User";

class User implements IPerson {
    email: String;
    password: String;

    name!: String;
    lastName!: String;
    cedula!: Number;
    phone!: Number;
    age!: Number;

    constructor ( email: String, password: String ) {
        this.password = password
        this.email = email
    }

    public setName (name : String) {
        this.name = name
    }

    setLastName (lastName : String) {
        this.lastName = lastName
    }

    setCedula ( cedula : Number) {
        this.cedula = cedula
    }

    setPhone ( phone : Number) {
        this.phone = phone
    }

    setAge ( age : Number) {
        this.age = age
    }

    async Save ()  {
        const newUser = new MUser()
        newUser.set('name', this.name)
        newUser.set('email', this.email)
        newUser.set('password',await newUser.schema.methods.encryptPassword(this.password))
        newUser.set('lastName', this.lastName)
        newUser.set('cedula', this.cedula)
        newUser.set('phone', this.phone)
        await newUser.save()
    }

    
}

export default User