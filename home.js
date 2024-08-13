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

const toggle = document.querySelector("#toggle");
 const popupModal = document.querySelector("#popup-modal");
 const closePopup = document.querySelector("#closePopup");



 closePopup.addEventListener('click' , ()=>{
  popupModal.classList.add("hidden");
} )

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



//modal work
openBtn.addEventListener('click' , ()=>{
  modal.classList.remove("hidden");
})
closeBtn.addEventListener('click' , ()=>{
  modal.classList.add("hidden");
})

//modal work ended

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
                <button type="button" class=" focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Blue</button>
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
            </div>
</a>

`;  
  }
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

// success modal //
 
















