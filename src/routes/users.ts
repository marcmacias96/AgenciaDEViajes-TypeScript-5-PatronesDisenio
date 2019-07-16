import { Router, Request, Response} from 'express'
import passport from '../config/passport'

const router = Router()
import PersonFactory from '../Class/PersonFactory';
import MUser from '../models/User';
import User from '../Class/User'


router.route('/user/signup')
    .get(async(req : Request, res : Response) => {
        res.render('users/signup')
    })
    .post(async( req: Request, res: Response) => {
        const {name ,lastName, email, password, confirm_password, cedula, phone, age }  = req.body
        const errors = []
        if(name.length <=0 || password.length <=0 )
        {
            errors.push({text: 'No se admiten campos vacios'})
        }
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
            res.render('users/signup', {errors,name,email})
        } else {
        const emailUser = await MUser.findOne({email : email})
        if(emailUser) {
            //mensaje de error entre paginas
            req.flash('error_msg','El email esta siendo usado por otro usuario')       
            res.redirect('signup')
        } else{
                const user  : User = PersonFactory.getInstance('User',email,password)
                user.setName(name)
                user.setLastName(lastName)
                user.setCedula(cedula)
                user.setPhone(phone)
                user.setAge(age)
                await user.Save()
                //mensaje de exito entre paginas
                req.flash('success_msg','Usuario Registrado')
                res.redirect('signin')
        }
        
        }
    })
 

    router.get('/user/signin',( req, res ) => {
        res.render('users/signin')
        
    })
    
    router.post('/user/signin',passport.authenticate('local', {
        successRedirect: '/agencia/home',
        failureRedirect: '/user/signin',
        failureFlash: true
    }))



export default router