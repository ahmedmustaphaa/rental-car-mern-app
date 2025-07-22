
import mongoose from "mongoose"
export const connectedDb=async ()=>{

    try{
        mongoose.connect(process.env.MONGO_URI);

        console.log("database conntected succeflly")
    }catch(erro){
        console.log(erro)
    }
}