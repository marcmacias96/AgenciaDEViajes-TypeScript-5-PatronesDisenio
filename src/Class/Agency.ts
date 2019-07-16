import Age from '../models/Agencia'
class Agency {
    public static instance : any = null
    public static id : String = ""
    public static async getIntance  () {
        if (Agency.instance == null) {
            const agencia : any = await Age.find()
            if(agencia!= null) {
                Agency.instance =  new Agency()
                Agency.instance.id = agencia._id
                
                return Agency.instance
            } else {
                const agencia = await new Age()
                await agencia.save()
                Agency.instance =  new Agency()
                Agency.instance.id = agencia._id
                return Agency.instance
            }

        }
    }

    
}
export default Agency