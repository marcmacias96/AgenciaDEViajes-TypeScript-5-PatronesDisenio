import {Schema, model } from "mongoose"
import User from './User'
import Plus from './Plus'
const PackageSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required: true
    },
    ubication : {
        type : String,
        required : true
    },
    pkcPrice : {
        type : Number
    },
    admin : {
        type : User.schema
    },
    pluses : {
        type : [Plus.schema]
    }
})

export default model('Package',PackageSchema)
