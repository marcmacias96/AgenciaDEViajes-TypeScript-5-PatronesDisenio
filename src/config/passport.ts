import passport from 'passport'
const LocalStrategy = require('passport-local').Strategy

import User from '../models/User'
import Admin from '../models/Admin';
//este archivo sirve para el login y lautenticacion local

//creamos una estrategia y definimos que el usuario se autenticara atravez del email
 passport.use(new LocalStrategy({
     usernameField : 'email'
 },async (email : String, password : String, done:any) => {
     //comprobamos si existe el correo ingresado
    var user : any  = await User.findOne({email : email})
    if(!user) { user = await Admin.findOne({email:email}) }
    if(!user ) {
        //intento de auten fallido 
        // se envia null para indicar que no exise un error 
        // se envia false para indicar que no existe ningun usuario con ese email
        // se envia un mensaje de error indicando que sucede
       
        return done(null,false,{ message: 'Not user found'})  
    } else {
        //si existe validamos la contraseña
        const match = user.comparePassword(password)
        if (match) {

            //enviamos null porque no existe ningun error 
            //emviamos el usuario ya que se completo la autentificacion
            return done(null,user)
        } else {
            return done(null, false, {message : 'incorrect password'})
        }
     }
}))

 passport.serializeUser(( user : any  , done) => {
     done(null, user.id)
 })

 passport.deserializeUser((id,done) => {
    User.findById(id,(err : Error,user : any) => {
        if(!user) {
            Admin.findById(id,(err : Error, admin : any) => {
                done(err,admin)
            })
        } else {
            done(err,user)
        }
        
    })
})



export default passport
