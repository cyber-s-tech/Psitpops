document.addEventListener("submit", function(e){

if(e.target.id !== "contactForm") return;

const form = e.target;

const fnameField = form.querySelector("#firstname");
const lnameField = form.querySelector("#lastname");
const emailField = form.querySelector("#email");
const phoneField = form.querySelector("#phone");
const selectField = form.querySelector("#select");
const errorMsg = form.querySelector("#errorMsg");

errorMsg.textContent = "";

// TRIM VALUES
const fnameValue = fnameField.value.trim();
const lnameValue = lnameField.value.trim();
const emailValue = emailField.value.trim();
const phoneValue = phoneField.value.trim();
const selectValue = selectField.value.trim();


// REQUIRED FIELD CHECK
if(fnameValue === "" || lnameValue === "" || emailValue === "" || phoneValue === ""|| selectValue ===""){
e.preventDefault();
errorMsg.textContent = "Please fill out all fields";
return;
}


// NAME VALIDATION
const namePattern = /^[A-Za-z\s]+$/;

if(!namePattern.test(fnameValue)){
e.preventDefault();
errorMsg.textContent = "Name should contain only letters";
return;
}

if(!namePattern.test(lnameValue)){
e.preventDefault();
errorMsg.textContent = "Name should contain only letters";
return;
}


// EMAIL VALIDATION
const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;

if(!emailPattern.test(emailValue)){
e.preventDefault();
errorMsg.textContent = "Invalid or unsupported email provider";
return;
}


// PHONE VALIDATION
if(!/^\+?[0-9]+$/.test(phoneValue)){
e.preventDefault();
errorMsg.textContent = "Phone must contain only numbers and optional '+' at start";
return;
}

if((phoneValue.match(/\+/g) || []).length > 1){
e.preventDefault();
errorMsg.textContent = "Only one '+' allowed";
return;
}

if(phoneValue.includes("+") && !phoneValue.startsWith("+")){
e.preventDefault();
errorMsg.textContent = "'+' must be at the beginning";
return;
}
if(phoneValue.length > 16){
e.preventDefault();
errorMsg.textContent = "Phone number too long";
return;
}

if(phoneValue.length < 5){
e.preventDefault();
errorMsg.textContent = "Phone number too short";
return;
}
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