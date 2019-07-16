import { Router , Request, Response} from "express"
import PackageFactory from "../Class/PackageFactory";
import Package from "../Class/Package";
import MPackage from "../models/Package"
import { Schema } from "mongoose";
import User from '../models/User'
const router = Router()

router.route('/list')
    .get(async(req : Request, res : Response) => {
        const tours = await MPackage.find()
        
        
        res.render('admin/tours/list',{tours})
    })

router.route('/create')
    .get((req :Request, res : Response) => {
        res.render('admin/tours/create')
    })
    .post(async (req: Request, res : Response) => {
        const { name, ubication, price , description} = req.body
        const user = await User.findById(req.user)
        const newPackage : Package= PackageFactory.getInstance('Package',name,description,user)
        newPackage.setPkcPrice(price)
        newPackage.setUbication(ubication)
        newPackage.save()
        req.flash('success_msg',"Tour save succesful")
        res.redirect('list')
        
        
    })

router.route('/edit/:id')
    .get(async(req : Request, res : Response) => {
        const {id} = req.params
        const FindTour = await MPackage.findById(id)
        //Objeto de tour para visualizar por propiedades FindTour.name ...
        res.render('admin/tours/edit',{FindTour})
    })
    .post( async (req : Request, res : Response) => {
        //recive todos los parametro de un objeto Tour
        const {name, ubication, price, description} = req.body
        const {id} = req.params
        await MPackage.findByIdAndUpdate(id,{name,ubication,price,description})
        req.flash('success_msg',"Tour save succesful")
    })

    router.route('/delete/:id')
        .get( async (req: Request, res: Response) => {
            const {id} = req.params
            
            await MPackage.findByIdAndDelete(id)
            
            res.redirect('/admin/tour/list')
        })
router.route('/view/:id')
    .get(async(req :Request, res : Response) => {
        const id = req.params
        //Objeto de tour para visualizar por propiedades FindTour.name ...
        const FindTour = await MPackage.findById(id)
        res.render('admin/tours/view',{FindTour})
        
    })
    export default router