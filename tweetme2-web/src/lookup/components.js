export function loadTweets(callback) {
    const xhr = new XMLHttpRequest();
    const method = "GET";
    const url = "http://localhost:8000/api/tweets"; //endpoint
    const responseType = "json";

    //setting up xhr object
    xhr.responseType = responseType;
    xhr.open(method, url);
    xhr.onload = function () {
        callback(this.response, this.status)
    }
    xhr.onerror = function (e) {
        console.log(e);
        callback({ "message": "The request was an error" }, 400)
    }
    xhr.send();
}