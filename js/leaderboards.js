// LEADERBOARD

toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right",
    timeOut: "3000"
};



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
                <td class="remove" style="text-align: center; color: red; cursor: pointer;"><i class="fa-solid fa-x"></i></td>
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