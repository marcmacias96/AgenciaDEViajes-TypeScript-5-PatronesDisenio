import { Router, Request, Response} from 'express'
import  isAuthenticated  from "../Helpers/auth"
import MPackage from '../models/Package';
const router = Router()

router.route('/home') 
    .get(async( req : Request, res : Response) => {
        //lista de paquetes para la seccione principal del usuario
        const tours = await MPackage.find()
        
        
        res.render('agencia/home',{tours})
    })


export default router