import mongoose from "mongoose";

export const connection = () =>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "JOB_SEARCH_WITH_AUTOMATION"
    }).then(()=>{
        console.log("connected to database")
    }).catch(error => {
        console.log( `some error occurs while connecting to database ${error}`)
    })
}