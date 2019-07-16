import IFactory from "../Interfaces/IFactory";
import User from "../Class/User";
import IPerson from "../Interfaces/IPerson";
import Admin from "../Class/Admin";

class PersonFactory extends IFactory {

     public static getInstance(type: String, email : String, password : String ): any {
        switch (type)
        {
            case  'User' : {
                return new User(email,password)
            }
            case 'Admin' : {
                return new Admin(email,password)
            }
            default : {
                throw new Error('Incorrect Type')
            }
        }
    }

}

export default PersonFactory