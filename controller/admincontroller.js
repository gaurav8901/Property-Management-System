const { compile } = require("ejs");
const express = require("express");

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5678',
  database: 'dbms_project',
  multipleStatements: true
});
//var connection = mysql.createConnection({multipleStatements: true});
exports.getHome = (req,res,next) => {
    
        res.render("../view/home");
        console.log('admincontroller1');
}


exports.getAdmin = (req,res,next) => {
    const a=req.body.admin;
     console.log(a);
    
    console.log('admincontroller2');
    db.query('select* from agent natural join property natural join sold where agent.agent_name like ?',['%' + a + '%'], function(err, result) {
        //db.query('SELECT * FROM Property p, Agent a where p.Agent_ID=a.Agent_ID  and a.Agent_Name like ? ','%' + a + '%', function(err, result) {
        if(err){
            throw err;
        } 
        
        else {
            db.query('select* from agent natural join property natural join rented where agent.agent_name like ?',['%' + a + '%'], function(err, result1) {
                if(err) throw err;
                else{
             
                    db.query('select * from agent where Agent_Name like ?',['%'+a+'%'],function(err,result3){
                        console.log(result)
                        //obj.name=AGN;
                        obj ={print: result,prin:result1,name:result3};
                        console.log(obj.print)
                                
                                res.render("../view/admi",obj);
                    })}


           
            })
            
                
                
            
           // res.render('print', obj);  
            //res.render("../view/admi",obj);              
        }
    });


}

exports.getAgent = (req,res,next) => {
    const a=req.body.admin;
     console.log(a);
    
    console.log('admincontroller2');

    db.query('select * from agent natural join property natural join available where agent.agent_name like ?',['%'+a+'%'], function(err, result) {
         if(err){
            throw err;
        } 
        
        else {
            db.query('select * from agent where Agent_Name like ?',['%'+a+'%'],function(err,result3){
                console.log(result)
                //obj.name=AGN;
                obj ={print: result,name:result3};
                console.log(obj.name)
                        res.render("../view/agent",obj);              
        })
    }});


    }





exports.getGuest = (req,res,next) => {

    res.render("../view/guest"); 

    
}

exports.getSearch =(req,res,next)=>{
    const q=req.body.price;
    const l=req.body.address;
    //res.render("../view/ guest");
    console.log('admincontroller3');
    console.log(l);
    db.query('SELECT * FROM Property p natural join  Available a  natural join Agent aa where a.Property_ID=p.Property_ID and a.Price<= ? and p.Address like ?',[q,'%'+l+'%'], function(err, result) {

        if(err){
            throw err;
        } else {
            
            obj = {print: result};
            console.log(obj.print)
           // res.render('print', obj);  
            res.render("../view/search",obj);              
        }
    });

    

}

exports.getBuy = (req,res,next) => {
    const n=req.body.name;
   console.log('ahent is'+n);
    const a=req.body.p_id;
    const b=req.body.br;
    const c=req.body.price;
    const d=req.body.date;
     console.log(a);
     console.log(b);
     console.log(c);
     console.log(d);
    
    console.log('admincontroller2');
    if(b=='b'){
        db.query('select * from available where Property_ID=?',[a],function (err,result1) {
            if(err){
                throw err;
            }
            else {
                console.log(result1);
                if(result1!=0)
                {  db.query('select * from sold where Property_ID=?',[a],function (err,result2) {
                    if(err) throw err;
                    else{
                        console.log(result2);
                    if(result2==0)
                    {
                        db.query('insert into sold values(?,?,?) ',[a,c,d], function(err, result3) {
                            //db.query('SELECT * FROM Property p, Agent a where p.Agent_ID=a.Agent_ID  and a.Agent_Name like ? ','%' + a + '%', function(err, result) {
                            if(err){
                                throw err;
                            } 
                            
                            else {
                                 db.query('delete from available where Property_ID=?;select * from available natural join property natural join agent where Agent_Name like ?   ',[a,'%'+n+'%'],function (err,result4) {
                                         if(err) throw err; 

                                         else{
                                            obj = {print: result4[1],name: n};
                                            console.log('agent;s name'+obj.name[0])
                                            // res.render('print', obj);  
                                             res.render("../view/agent",obj);
                                         }
                                 });
                                             
                            }
                        });
                    }}
                })
                    
                }
            }
        });
    }
    if(b=='r'){
        db.query('select * from available where Property_ID=?',[a],function (err,result1) {
            if(err){
                throw err;
            }
            else {
                console.log(result1);
                if(result1!=0)
                {  db.query('select * from rented where Property_ID=?',[a],function (err,result2) {
                    if(err) throw err;
                    else{
                        console.log(result2);
                    if(result2==0)
                    {
                        db.query('insert into rented values(?,?,?) ',[a,c,d], function(err, result3) {
                            //db.query('SELECT * FROM Property p, Agent a where p.Agent_ID=a.Agent_ID  and a.Agent_Name like ? ','%' + a + '%', function(err, result) {
                            if(err){
                                throw err;
                            } 
                            
                            else {
                                 db.query('delete from available where Property_ID=?;select * from available',[a],function (err,result4) {
                                         if(err) throw err; 

                                         else{
                                            obj = {print: result4[1]};
                                            // res.render('print', obj);  
                                             res.render("../view/agent",obj);
                                         }
                                 });
                                             
                            }
                        });
                    }}
                })
                    
                }
            }
        });
    }


}
