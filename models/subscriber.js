const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({

    name:
    {
        type:String,
        required:true
    },
    subscribeToChannel :{
        type : String,
        required : true
    },
    subscribeDate:
    {
        type : Date,
        required : true,
        default : Date.now
    }
    
})

module.exports = mongoose.model('Subscriber',subscriberSchema)
// the reason we need the model function is because when we export this and import this  in any different file model allow us to interact directly with the database using the above schema
// the mongoose.model takes the two parameters the name of the model in the database and the other is the schema it corresponds  to
