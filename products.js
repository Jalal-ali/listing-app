import { signOut , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {app , auth , db } from "./config.js";
import { query, orderBy, getDocs ,
       collection,
       addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
  
 const logbtn = document.querySelectorAll("#btn");
 const items = document.querySelector("#items");

 //hamburger work
 const hambrgr = document.querySelector("#hambrgr");
 const hdnli = document.querySelector("#hdnli");

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
  
  
let wholeData = []
let descriptionArr = []
let itemArr = []
let priceArr = []
let categoryArr = []
//func getData from fire base
async function getData() {
  const querySnapshot = await getDocs(collection(db, "cards"));
  querySnapshot.forEach((doc , index) => {
    if(doc.data().uid == auth.currentUser.uid){
      wholeData.push(doc.data());
    itemArr.push(doc.data().Item);
    priceArr.push(doc.data().Price);
    categoryArr.push(doc.data().Category);
    descriptionArr.push(doc.data().Description);    
  }
});
    wholeData.forEach((value)=>{
      console.log(value.Item);
        
        items.innerHTML += `<div>
        <div class="shadow-md content-cente shadow-orange-200 opacity-100 rounded-lg border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
     <div class=" sm:h-auto md:h-auto lg:h-auto max-w-xs">
       <a href="#">
         
         <img class=" lg:h-auto sm:h-auto md:h-auto sm:w-64 rounded-lg dark:block" src="./assets/workplace-business-modern-male-accessories-laptop-white.jpg" alt="no-image" />
       </a>
     </div>
  <!-- ye -->
     <div class="pt-6  place-self-center">
       <hr class="w-50 h-1 mx-auto my-6 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">
       <a href="#" class="text-lg font-serif font-bold leading-tight text-gray-900 hover:underline dark:text-white">${value.Item}</a>
       <h6 class="text-lg mt-1 font-semibold dark:text-white">${value.Category}</h6>
       
         <div class="mt-3 mb-2 flex items-center justify-center gap-4">
           
           <p class="text-2xl font-extrabold font-mono leading-tight text-gray-900 dark:text-white">Rs.${value.Price}</p>
           
         </div>
         <p class="mb-3 italic text-gray-500 dark:text-gray-400">"${value.Description}"</p>

       </div>
     </div>
</div>`;
    })
    
} //..getData func ended ..//

getData();
