const addRecord  = document.getElementById("addRecord");
const updateRecord  = document.getElementById("updateRecord");

//fetch records
function getAllResults(){

  const errorDiv  = document.getElementById("resultsError");
  const displayResults = document.getElementById("display_results");
  const totalRecordsTop = document.getElementById("totalRecordsTop");
  const totalRecordsBottom = document.getElementById("totalRecordsBottom");

  const totalRecordsShowingTop = document.getElementById("totalRecordsShowingTop");
  const totalRecordsShowingBottom = document.getElementById("totalRecordsShowingBottom");

  fetch(`/results`)
  .then(res  => res.json())
  .then((response)=>{

    let html = "";
    const data = response.results;
    const totalRecord = response.totalRecord;

    totalRecordsTop.innerText = totalRecord;
    totalRecordsBottom.innerText = totalRecord;

    totalRecordsShowingTop.innerText = data.length;
    totalRecordsShowingBottom.innerText = data.length;

    if(data.length > 0){
        data.forEach(element => {
                html += `  <div class="row">
                <div class="s-lib-box s-lib-box-std">
                         <div class="s-lib-box-content">
                         <ul>
                         <li><span><b>Date</b></span><div class=""><font>${element.date}</font></div></li>
                         <li><span><b>Home Team</b></span><div class=""><font>${element.home_team}</font></div></li>
                         <li><span><b>Away Team</b></span><div class=""><font>${element.away_team}</font></div></li>
                         <li><span><b>Home Score</b></span> <div class=""><font>${element.home_score}</font></div></li>
                         <li><span><b>Away Score</b></span><div class=""><font>${element.away_score}</font></div></li>
                         <li> <span><b>Tournament</b></a></span><div class=""> <font>${element.tournament}</font></div></li>
                         <li> <span><b>City</b></span><div class=""><font>${element.city}</font> </div></li>
                         <li><span><b>Country</b></span><div class=""><font>${element.country}</font></div></li>
                         <li><span><b>Neutral</b></span><div class=""><font>${element.neutral}</font></div></li>
                         </ul>
                         
                              <a href="/new-record"> <div class="link-button"><span><b>New Record</b></span></div></a>
                              <a href="/edit?recordID=${element._id}"> <div class="link-button"><span><b>Update</b></span></div></a>
                              <div onclick="Delete('${element._id}','${element.city}')"><div class="link-button"><span><b>Delete</b></span></div></div>
                              
                     </div>
                 </div>
             </div>`;          
            });

        displayResults.innerHTML = html;
        
      }else{
        displayResults.innerHTML  = `<h2>No Results found region </h2>`;
      }
    
  })
  .catch((err)=>{
    displayResults.innerHTML = err;
  });

  return;
}

//adding  new record
if(addRecord !== null){
  addRecord.addEventListener("click", (event) => {
    event.preventDefault();

    //get input values
    const date = document.getElementById('date').value;
    const home_team = document.getElementById('home_team').value;
    const away_team = document.getElementById('away_team').value;
    const home_score = document.getElementById('home_score').value;
    const away_score = document.getElementById('away_score').value;
    const tournament = document.getElementById('tournament').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    let neutral = document.querySelector('input[name="neutral"]:checked');
    let valid = true;

    const results = document.getElementById("display_results");
    const errDiv = document.getElementById("formError");

    if(date.trim() === "" || home_team .trim() === "" || away_team.trim() === "" || home_score.trim() === "" || away_score.trim() === "" || tournament.trim() === "" || city.trim() === "" || country.trim() === ""){
      errDiv.innerHTML = "All fields are required";
      valid = false;
    }

    
    if(neutral === null){
      errDiv.innerHTML = "All fields are required";
      valid = false;
    }

    if (!valid) return false;

    neutral = neutral.value;
    errDiv.innerHTML = "";
    

  const formData = JSON.stringify({"date":date,"home_team":home_team,"away_team":away_team,"home_score":home_score,"away_score":away_score,
  "tournament":tournament,"city":city,"country":country,"neutral":neutral});

  //  make ajax call
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST",'/add-new-record',false);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.onreadystatechange = function() {
    errDiv.innerHTML = "";
     if (this.status == 200) {
       
          // Parse this.responseText to JSON object
        const response = JSON.parse(this.response);
        console.log(response);
        response.forEach(response => {
        results.innerHTML = `  <div class="row">
        <div class="s-lib-box s-lib-box-std">
                 <div class="s-lib-box-content">
                 <ul>
                 <li><span><b>Record ID</b></span><div class=""><font>${response._id}</font></div></li>
                 <li><span><b>Date</b></span><div class=""><font>${response.date}</font></div></li>
                 <li><span><b>Home Team</b></span><div class=""><font>${response.home_team}</font></div></li>
                 <li><span><b>Away Team</b></span><div class=""><font>${response.away_team}</font></div></li>
                 <li><span><b>Home Score</b></span> <div class=""><font>${response.home_score}</font></div></li>
                 <li><span><b>Away Score</b></span><div class=""><font>${response.away_score}</font></div></li>
                 <li> <span><b>Tournament</b></a></span><div class=""> <font>${response.tournament}</font></div></li>
                 <li> <span><b>City</b></span><div class=""><font>${response.city}</font> </div></li>
                 <li><span><b>Country</b></span><div class=""><font>${response.country}</font></div></li>
                 <li><span><b>Neutral</b></span><div class=""><font>${response.neutral}</font></div></li>
                 </ul>
                 
                      <a href="/new-record"> <div class="link-button"><span><b>New Record</b></span></div></a>
                      <a href="/edit?recordID=${response._id}"> <div class="link-button"><span><b>Update</b></span></div></a>
                      <div onclick="Delete('${response._id}','${response.city}')"><div class="link-button"><span><b>Delete</b></span></div></div>
                      
             </div>
         </div>
     </div>`
    });

     }else{

      errDiv.innerHTML = this.status +" "+this.statusText;
      
     }
  };
  xhttp.send(formData);
})
}

