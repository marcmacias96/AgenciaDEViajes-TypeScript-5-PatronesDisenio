import { Router, Request, Response } from 'express'
import Reservation from '../Class/Reservation';
import MPackage from "../models/Package"
import MReservation from '../models/Reservation';
import ReservationFactory from "../Class/ReservationFactory"
import PackageFactory from '../Class/PackageFactory';
import Tour from "../models/Package"
import Package from '../Class/Package';
import User from '../models/User'
const  router = Router()

router.route('/create/:id')
    .get(async(req : Request, res : Response) => {
        const {id} =  req.params
        const findPackage : any = await MPackage.findById(id)

        res.render('users/reservation/create',findPackage)
    })
    .post( async (req : Request, res : Response) => {
        const {id} = req.params
        const { cantPerson, cantDays, date, isflights, islodging, isfeeding } = req.body
        const newReservation = ReservationFactory.getInstance(cantDays, cantPerson, date)
        const Mtour : any = await Tour.findById(id)
        if( Mtour) {
            //const tour : Package = PackageFactory.getInstance("Package",Mtour.name,Mtour.description,null)
            const tour : Package = Package.Clone(Mtour)
            tour.setUbication(Mtour.ubication)
            if(isflights) { 
               tour.Addflights(id)
            }
            if(islodging) {
                tour.Addlodging(id)
            }
            if(isfeeding) {
                tour.Addfeeding(id)
            }
            newReservation.setPackage(tour)
            const user = await User.findById(req.user._id)
            newReservation.setPerson(req.user)
            newReservation.save()
            req.flash('success_msg','Reservacion  Registrada')
            res.redirect('/user/reservation/list')
        }
        
        
    })

router.route('/list')
    .get(async (req : Request, res : Response) => {
        const reservations = await MReservation.find()
        res.render('users/reservation/list',{reservations})
    }) 

router.route('/delete/:id')
    .get(async(req : Request, res : Response) => {
        const {id} = req.params
        await MReservation.findByIdAndDelete(id)
        res.redirect('/user/reservation/list')
    }) 
router.route('/view:id')
    .get((req : Request, res : Response) => {
        res.render('users/reservation/view')
    }) 

export default router