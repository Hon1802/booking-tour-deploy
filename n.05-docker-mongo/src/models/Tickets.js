import { ObjectId } from "bson";
import mongoose, { Schema } from "mongoose";
export default mongoose.model('Ticket',
    new Schema({
        id:{type: ObjectId},
        idTour:{
            type: ObjectId,
            required:true        
        },
        departureTime:{
            type: Date,
            required:true        
        },        
        returnTime:{
            type:Date,
            required:true        
        },
        // 4 status, 0 no active, 1 active, 2 sold, 3 traveling
        status:{
            type:String,
            required:true        
        }
    },{
        autoCreate: false,
        autoIndex: true
    })
)