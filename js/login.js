// DARK MODE
// ----- LOGIN.HTML -------


var links = document.getElementsByTagName("a")
var btns = document.getElementsByTagName("button")
var spans = document.getElementsByTagName("span")

function darkMode() {

    cart.style.background = "black"
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

    cart.style.background = "lightgrey"
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