import { signOut , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {app , auth , db } from "./config.js";
import { query, orderBy, getDocs ,
       collection,
       addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const logbtn = document.querySelectorAll("#btn");
const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const items = document.querySelector("#items");
const modal = document.querySelector("#crud-modal");
const openBtn = document.querySelector("#openBtn");
const closeBtn = document.querySelector("#closeBtn");
const price = document.querySelector("#price");
const category = document.querySelector("#category");
const description = document.querySelector("#description");
const hambrgr = document.querySelector("#hambrgr");
const hdnli = document.querySelector("#hdnli");
const userdrop = document.querySelector("#userdrop");
const dropdownMenuButton2 = document.querySelector("#dropdownMenuButton2");


let x = 0 ;
hambrgr.addEventListener('click' , ()=>{
  if (x == 0) {
    hdnli.classList.remove("hidden");
    x = 1;
  } else {
    hdnli.classList.add("hidden");
    x = 0;
  }
})

let y = 0 ;
dropdownMenuButton2.addEventListener('click' , ()=>{
  if (y == 0) {
    userdrop.classList.remove("hidden");
    y = 1;
  } else {
    userdrop.classList.add("hidden");
    y = 0;
  }
})


//product modal work
openBtn.addEventListener('click' , ()=>{
  modal.classList.remove("hidden");
})
closeBtn.addEventListener('click' , ()=>{
  modal.classList.add("hidden");
})
//modal work ended


//check user
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user.uid);
  } else {
    window.location = "index.html" ;
  }
});



// logout 
logbtn.forEach((btn)=>{
  btn.addEventListener('click' ,  ()=> {
    signOut(auth).then(() => {
      window.location = "index.html";
    }).catch((error) => {
      alert("err");
    });
  } )
})



// global arrays 
let arr = [] 
let descriptionarr = [] 
let pricearr = [] 
let categoryarr = [] 
//...
// get img 
let image = document.getElementById('output');
let file = document.getElementById('file');
file.addEventListener('click' , ()=>{  
// image.src = window.URL.createObjectURL(file.files[0]) ;
  console.log(file.files[0].name);
  
})


//render func
function render() {
  items.innerHTML = " ";
  for(let i=0 ; i<arr.length ; i++){
    items.innerHTML +=   `
    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl text-sm text-lg text-xl font-bold tracking-tight text-gray-900 dark:text-white">${arr[i]}</h5>
    <h5 class=" mb-2 text-2xl font-semibold tracking-tight text-gray-200 font-mono ">Rs.<span class="text-green-500 font-mono">${pricearr[i]}</span></h5>
    <h5 class="mb-2 text-2xl font-sans tracking-tight text-gray-900 dark:text-white">${categoryarr[i]}</h5>
    <p class="italic font-medium text-gray-700 dark:text-gray-400">"${descriptionarr[i]}"</p>
    <div class="flex justify-around justify-items-end ms-auto mt-4 container">
    <button class="editBtn focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
    <button class="dltBtn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
     <button class="save focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:focus:ring-green-900">Save</button>
    </div>
    </a>`;
    
    const save = document.querySelectorAll(".save");
save.forEach((btn , index)=>{
  btn.addEventListener('click' , ()=> saveData(index))
})

    //edit button work 
    const editBtn = document.querySelectorAll(".editBtn");
    editBtn.forEach((btn , index)=>{
      btn.addEventListener('click' ,  ()=> editFunc(index) )
    })
    //...
    
    //delete button work 
    const dltBtn = document.querySelectorAll(".dltBtn");
dltBtn.forEach((btn , index)=>{
  btn.addEventListener('click' , ()=> dltFunc(index))
})
//...
  }//...for-loop ended  

}//render func ended

// save to firebase db 
async function saveData(index){

  try {
    const docRef = await addDoc(collection(db, "cards"), {
      Item: arr,
      Price: pricearr,
      Category : categoryarr ,
      Description: descriptionarr,
      postTime: serverTimestamp() ,
      uid: auth.currentUser.uid
    });  
    console.log(arr + " pushed " + "Document written with ID: ", docRef.id);
arr = []
pricearr = []
descriptionarr = []
categoryarr = []
  } catch (e) {
    console.error("Error adding document: ", e);
  }
//....
}

//edit function
function editFunc(index) {
  const newItem = prompt(`Edit Your Item's Name.`);
  const newPrice = prompt("Edit Your Item's Price.");
  const newDescription  = prompt("Edit Your Item's Description.");
  arr.splice(index , 1 , newItem );
  pricearr.splice(index , 1 , newPrice );
  descriptionarr.splice(index , 1 , newDescription );
render();
}
//delete function
function dltFunc(index){
  console.log(`${arr[index]} is deleted`);
arr.splice(index , 1);
render();
}


form.addEventListener('submit' ,async (event)=>{
  event.preventDefault();
  modal.classList.add("hidden");
  arr.push(todo.value);
  descriptionarr.push(description.value);
  pricearr.push(price.value);
  categoryarr.push(category.value);
  render();


todo.value = ' ' ;
description.value = ' ' ;
price.value = ' ' ;
category.value = ' ' ;
})



