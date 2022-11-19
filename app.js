const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path')

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, 'public')));

const backendURL = "http://localhost:3000/api"

const dayMapper = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeMapper = ['', '8', '9', '10', '11', '12', '1', '2', '3', '4']

//Home
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/admin', (req, res) => {
    res.render('admindashboard')
})

app.get('/timetableform', function (req, res) {
    res.render('timetableform')
});

//******auth*****
app.get('/signup', (req, res) => {
    res.render('auth/signup')
})

app.get('/login', (req, res) => {
    res.render('auth/login')
})

app.get('/assignroles', (req, res) => {
    res.render('assignroles')
})
//******auth end********


//************ Admin Only Routes */
app.get('/branch', (req, res) => {
    res.render('branchupload')
})


//Upload forms for admin
//teacher upload form
app.get("/teacher",(req,res)=>{
    res.render("uploadforms/teacher")
})


//************ Timetable ********* */
app.get('/timetableforadmin/:sem/:branchCode', function (req, res) {
    const { sem, branchCode } = req.params;
    fetch(`${backendURL}/timetable/${sem}/${branchCode}`)
        .then(response => response.json())
        .then(timetable => {
            res.render('timetables/timetableforadmin', { timeTable: timetable, dm: dayMapper, tm: timeMapper, sem: sem, branchCode: branchCode })
        })
        .catch(err => {
            //render error page (to be designed)
        })
});
app.get('/timetableforstudents/:sem/:branchCode', function (req, res) {
    const { sem, branchCode } = req.params;
    fetch(`${backendURL}/liveweek/${sem}/${branchCode}`)
        .then(response => response.json())
        .then(timetable => {
            res.render('timetables/timetableforstudents', { timeTable: timetable, dm: dayMapper, tm: timeMapper, sem: sem, branchCode: branchCode })
        })
        .catch(err => {
            //render error page (to be designed)
        })
});
app.get('/timetableforcr/:sem/:branchCode', function (req, res) {
    const { sem, branchCode } = req.params;
    fetch(`${backendURL}/liveweek/${sem}/${branchCode}`)
        .then(response => response.json())
        .then(timetable => {
            res.render('timetables/timetableforcr', { timeTable: timetable, dm: dayMapper, tm: timeMapper, sem: sem, branchCode: branchCode })
        })
        .catch(err => {
            //render error page (to be designed)
        })
});
//************ Timetable Ends ********* */



app.get('/status', function (req, res) {
    res.render("status", {});
});



app.listen(3003, function (err) {
    if (err) { console.log(err); }
    else { console.log("Frontend running on port 3003") };
})
