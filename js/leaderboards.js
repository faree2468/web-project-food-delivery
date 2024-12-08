// LEADERBOARD

const table = document.getElementById("leaderboard-table")

async function getData() {

    try {

        const res = await fetch("data/leaderboard.json")
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json()
    

        data.forEach(person => {
            table.insertAdjacentHTML(
              "beforeend",
              `
              <tr>
                <td>${person.name}</td>
                <td>${person.member_since}</td>
                <td>${person.total_amount_of_orders}</td>
                <td class="remove" style="text-align: center; color: red; cursor: pointer;"><i class="fa-solid fa-x"></i></td>
              </tr>
              `
            );
        });

        addListeners()

    } catch (error) {

        console.error("Error fetching leaderboard data:", error);

    }
    

}

getData()


function addListeners() {

    const removebtns = document.querySelectorAll(".remove")

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