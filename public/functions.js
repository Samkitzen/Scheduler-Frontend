//const dayy=require("../app.js");
function updtbl(day,period)
{
    openUpdater();
    var submitter=document.getElementById("submitt");
    submitter.innerHTML="";
    submitter.innerHTML+="<input type='hidden' name='day' value="+day+">"
    submitter.innerHTML+="<input type='hidden' name='period' value="+period+">"
    submitter. innerHTML+="<button type='submit' name='submitButton' value='cancel' id='Cancel' onclick='closeUpdater()' >Cancel the Lecture </button><br><br><br>";
    //submitter.innerHTML+= "<button type='submit' name='submit-button' value='schedule'"
    //submitter.innerHTML+="<button type='submit' name='submit-button' value='change' onclick='closeUpdater()'> Submit</button>";
    //location.href="./form.html";
   //window.open("form.html");
}
function JsonSaver(day,period)
{
    var subject=document.getElementById('subjectCode').value;
    var teacher=document.getElementById('teacherName').value;
    //var cell=document.getElementById(""+day+period);
    /*timeTable.insertOne({day:{period: {subjectCode:subject, bit:0}}}, function(err){
        if(err){console.log(err);}
    });*/
    //cell.innerHTML=subject+"<br>"+teacher;
    //cell.classList.remove('LectureCancel');
    //alert(subject+teacher+" "+day+" "+period);
    //dayy.updater(day,period,subject);
    closeUpdater();
}
function Canceller(day,period)
{
    var Cancel=document.getElementById(""+day+"+"+period);
    console.log(Cancel);
    console.log(""+day+"+"+period);
    Cancel.classList.add('LectureCancel');
    closeUpdater();
}
// ----------------------- popup ------------------
function openUpdater()
{
    var updater=document.getElementById("popup");
    if(updater==null) return
    updater.classList.add('active');
    overlay.classList.add('active');
}
function closeUpdater()
{
    var updater=document.getElementById('popup');
    if(updater==null)return
    updater.classList.remove('active');
    overlay.classList.remove('active');
}

//ADDED For Subject dropdown and subject faculty table
const onLoad = async() =>{
    const backendURL = "http://localhost:3000/api"
    var selectSubject = document.getElementById("selectSubject");
    await fetch(`${backendURL}/subject/7/CSA`).then(async (d) => {
      const subjects = await d.json();

      const subTable = document.getElementById("subject-table_body")
        let html = ""
      for (var i = 0; i < subjects.length; i++) {
        html += `<tr><td class='tooltip'>${subjects[i].subjectCode}</td>
        <td class='tooltip'>${subjects[i].name}</td>
        <td class='tooltip'>${subjects[i].teacherCode}</td>
        <td class='tooltip'>${subjects[i].teacherName}</td>
        </tr>`
        var opt = subjects[i];
        var el = document.createElement("option");
        el.textContent = opt.name;
        el.value = opt.subjectCode;
        selectSubject.appendChild(el);
      }
      subTable.innerHTML = html
    });
}