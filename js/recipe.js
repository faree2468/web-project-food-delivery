const foodform = document.getElementById("foodForm")
const foodlist = document.getElementById("ing")
const foodinfo = document.getElementById("search-result")
foodform.addEventListener("submit", function(event) {

    event.preventDefault(); // CORS RELATED
    const foodInput = document.getElementById("foodtxt").value
    console.log(foodInput)

    fetch(`https://dummyjson.com/recipes/search?limit=1&q=${foodInput}`)
    .then(res => res.json())
    .then((data) => {
        if (data.recipes && data.recipes.length > 0) {

            const recipe = data.recipes[0]
            const name = recipe.name
            const ingredients = recipe.ingredients

            foodinfo.innerHTML = name
            
            for (const x in ingredients) {
                const node = document.createElement("li")
                const textnode = document.createTextNode(ingredients[x])
                node.appendChild(textnode)
                foodlist.appendChild(node)
            }

        } else {
            foodinfo.innerHTML = "No recipes found"
            foodlist.innerHTML = ""
        }
    })
    .catch(error => {
        console.error("Error fetching data: ", error)
        foodinfo.innerHTML = "Something went wrong, try again later"
        foodlist.innerHTML = ""
    })

})


// DARK MODE
var links = document.getElementsByTagName("a")
var btns = document.getElementsByTagName("button")
var spans = document.getElementsByTagName("span")

var cart = document.querySelector(".cart-total")

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