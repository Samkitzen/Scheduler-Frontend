const express=require('express');
const bodyParser=require('body-parser');
const fetch = require('node-fetch')

const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const backendURL = "http://localhost:3000/api"

const dayMapper = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeMapper = ['','8','9','10','11','12','1','2','3','4']


//get values of sem and branchCode dynamically 
const sem = 7
const branchCode = "CSA"

app.get('/',function(req,res){
    
    fetch(`${backendURL}/timetable/${sem}/${branchCode}`)
    .then(response => response.json())
    .then(timetable =>{
        res.render('calender',{timeTable : timetable,dm:dayMapper,tm:timeMapper })
    })
    .catch(err=>{
        //render error page (to be designed)
    })
});

app.get('/status',function(req,res){
    res.render("status",{});
});

app.post('/',function(req,res){
    const day=req.body.day;
    const period=req.body.period;
    const subjectCode=(req.body.subjectCode);

    // if(req.body.submitButton=="cancel")
    // {
    //     const query = { [`${day}.${period}`]: { subjectCode:subjectCode, bit:1 } };
    //     //TimeTable.updateOne({_id:1},[day][period]:{bit:1},function(err){if(err){console.log(err);}});
    //     TimeTable.updateOne({name:"name1"}, query, function(err){});
    // }

    //START ONly changed this if part ---->samkit
    // else 
    if(req.body.submitButton=="change")
    {
        const data = {
            sem,branchCode,day,time:timeMapper[period],subjectCode
        }
        fetch(`${backendURL}/timetable`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
              },
              body : JSON.stringify(data)
        }).then(d=>{
            res.redirect('/')
        })
        .catch(err=>{
            //render error page
        })
        // const query = { [`${day}.${period}`]: { subjectCode:subjectCode, bit:0 } };
        // TimeTable.updateOne({name:"name1"}, query, function(err){});
    }

    //END 


    // else if(req.body.submitButton=="schedule")
    // {
    //     //TimeTable.updateOne({_id:1},{day:{period:{bit:2}}},function(err){if(err){console.log(err);}});
    //     const today=new Date().getDate();
    //     Status.updateOne({date:today},{lectures:{subjectCode:subjectCode, count:count+1}});
    // }
    // res.redirect('/');
});



app.listen(3003, function(err){
    if(err){ console.log(err); }
    else{ console.log("Frontend running on port 3003")};
})
