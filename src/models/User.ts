import {Schema, model } from "mongoose"
import bcrypt from 'bcrypt-nodejs'


const UserSchema = new Schema({
    name : {
        type : String,
        //required: true
    },
    lastName : {
        type : String,
        //required: true,
        lowercase : true
    },
    cedula : {
        type : Number,
        //required: true
    },
    phone : {
        type : Number,
        //required: true
    },
    userName : {
        type : String,
        //required: true,
        lowercase : true
    },
    password : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    }
})

UserSchema.methods.encryptPassword =  (password : any) => {
    return  bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword =  function (password : string) {
    console.log(this.password + "pssw");
    
    if(this.password != null) {return bcrypt.compareSync(password, this.password);
    } else {return false; }

}



export default model('User',UserSchema)
