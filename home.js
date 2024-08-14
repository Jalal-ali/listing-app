import { signOut , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "./config.js";

const btn = document.querySelector("#btn");
const show = document.querySelector("#show");
const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const items = document.querySelector("#items");
const modal = document.querySelector("#crud-modal");
const openBtn = document.querySelector("#openBtn");
const closeBtn = document.querySelector("#closeBtn");
const price = document.querySelector("#price");
const category = document.querySelector("#category");
const description = document.querySelector("#description");

const popupModal = document.querySelector("#popup-modal");
const closePopup = document.querySelector("#closePopup");


// success modal //
closePopup.addEventListener('click' , ()=>{
  popupModal.classList.add("hidden");
} )


//card modal work
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
    popupModal.classList.remove("hidden");
  } else {
    window.location = "index.html" ;
  }
});

// logout 
btn.addEventListener("click" , ()=>{
  signOut(auth).then(() => {
    window.location = "index.html";
    }).catch((error) => {
      alert("err");
    });

})




const arr = [] 
const descriptionarr = [] 
const pricearr = [] 
const categoryarr = [] 



//render func
function render() {
  items.innerHTML = " ";
  for(let i=0 ; i<arr.length ; i++){
    items.innerHTML +=   `
    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="subpixel-antialiased mb-2 text-2xl text-sm text-lg text-xl font-bold tracking-tight text-gray-900 dark:text-white">${arr[i]}</h5>
    <h5 class="subpixel-antialiased mb-2 text-2xl font-semibold tracking-tight text-gray-200 font-mono ">Rs.<span class="text-green-500 font-mono">${pricearr[i]}</span></h5>
    <h5 class="mb-2 text-2xl font-sans tracking-tight text-gray-900 dark:text-white">${categoryarr[i]}</h5>
    <p class="subpixel-antialiased italic font-medium text-gray-700 dark:text-gray-400">"${descriptionarr[i]}"</p>
    <div class="flex justify-around justify-items-end ms-auto mt-4 container">
    <button class="editBtn focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
    <button class="dltBtn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
    </div>
    </a>`;
    
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
}

//edit function
function editFunc(index) {
  const newItem = prompt("Edit Your Item's Name.");
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


form.addEventListener('submit' , (event)=>{
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


 