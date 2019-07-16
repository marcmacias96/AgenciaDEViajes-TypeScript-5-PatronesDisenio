import {Schema, model } from "mongoose"
import Package from './Package'
import User from './User'
const ReservationSchema = new Schema({
    cantPerson : {
        type : Number,
        required: true 
    },
    cantDays : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    person : {
        type : User.schema
    },
    package : {
        type : Package.schema
    }
})

export default model('Reservation',ReservationSchema)
