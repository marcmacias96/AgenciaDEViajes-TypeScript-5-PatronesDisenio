import User from "./User";
import Package from "./Package";
import MReservation from "../models/Reservation"
import MPackage from "../models/Package"
class Reservation {

    cantPerson : Number 
    cantDays : Number
    date : String 
    person! : User 
    package! : Package

    constructor ( cantPerson : Number, cantDays : Number, date : String ) {
        this.cantPerson = cantPerson
        this.cantDays = cantDays
        this.date = date
    }

    setPerson (person : any) {
        this.person = person
    }

    setPackage (pks : Package) {
        this.package = pks
    }

    save () {
        const newReservation = new MReservation()
        newReservation.set('cantPerson',this.cantPerson)
        newReservation.set('cantDays',this.cantDays)
        newReservation.set('date',this.date)
        newReservation.set('person',this.person)
        newReservation.set('package',this.package)
        newReservation.save()
    }

}

export default Reservation