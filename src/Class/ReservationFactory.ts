import IFactory from "../Interfaces/IFactory";
import Reservation from './Reservation'

class ReservationFactory extends IFactory {

    public static getInstance( cantDays : Number, cantPerson : Number, date : String ): Reservation {
       return new Reservation(cantPerson, cantDays, date)
    }

}

export default ReservationFactory 