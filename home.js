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


//check user
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
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

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${arr[i]}</h5>
<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Rs.${pricearr[i]}</h5>
<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${categoryarr[i]}</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">${descriptionarr[i]}</p>
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













