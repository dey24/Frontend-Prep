const fetchWithTimeout = (url, duration) => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal; // signal is used to abort the fetch request when the timer expires
    let timerId = null;
    fetch(url, {signal})
    .then((res) => {
      res.json().then((response) => {
        timerId.clearTimeout();
        resolve(response) // if the fetch request completes before the timer expires, we clear the timer and resolve the promise with the response
      })
      .catch((err) => reject(err));
    })
    .catch((err) => {
      reject(err)
    });
  
    timerId = setTimeout(function() { // if the timer expires before the fetch request completes, we abort the request
      console.log('aborted')
      controller.abort();
    }, duration);
  })
}


fetchWithTimeout('https://jsonplaceholder.typicode.com/users/2', 100).then((resp) => {
  console.log(resp);
}).catch((error) => {
  console.error(error);
});
