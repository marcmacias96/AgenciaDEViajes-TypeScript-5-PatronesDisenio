import { Router, Request, Response } from "express"
import Admin from "../Class/Admin"
import MAdmin from "../models/Admin"
import PersonFactory from "../Class/PersonFactory"
import passport = require("passport");
import Agency from '../Class/Agency'
const router = Router()

router.route('/admin/signup')
    .get((req : Request,  res :  Response) => {
        res.render('admin/signup')
    })
    .post(async (req :Request, res : Response  ) => {
        const { email, password, confirm_password }  = req.body
        const errors = []
        if(password != confirm_password)
        {
            errors.push({text: 'Las contraseñas no coinsiden'})
        }
        if( password.length < 4)
        {
            errors.push({text: 'La contraseña debe ser mayor a 4 caracteres'})
        }
        if( errors.length > 0 )
        {
            res.render('admin/signup', {errors,email})
        } else {
        const emailUser = await MAdmin.findOne({email : email})
        if(emailUser) {
            //mensaje de error entre paginas
            req.flash('error_msg','El email esta siendo usado por otro usuario')       
            res.redirect('signup')
        } else{
                const agency = Agency.getIntance()
                const admin  : Admin = PersonFactory.getInstance('Admin',email,password)
                admin.setAgency(agency)
                await admin.Save()
                //mensaje de exito entre paginas
                req.flash('success_msg','Usuario Registrado')
                res.redirect('signin')
        }
        
        }
    })

    router.get('/admin/signin',( req, res ) => {
        res.render('admin/signin')
    })
    
    router.post('/admin/signin',passport.authenticate('local', {
        successRedirect: '/admin/tour/list',
        failureRedirect: '/admin/signin',
        failureFlash: true
    }))

    export default router