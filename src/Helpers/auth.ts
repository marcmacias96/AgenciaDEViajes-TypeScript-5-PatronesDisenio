const helpers : any = {}

helpers.isAuthenticated = (req : any, res : Response, next : any ) => {
    if (req.isAuthenticated()) {
        return next()
    }

    req.flash('error_msg','El email esta siendo usado por otro usuario') 
    req.redirect('signup')
}

export default helpers 