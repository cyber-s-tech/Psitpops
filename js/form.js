


let num1, num2, correctAnswer;

function generateCaptcha(){
num1 = Math.floor(Math.random() * 10) + 1;
num2 = Math.floor(Math.random() * 10) + 1;
correctAnswer = num1 + num2;

const question = document.getElementById("captchaQuestion");
if(question){
question.textContent = `${num1} + ${num2} = ?`;
}
}

document.addEventListener("DOMContentLoaded", generateCaptcha);


// HELPER FUNCTIONS
function showError(input, message, errorEl){
input.classList.add("border-red-500");
errorEl.textContent = message;
errorEl.classList.remove("hidden");
}

function clearError(input, errorEl){
input.classList.remove("border-red-500");
errorEl.textContent = "";
errorEl.classList.add("hidden");
}

let captchaVisible = false;

document.addEventListener("submit", function(e){

if(e.target.id !== "contactForm") return;


e.preventDefault(); // ✅ STOP page reload immediately

const form = e.target;

const fname = form.querySelector("#firstname");
const lname = form.querySelector("#lastname");
const email = form.querySelector("#email");
const phone = form.querySelector("#phone");
const select = form.querySelector("#select");
const captcha = form.querySelector("#captchaInput");

// error elements
const fnameError = form.querySelector("#fnameError");
const lnameError = form.querySelector("#lnameError");
const emailError = form.querySelector("#emailError");
const phoneError = form.querySelector("#phoneError");
const selectError = form.querySelector("#selectError");
const captchaError = form.querySelector("#captchaError");

// clear all errors
[fname,lname,email,phone,select,captcha].forEach(el=>el.classList.remove("border-red-500"));
[fnameError,lnameError,emailError,phoneError,selectError,captchaError].forEach(el=>{
el.textContent="";
el.classList.add("hidden");
});

let isValid = true;

// REQUIRED
if(!fname.value.trim()){
showError(fname,"First name required",fnameError);
isValid = false;
}

if(!lname.value.trim()){
showError(lname,"Last name required",lnameError);
isValid = false;
}

if(!email.value.trim()){
showError(email,"Email required",emailError);
isValid = false;
}

if(!phone.value.trim()){
showError(phone,"Phone required",phoneError);
isValid = false;
}

if(!select.value){
showError(select,"Please select option",selectError);
isValid = false;
}

// NAME
if(fname.value && !/^[A-Za-z\s]+$/.test(fname.value)){
showError(fname,"Only letters allowed",fnameError);
isValid = false;
}

if(lname.value && !/^[A-Za-z\s]+$/.test(lname.value)){
showError(lname,"Only letters allowed",lnameError);
isValid = false;
}

// EMAIL
if(email.value && !/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/.test(email.value)){
showError(email,"Invalid email",emailError);
isValid = false;
}

// PHONE
if(phone.value && !/^\+?[0-9]+$/.test(phone.value)){
showError(phone,"Phone must contain only numbers",phoneError);
isValid = false;
}
if((phone.value.match(/\+/g) || []).length > 1){
showError(phone,"Only one '+' allowed",phoneError);
isValid = false;
}
if(phone.value.includes("+") && !phone.value.startsWith("+")){
showError(phone,"+ must be at the beginning",phoneError);
isValid = false;
}
if(phone.value.length < 5 || phone.value.length > 16){
showError(phone,"Phone length invalid",phoneError);
isValid = false;
}

// 👉 STEP: SHOW CAPTCHA ONLY AFTER VALID FORM
if(isValid && !captchaVisible){
captchaWrapper.classList.remove("hidden");
generateCaptcha();
captchaVisible = true;
return; // stop here, wait for next submit
}

// 👉 STEP: VALIDATE CAPTCHA
if(captchaVisible){
if(parseInt(captcha.value) !== correctAnswer){
showError(captcha,"Wrong answer",captchaError);
generateCaptcha();
return;
}
}


captchaWrapper.classList.add("hidden");
captchaVisible = false;
// SUCCESS
form.reset();
});

// PHONE INPUT FILTER (LIVE TYPING)
document.addEventListener("input", function(e){

if(e.target.id !== "phone") return;

let value = e.target.value;

value = value.replace(/[^0-9+]/g,"");

if(value.startsWith("+")){
value = "+" + value.slice(1).replace(/\+/g,"");
}else{
value = value.replace(/\+/g,"");
}

e.target.value = value.slice(0,16);

});