let apiCall1 = () => { 
    fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((resp) => {resp.json()}).catch((error) => {console.log(error)})
};
let apiCall2 = () => {
    fetch('https://jsonplaceholder.typicode.com/users/2')
    .then((resp) => {resp.json()}).catch((error) => {console.log(error)})
};
let urgentAPICall = () => {
    fetch('https://jsonplaceholder.typicode.com/users/3')
    .then((resp) => {resp.json()}).catch((error) => {console.log(error)})
};


console.log("Main program started");
setTimeout(apiCall1, 0);
setTimeout(apiCall2, 10);
queueMicrotask(urgentAPICall);
console.log("Main program exiting");