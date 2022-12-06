// https://mittkak.nu/v1/orders/current

const week = document.getElementById("week")
const loginButton = document.getElementById("loginSubmit")
const usernameInput = document.getElementById("usernameInput")
const passwordInput = document.getElementById("passwordInput")
const loginBox = document.getElementById("loginDiv")
const logoutDiv = document.getElementById("logoutDiv")

// array of all days
const wdays = ["monday", "tuesday", "wednesday", "thursday", "friday"]


// add login headers
let headers = new Headers();

function start(){
    if (localStorage.getItem("username") && localStorage.getItem("password")){
        headers.append("Authorization", "Basic " + btoa(localStorage.getItem("username") + ":" + localStorage.getItem("password")));
        loginBox.style.display = "none"
        // console.log("logged in")
    }
    else{
        loginBox.style.display = "flex"
        headers.delete("Authorization")
    }
    loadFood()
    loadUsername()
}

// get username
function loadUsername(){
    fetch("https://mittkak.nu/v1/login", {method:"GET", headers:headers}).then(response => response.json()).then((json)=>{
        document.getElementById("welcome").innerText = json["name"]
    })
}

// get food
function loadFood(){
    fetch("https://mittkak.nu/v1/orders/current", {method:'GET',headers: headers})
    .then(response => response.json())
    .then((json)=>{
        // console.log(json["current"])
        const days = week.querySelectorAll(":scope > div")
        let x = 0
        days.forEach(day => {
            day.querySelector(":scope > p").innerHTML = json["current"][wdays[x]]["dish"]["name"]
            day.querySelector(":scope > img").src = json["current"][wdays[x]]["dish"]["image"]
            x = x + 1;
        });
    });
}

start()

loginButton.addEventListener("click", ()=>{
    localStorage.setItem("username", usernameInput.value)
    localStorage.setItem("password", passwordInput.value)
    start()
})

logoutDiv.addEventListener("click", ()=>{
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    loadFood()
    start()
})

