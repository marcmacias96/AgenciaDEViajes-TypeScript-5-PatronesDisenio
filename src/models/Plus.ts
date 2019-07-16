import {Schema, model } from "mongoose"

const TourSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    }
})

export default model('Tour',TourSchema)
