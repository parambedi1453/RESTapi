 const express = require('express')
 const router  = express.Router()
const Subscriber = require('../models/subscriber')


//  Getting all 
router.get('/', async(req,res) => {
    // res.send('hallo wrld')
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }
    catch (err) {
        // res.json({message : err.message})  sending as JSON
        // if want to send status
        res.status(500).json({message : err.message})
    }

})

//  Getting one
router.get('/:id',getSubscriber,(req,res) => {

    // res.send(res.subscriber.name)
    res.json(res.subscriber)
})

// creating one
router.post('/',async (req,res) =>{

    const subscriber = new Subscriber({
        name : req.body.name,
        subscribeToChannel : req.body.subscribeToChannel
    })
    try{
        const newSubscriber = await subscriber.save()
        // res.json(newSubscriber)
        res.status(201).json(newSubscriber)
        // 201 status code specuffying that user created
    }catch(err){
        // 400 specifying thbad data input and nothing wrong with server
        res.status(400).json({message:err.message})
    }

})


// updating one
// if we want to update a specific field then we use patch otherwise we use put
router.patch('/:id',getSubscriber,async (req,res) =>{

    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribeToChannel != null)
    {
        res.subscriber.subscribeToChannel = req.body.subscribeToChannel
    }
    try{

        const upadatedSubscriber = await res.subscriber.save()
        // res.json({message:'subscriber updated'})
        res.json(upadatedSubscriber)
    }catch(err)
    {
        res.status(400).json({message : err.message})
    }

})
// Deleting one
router.delete('/:id',getSubscriber,async (req,res) => {

    try{
        await res.subscriber.remove()
        res.json({message : 'Deleted Susbscriber'})

    }catch (err){
        res.status(500).json({message : err.message})
    }

})

//middleware function undertaking the same fucntionalities of same requests 
async function getSubscriber(req,res,next){

    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message : 'cannot find subscriber'})
        }
    }catch(err)
    {
        return res.status(500).json({message : err.message})
    }

    res.subscriber = subscriber
    next()
}
 module.exports = router
