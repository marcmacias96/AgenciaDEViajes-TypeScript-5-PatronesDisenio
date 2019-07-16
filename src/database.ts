import mongoose from "mongoose"

 async function connect () {
    try {
        mongoose.connect('mongodb://localhost/ts-crud2',{
            useNewUrlParser:true
        })
        console.log('>>> database is conected');
        
    } catch {
        console.log("Error en la conexion a mongodb");
        
    }
}

export default connect
