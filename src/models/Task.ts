import {Schema, model } from "mongoose"
import bcrypt from 'bcrypt-nodejs'
const TaskSchema = new Schema ({
    title : {
        type : String,
        required: true,
        lowercase : true
    },
    description : {
        type : String,
        required: true,
        lowercase : true

    }
})

TaskSchema.methods.encryptPassword = async (password : any) => {
    return await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

TaskSchema.methods.comparePassword = function (password : any) {
    return  bcrypt.compareSync(password, this.password)
}

export default model('Task',TaskSchema)