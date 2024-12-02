let webNameInput = document.getElementById('webName');
let webUrlInput = document.getElementById('webUrl');

let regex1 = /^[a-zA-Z0-9 ]{2,}$/;
let regex2 = / ^(ftp|http|https):\/\/[^ "]+$ /;

let websitesBox = []; 

websitesBox = JSON.parse(localStorage.getItem("allWebsites")) || [];
displayWebsite();


function addWebsite(){
  var website = {
    name:webNameInput.value,
    url:webUrlInput.value,
  };
    websitesBox.push(website);
    displayWebsite();
    clearInput();
    localStorage.setItem("allWebsites", JSON.stringify(websitesBox));
} 

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