import {Schema, model } from "mongoose"

const AgenciaSchema = new Schema ({
    name : {
        type : String
    },
    ubication : {
        type : String
    }
})

export default model('Agency',AgenciaSchema)