import {Schema, model } from "mongoose"
import bcrypt from 'bcrypt-nodejs'

const AdminSchema = new Schema({
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    agency : {
        type : String
    }
})

AdminSchema.methods.encryptPassword =  (password : any) => {
    return  bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

AdminSchema.methods.comparePassword =  function (password : string) {
    console.log(this.password + "pssw");
    
    if(this.password != null) {return bcrypt.compareSync(password, this.password);
    } else {return false; }

}
export default model('Admin',AdminSchema)
