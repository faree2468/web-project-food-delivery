$(document).ready(function(){
    $("nav a").click(function(e){

        $("nav a").removeClass("active")
        $(this).addClass("active")

    })

})

document.addEventListener("DOMContentLoaded", ()=>{

    if (localStorage.getItem("user") === null && localStorage.getItem("pass") === null) {

        window.location.href="#login"

    }

})


async function getData() {

    const res = await fetch("data/users.json")
    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json()

    return data

}

var app = $.spapp({


    defaultView: "#home",
    templateDir: "./views/"

});

app.route({

    view: "home",
    load: "main.html",
    onCreate: function() {
        const btn = document.getElementById("nav-switchthemes")
        if (btn) btn.addEventListener("click", switchThemes)

        const faqs = document.querySelectorAll(".faq1");
        faqs.forEach((item) => {
            item.addEventListener("click", () => {
                toggleFaq(item);
            });
        });

        
    },
    onReady: function() {

        if (localStorage.getItem("user") === null && localStorage.getItem("pass") === null) {

            window.location.href="#login"
    
        }

        setTimeout(() => homepagejs(), 0);
    }

})

app.route({

    view:"recipe",
    load:"recipe.html",
    onCreate: function() {},
    onReady: function(){

        if (localStorage.getItem("user") === null && localStorage.getItem("pass") === null) {

            window.location.href="#login"
    
        }

        setTimeout(()=>recipejs(), 0)

    }

})

app.route({

    view:"cart",
    load:"cart.html",
    onCreate: function(){console.log("Cart page created")},
    onReady: function(){

        if (localStorage.getItem("user") === null && localStorage.getItem("pass") === null) {

            window.location.href="#login"
    
        }

        setTimeout(()=>cartjs(), 0)

    }

})

app.route({

    view:"readmore",
    load:"readmore.html",
    onCreate: function(){console.log("Read more created")},
    onReady: function(){

        if (localStorage.getItem("user") === null && localStorage.getItem("pass") === null) {

            window.location.href="#login"
    
        }

        readmorejs()
    }


})

app.route({

    view:"leaderboard",
    load:"leaderboards.html",
    onCreate: function(){

        
        const table = document.getElementById("leaderboard-table")
        var leaderboardData
        async function getData() {
            try {

                const res = await fetch("data/leaderboard.json")
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json()
            
                leaderboardData = data
                id = 0
                data.forEach(person => {
                    table.insertAdjacentHTML(
                    "beforeend",
                    `
                    <tr>
                        <td>${id}</td>
                        <td>${person.name}</td>
                        <td>${person.member_since}</td>
                        <td>${person.total_amount_of_orders}</td>
                        <td class="rremove" style="text-align: center; color: red; cursor: pointer;"><i class="fa-solid fa-x"></i></td>
                    </tr>
                    `
                    );
                    id+=1
                });

                addListeners()

            } catch (error) {

                console.error("Error fetching leaderboard data:", error);

            }
            

        }

        getData()

    },
    onReady: function(){

        if (localStorage.getItem("user") === null && localStorage.getItem("pass") === null) {

            window.location.href="#login"
    
        }

        leaderboardjs()

    }


})

app.route({

    view:"login",
    load:"login.html",
    onCreate: function(){console.log("this is created")},
    onReady: function(){

        

        setTimeout(()=>loginjs(), 0)
    }

})


function addListeners() {

    const removebtns = document.querySelectorAll(".rremove")

    removebtns.forEach((item)=> {

        item.addEventListener("click", ()=>{

            removeRow(item)

        })

    })

}

function removeRow(btn) {

    const row = btn.closest("tr");
    if (row) {
        row.remove();
    }

}

function leaderboardjs() {

    // LEADERBOARD
    const table = document.getElementById("leaderboard-table")

    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        timeOut: "3000"
    };


    const editForm = document.getElementById("editForm")
    editForm.addEventListener("submit", function(event) {

        event.preventDefault();
        const idToFind = document.getElementById("iid").value.trim() // removing whitespace for id
        const name = document.getElementById("name").value
        const accInfo = document.getElementById("account-created").value
        const total = document.getElementById("total-amount").value
        
        for (let i = 1; i < table.rows.length; i++) {
            let row = table.rows[i]
            let rowId = row.cells[0].textContent.trim()

            
            if (rowId === idToFind) {
                
                row.cells[1].textContent = name
                row.cells[2].textContent = accInfo
                row.cells[3].textContent = total
                toastr.success(`ID: ${idToFind} is updated!`)
                editForm.reset()
                return
            }
        }

        toastr.error(`No row with ID: ${idToFind}.`)
    })


    // IMAGE GALLERY
    const modal = document.getElementById("myModal")

    const modalImg = document.getElementById("img")


    imgs = document.querySelectorAll(".image-css")

    imgs.forEach((img)=>{

        img.onclick = function() {
            
            modal.style.display = "block"
            modalImg.src = this.src

        }

    })

    const span = document.querySelector(".close-gallery")
    span.onclick = function() { 

    modal.style.display = "none"

    }

    window.onclick = function(event) {

        if (event.target == modal) {

            modal.style.display = "none"

        }

    }




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

}

const iconbtn = document.getElementById("iconbtn");
const links = document.getElementsByTagName("a");
const btns = document.getElementsByTagName("button");
const spans = document.getElementsByTagName("span");

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

function homepagejs() {

    // add name to homepage
    setTimeout(()=>{

        if (localStorage.getItem("user") !== null && localStorage.getItem("pass") !== null) {

            document.getElementById("text-above-search").innerHTML = `<p>Hey, ${localStorage.getItem("user")} <b>Discover</b> restaurants and more near you</p>`

        }
        

    }, 3000)


    // DARK MODE
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        darkMode();
    } else {
        document.body.classList.remove("dark-mode");
        lightMode();
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

function readmorejs() {

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

}

function loginjs() {

    // form event listener, wait for dom to load otherwise form error
    setTimeout(()=>wrapper(), 1000)

    function wrapper(){

        toastr.options = {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-right",
            timeOut: "3000"
        };

        myform = document.getElementById("loginForm")
        myform.addEventListener("submit", (e)=>{

            correct = false
            e.preventDefault()
            user = document.getElementById("user").value.trim()
            pass = document.getElementById("pass").value.trim()
            allData = getData()
            allData.then((data)=>{

                data.forEach(el => {
                    if (el["username"] === user && el["password"] === pass){
                        correct = true
                        localStorage.setItem("user", user)
                        localStorage.setItem("pass", pass)
                        toastr.success("Success, redirecting to home page...")
                        setTimeout(function(){
                            window.location.href = "#home"
                        },3000)

                    }
                });
                if(!correct){toastr.error("Incorrect credentials")}

            })

        })

    }

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