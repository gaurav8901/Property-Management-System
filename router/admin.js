const express = require('express')
const router = express.Router()
const adminController = require('../controller/admincontroller')
const app=express();

router.get('/', adminController.getHome);

router.post('/agent',adminController.getAgent);

router.post('/admi',adminController.getAdmin);

router.get('/guest',adminController.getGuest);


//router.get('/search',adminController.getSearch)

router.post('/search',adminController.getSearch);

router.post('/buy',adminController.getBuy);

app.get('/',function(){
    console.log('admin');
 
 });

module.exports = router