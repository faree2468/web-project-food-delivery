// DARK MODE
// --------------- MAIN.HTML -------------------
var btn = document.getElementById("nav-switchthemes")
var iconbtn = document.getElementById("iconbtn")

var links = document.getElementsByTagName("a")
var btns = document.getElementsByTagName("button")
var spans = document.getElementsByTagName("span")

function darkMode() {

    iconbtn.classList.remove("fa-solid", "fa-moon")
    iconbtn.classList.add("fa-solid", "fa-sun")
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

    iconbtn.classList.remove("fa-solid", "fa-sun")
    iconbtn.classList.add("fa-solid","fa-moon")
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

function switchThemes() {

    

    var elements = document.body
    elements.classList.toggle("dark-mode")
    if (elements.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark")
        darkMode()
        


    } else {
        localStorage.setItem("theme", "white")
        lightMode()
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

btn.addEventListener("click", switchThemes)

// FAQ ACCORDION
var ans = document.querySelectorAll(".ans1")
var faqs = document.querySelectorAll(".faq1")

faqs.forEach((item) => {

    item.addEventListener("click", () => {

        toggleFaq(item)

    })

})

function toggleFaq(faq) {

    var ans = faq.nextElementSibling

    if (ans.style.display === "block") {
        ans.style.display = "none";
        
         
    } else {
        
        document.querySelectorAll(".ans1").forEach((ansItem) => {
            ansItem.style.display = "none";
            
        });

        ans.style.display = "block"; 
        
    }
}