//get record to update
function recordToUpdate() {

  const record_ID = getUrlParam().get('recordID');

   console.log(record_ID);

   //get form inputs
  const formError =  document.getElementById('formError'); 
  const recordID =  document.getElementById('recordID');
  const date = document.getElementById('date');
  const home_team = document.getElementById('home_team');
  const away_team = document.getElementById('away_team');
  const home_score = document.getElementById('home_score');
  const away_score = document.getElementById('away_score');
  const tournament = document.getElementById('tournament');
  const city = document.getElementById('city');
  const country = document.getElementById('country');

  const isTrue =  document.getElementById('isTrue');
  const isFalse =  document.getElementById('isFalse');

  fetch(`/get-single-record/${record_ID}`)
  .then(res  => res.json())
  .then((data)=>{

    let html = "";

    if(data.length > 0){
        data.forEach(element => {

              recordID.value = element._id;
              const [ddate, time] = formatDate( new Date(element.date)).split(' ');
              date.value = ddate + 'T' + time;
              home_team.value = element.home_team;
              away_team.value = element.away_team;
              home_score.value = element.home_score;
              away_score.value = element.away_score;
              tournament.value = element.tournament;
              city.value = element.city;
              country.value = element.country;

               if(element.neutral) 
               isTrue.checked = true;
              else
              isFalse.checked = true;
                        
            });
        
      }else{
        formError.innerHTML  = `<h2>No Record found </h2>`;
      }
    
  })
  .catch((err)=>{
    formError.innerHTML = err;
  });

  return;
}

//Update the record
if(updateRecord !== null){
  updateRecord.addEventListener("click", (event) => {
    event.preventDefault();

    //get input values
  const record_ID = getUrlParam().get('recordID');
  const date = document.getElementById('date').value;
  const home_team = document.getElementById('home_team').value;
  const away_team = document.getElementById('away_team').value;
  const home_score = document.getElementById('home_score').value;
  const away_score = document.getElementById('away_score').value;
  const tournament = document.getElementById('tournament').value;
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;
  let neutral = document.querySelector('input[name="neutral"]:checked');
  let valid = true;
  const errDiv = document.getElementById("formError");
  const results = document.getElementById("display_results");

    if(date.trim() === "" || home_team .trim() === "" || away_team.trim() === "" || home_score.trim() === "" || away_score.trim() === "" || tournament.trim() === "" || city.trim() === "" || country.trim() === ""){
      errDiv.innerHTML = "All fields are required";
      valid = false;
    }

    
    if(neutral === null){
      errDiv.innerHTML = "All fields are required";
      valid = false;
    }

    if (!valid) return false;

    neutral = neutral.value;
    errDiv.innerHTML = "";
    

  const formData = JSON.stringify({"date":date,"home_team":home_team,"away_team":away_team,"home_score":home_score,"away_score":away_score,
  "tournament":tournament,"city":city,"country":country,"neutral":neutral});

  //  make ajax call
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT",`/update-record/${record_ID}`,false);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.onreadystatechange = function() {
    errDiv.innerHTML = "";
     if (this.status == 200) {
       
        // Parse this.responseText to JSON object
        const response = JSON.parse(this.response);
        console.log(response);
        if(response.modifiedCount > 0){
        
          results.innerHTML = "<h2>Record updated successfully</h2>"
          
        }else{
          errDiv.innerHTML = "Failed to updated record";
        }

     }else{

      errDiv.innerHTML = this.status +" "+this.statusText;
      
     }
  };
  xhttp.send(formData);
})
}

//Delete a record
function Delete(record_id) {

  const formData = JSON.stringify({'id':record_id});

  var xhttp = new XMLHttpRequest();

  xhttp.open("DELETE", `/delete/${record_id}`,false);

  xhttp.setRequestHeader('Content-type', 'application/json');

  xhttp.onreadystatechange = function() {

     if (this.status == 200) {

          // Parse this.responseText to JSON object
          const data = JSON.parse(this.response);
          console.log(data);
          console.log(data.deletedCount);

          if(data.deletedCount > 0){
            alert("Record "+record_id+" has been deleted succusefully");
            location.reload();
            }
          else
            alert("Error in deleting record "+record_id);

         }
      };

   xhttp.send(formData);
  return
}



// 👇️ (Helper functions)
function getUrlParam() {
   const queryString = window.location.search; 
   const urlParams = new URLSearchParams(queryString);
   return urlParams;
}

// 👇️👇️👇️ Format Date as yyyy-mm-dd hh:mm:ss
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      // padTo2Digits(date.getSeconds()),  // 👈️ can also add seconds
    ].join(':')
  );
}