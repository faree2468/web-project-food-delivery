toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right",
    timeOut: "3000"
};

function checkPass(pass) {

    if (pass.length < 9) {

        return false;

    }

    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=<>?]{9,}$/

    return regex.test(pass)

}

function checkTel(tel) {

    let regex = /^\d+$/

    return regex.test(tel)

}

// custom form validation
const form = document.getElementById("myForm");

const error = document.querySelector(".error-message")
const passErr = document.getElementById("passwordError")
const telErr = document.getElementById("telError")
// if the password or the phone number is not valid, it won't let the user submit :)
form.addEventListener("submit", function(event) {

    event.preventDefault()

    const passwordInput = document.getElementById("pass").value;
    const telInput = document.getElementById("tel").value;

    console.log(passwordInput)
    console.log(telInput)

    if (!checkPass(passwordInput) && !checkTel(telInput)) {

        event.preventDefault()
        console.log("wrong password and tel")
        passErr.classList.add("inv")
        telErr.classList.add("inv")
        form.reset()

    }

    else if (!checkPass(passwordInput)){

        event.preventDefault()
        console.log("wrong password")
        passErr.classList.add("inv")
        telErr.classList.remove("inv")
        form.reset()
    }

    else if(!checkTel(telInput)) {

        event.preventDefault()
        console.log("wrong tel")
        passErr.classList.remove("inv")
        telErr.classList.add("inv")
        form.reset()
    }

    else {
        toastr.success(`Account succesfully created!`)
        passErr.classList.remove("inv")
        telErr.classList.remove("inv")
        setTimeout(()=>form.reset(), 3000)
    }



})



// DARK MODE
// ----- REGISTER.HTML -------

var links = document.getElementsByTagName("a")
var btns = document.getElementsByTagName("button")
var spans = document.getElementsByTagName("span")

function darkMode() {

    
    for (let link of links) {
            
        link.classList.add("dark-mode-a")


    }

    for (let btn of btns) {

        btn.classList.add("dark-mode-btn")

    }

    for (let span of spans) {

        if (span.classList.contains("item-text")) {

            span.classList.add("dark-mode-span")
        }
    }


}

function lightMode() {

    
    for (let link of links) {
        
        link.classList.remove("dark-mode-a")
        
    }

    for (let btn of btns) {

        btn.classList.remove("dark-mode-btn")

    }

    for (let span of spans) {

        if (span.classList.contains("item-text")) {

            span.classList.remove("dark-mode-span")
        }
    }

}

document.addEventListener("DOMContentLoaded", () => {

    if(localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");
        darkMode();

    } else {
        document.body.classList.remove("dark-mode");
        lightMode();
    }

})




