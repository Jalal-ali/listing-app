import { signOut , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "./config.js";
const btn = document.querySelector("#btn");
const show = document.querySelector("#show");
const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const items = document.querySelector("#items");

const arr = [] 


//render func
function render() {

  items.innerHTML = " ";
  for(let i=0 ; i<arr.length ; i++){
items.innerHTML +=   `
<a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${arr[i]}</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
</a>
`;  
  }
}






form.addEventListener('submit' , (event)=>{
  event.preventDefault();
  arr.push(todo.value);
  render();
  todo.value = ' ' ;

})













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


