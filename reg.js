import {signInWithPopup, 
        GoogleAuthProvider , 
        createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "./config.js"
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("#form");
const googlebtn = document.querySelector("#ggl-btn");
const popupModal = document.querySelector("#popup-modal");
const closePopup = document.querySelector("#closePopup");
const userpara = document.querySelector(".userpara");
// const loggedIn = document.querySelector("#loggedIn")

const btn = document.querySelector("#btn");
 btn.addEventListener('clicK' , ()=>{
  btn.innerHTML = "Loading" ;
  console.log(email.value);
 })
 
 //register via form 
 form.addEventListener( 'submit' ,  (event)=>{
   event.preventDefault(); 
   createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed up 
    window.location = "index.html";
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Something Went Wrong! Try Again. :]");
    // ..
  });
})

//register with google

// auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

googlebtn.addEventListener('click' , ()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
   const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
   const user = result.user;
   userpara.innerHTML = user.email + "." ;
   popupModal.classList.remove("hidden");
   closePopup.addEventListener('click' , ()=>{
    popupModal.classList.add("hidden");
    window.location.href = "home.html" ;
  })
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
})