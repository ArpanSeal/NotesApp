showNotes();
let addTxt = document.getElementById("addTxt");
let charLimit = document.getElementById("charLimit");
let limit = 200;
let addTitle = document.getElementById("addTitle");
let charLimitTitle = document.getElementById("charLimitTitle");
let limitTitle = 15;
charLimit.textContent = 0 + "/" + limit;
charLimitTitle.textContent = 0 + "/" + limitTitle;
addTxt.addEventListener("input", function(){
  let txtLength = addTxt.value.length;
  charLimit.textContent = txtLength + "/" + limit;
})
addTitle.addEventListener("input", function(){
  let titleLength = addTitle.value.length;
  charLimitTitle.textContent = titleLength + "/" + limitTitle;
})

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let titleValue = addTitle.value;
  let txtValue = addTxt.value;
  notesObj.push({titleValue, txtValue});

  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  charLimit.textContent = 0 + "/" + limit;
  charLimitTitle.textContent = 0 + "/" + limitTitle;
  showNotes();
});


function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += 
    `<div class="card noteCard m-2" id="card-bg"
        style="background: url('./img/note${index % 5}.png') no-repeat center center/cover;">
        <div class="card-body" id="noteBody">
            <br>
            <h4 class="card-title" id="noteTitle">${element.titleValue}</h4>
            <p class="card-text"> ${element.txtValue} </p>
            <a id="${index}" class="closeBtn" onClick="deleteNote(this.id)"></a>
        </div>
    </div>`;
  });
  let notesElm = document.getElementById('notes');
  if(notesObj.length != 0)
  {
    notesElm.innerHTML = html;
  }
  else{
    notesElm.innerHTML = `<p class="d-flex justify-content-center align-items-center" style="font-weight: 400; font-size: 1rem; color: grey; font-family: 'Open Sans', sans-serif;">There is no note to display at this time</p>`
  }
}


function deleteNote(index)
{
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("search");
search.addEventListener("input", function(e){
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function(element){
    let cardTitle = element.getElementsByClassName("card-title")[0].innerText;
    let cardText = element.getElementsByClassName("card-text")[0].innerText;
    if(cardTitle.toLowerCase().includes(inputVal) || cardText.toLowerCase().includes(inputVal))
    {
      console.log('true');
      element.style.display = "block";
    }
    else
    {
      console.log('false');
      element.style.display = "none";
    }
  })
})