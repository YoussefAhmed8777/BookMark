let webNameInput = document.getElementById('webName');
let webUrlInput = document.getElementById('webUrl');
let selectedInput = document.querySelectorAll('.selectedInput');

let regex1 = /^[a-zA-Z0-9 ]{3,32}$/i; // this (i) in the end allows it to accept the value either it's capital or small.
let regex2 = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;

let websitesBox = []; 

websitesBox = JSON.parse(localStorage.getItem("allWebsites")) || [];
displayWebsite();


function addWebsite(){
  var website = {
    name:webNameInput.value,
    url:webUrlInput.value,
  };
  if(validation(webNameInput.id, webNameInput.value)&& validation(webUrlInput.id, webUrlInput.value)&& preventDuplication(websitesBox, website)){
    Swal.fire({
      icon: "success",
      title: "Congrats",
      text: "It's Working"
    });
    websitesBox.push(website);
    displayWebsite();
    clearInput();
    localStorage.setItem("allWebsites", JSON.stringify(websitesBox));
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!"
    });
  };
}; 

function displayWebsite(){
  var cartona='';

  for(var i=0; i<websitesBox.length; i++){
    cartona+= `
        <tr>
          <td>${i+1}</td>
          <td>${websitesBox[i].name}</td>
          <td><a href="${websitesBox[i].url}" target="_blank"><button type="button" class="btn btn-outline-success"> <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit</button></a></td>
          <td><button type="button" onclick="deleteWebsite(${i})" class="btn btn-outline-danger"> <i class="fa-regular fa-trash-can"></i> Delete</button></td>
          <td><button type="button" onclick="getWebsiteDetails(${i})" class="btn btn-outline-info"> <i class="fa-regular fa-pen-to-square"></i> Edit</button></td>
        </tr>
    `
  }
  document.getElementById('demo').innerHTML=cartona;
}

function clearInput(){
  webNameInput.value="";
  webUrlInput.value="";
  webNameInput.classList.remove('is-valid');
  webUrlInput.classList.remove('is-valid');
} 

function deleteWebsite(index){
  websitesBox.splice(index,1);
  displayWebsite();
  localStorage.setItem("allWebsites", JSON.stringify(websitesBox));
}

var superIndex;

function getWebsiteDetails(index){

  superIndex = index

  document.getElementById('update-btn').style.display="block";
  document.getElementById('add-btn').style.display="none";

  webNameInput.value =websitesBox[index].name
  webUrlInput.value =websitesBox[index].url
} 

function updateWebsite(){

  websitesBox[superIndex].name = webNameInput.value;
  websitesBox[superIndex].url = webUrlInput.value;

  displayWebsite();
  localStorage.setItem("allWebsites", JSON.stringify(websitesBox));
  clearInput();

  document.getElementById('update-btn').style.display="none";
  document.getElementById('add-btn').style.display="block";
}

for (let i=0; i<selectedInput.length; i++){
  selectedInput[i].addEventListener(('input'),function(e){
    let inputId= e.target.id;
    let inputValue= e.target.value;
    validation(inputId, inputValue);
  })
};

function validation(id,value){
  let objRegex= {
    webName:regex1,
    webUrl:regex2
  };

  let element=document.getElementById(id);
  let errorMessage=document.getElementById(id+'Error');

  if (objRegex[id].test(value)==true){
   element.classList.add('is-valid');
   element.classList.remove('is-invalid');
   errorMessage.innerHTML='';
   return true;
  }else{
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    errorMessage.innerHTML=(id=='webName')?'Website name must at least contain 3 characters':'Wesite URL must be a valid one';
    return false;
  };
};

function preventDuplication(arr,newObj){
  for (let i= 0; i< arr.length; i++) {
    if(arr[i].webName==newObj.webName || arr[i].webUrl==newObj.webUrl){
      return false;
    };
  };
  return true;
};