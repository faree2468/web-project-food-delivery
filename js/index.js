var app = $.spapp({


    defaultView: "#home",
    templateDir: "./views/"

});

app.route({

    view: "home",
    load: "main.html",
    onCreate: function() {console.log("Home page created")},
    onReady: function() {

        setTimeout(() => homepagejs(), 0);
    }

})

app.route({

    view:"recipe",
    load:"recipe.html",
    onCreate: function() {console.log("Recipe page created")},
    onReady: function(){

        setTimeout(()=>recipejs(), 0)

    }

})

app.route({

    view:"cart",
    load:"cart.html",
    onCreate: function(){console.log("Cart page created")},
    onReady: function(){

        setTimeout(()=>cartjs(), 0)

    }

})

function homepagejs() {
    // DARK MODE
    const btn = document.getElementById("nav-switchthemes");
    const iconbtn = document.getElementById("iconbtn");
    const links = document.getElementsByTagName("a");
    const btns = document.getElementsByTagName("button");
    const spans = document.getElementsByTagName("span");

    function darkMode() {
        iconbtn.classList.remove("fa-moon");
        iconbtn.classList.add("fa-sun");
        for (let link of links) link.classList.add("dark-mode-a");
        for (let btn of btns) btn.classList.add("dark-mode-btn");
        for (let span of spans) {
            if (span.classList.contains("item-text")) span.classList.add("dark-mode-span");
        }
    }

    function lightMode() {
        iconbtn.classList.remove("fa-sun");
        iconbtn.classList.add("fa-moon");
        for (let link of links) link.classList.remove("dark-mode-a");
        for (let btn of btns) btn.classList.remove("dark-mode-btn");
        for (let span of spans) {
            if (span.classList.contains("item-text")) span.classList.remove("dark-mode-span");
        }
    }

    function switchThemes() {
        const elements = document.body;
        elements.classList.toggle("dark-mode");
        if (elements.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            darkMode();
        } else {
            localStorage.setItem("theme", "white");
            lightMode();
        }
    }

    
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        darkMode();
    } else {
        document.body.classList.remove("dark-mode");
        lightMode();
    }

    if (btn) btn.addEventListener("click", switchThemes);

    // FAQ ACCORDION
    const faqs = document.querySelectorAll(".faq1");
    faqs.forEach((item) => {
        item.addEventListener("click", () => {
            toggleFaq(item);
        });
    });

    function toggleFaq(faq) {
        const ans = faq.nextElementSibling;
        if (ans.style.display === "block") {
            ans.style.display = "none";
        } else {
            document.querySelectorAll(".ans1").forEach((ansItem) => {
                ansItem.style.display = "none";
            });
            ans.style.display = "block";
        }
    }
}

function recipejs() {

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
            foodlist.innerHTML = ""
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

    }, {once: true})


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

        // READ MORE

        readmore = document.getElementById("readmore")

        readmore.addEventListener("click", ()=>{

            
            location.href = 'readmore.html'

        })

    })

}

function cartjs() {

    // DARK MODE

    var links = document.getElementsByTagName("a")
    var btns = document.getElementsByTagName("button")
    var spans = document.getElementsByTagName("span")

    var cart = document.querySelector(".cart-total")

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

}

app.run()