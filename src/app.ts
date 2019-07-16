import express from "express"
import morgan from "morgan"
import exphdb from "express-handlebars"
import path from "path"
import flash from 'connect-flash'
import passport from 'passport'
import session from 'express-session'

//autenticacion
require('./config/passport')
//Rutas
import indexRoutes from "./routes/index"
import tasksRoutes from "./routes/tasks"
import userRoutes from "./routes/users"
import agenciaRouter from "./routes/agencia" 
import adminRoutes from "./routes/admin"
import adminTours from "./routes/tours"
import userReservarions from "./routes/reservations"
class Application {
    app : express.Application

    constructor() {
        this.app = express()
        this.settings()
        this.middlewares()
        this.goblalVariables()
        this.routes()
    }

    settings () {
        this.app.set('port','3000')
        this.app.set('views',path.join(__dirname,'views'))
        this.app.engine('.hbs',exphdb({
            layoutsDir: path.join(this.app.get('views'),'layouts'),
            partialsDir: path.join(this.app.get('views'),'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }))
        this.app.set('view engine','.hbs')
    }

    middlewares () {
        this.app.use(morgan("dev"))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:false}))
        //modulo que genera sesiones en el login
        this.app.use(session({
            secret: 'mysecretapp',
            resave: true,
            saveUninitialized: true
          }))
        
        //inicializacion de metodos de serializacion 
        this.app.use(passport.initialize())
        this.app.use(passport.session())
        //modulo que genera los mensajes asignanos en las variables globales
        this.app.use(flash())
    }

    goblalVariables () {
        this.app.use(( req, res, next ) => {
            //variables globales flash para generar mensajes de alerta entre paginas
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            res.locals.error = req.flash('error')
            res.locals.user = req.user || null
            next()
          })
    }

    routes () {
        this.app.use('/static',express.static(path.join(__dirname,'public')))
        this.app.use(indexRoutes)
        this.app.use('/tasks',tasksRoutes)
        this.app.use(userRoutes)
        this.app.use('/agencia',agenciaRouter)
        this.app.use(adminRoutes)
        this.app.use('/admin/tour',adminTours)
        this.app.use('/user/reservation', userReservarions)
        
    }

    start () {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server running");
            
        })
    }
}

export default Application