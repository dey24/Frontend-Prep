const fakeFetcher = (data, duration, isReject) => {
    return function() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(isReject){
                    reject(`Error: API failed for ${data}`);
                } else {
                    resolve('Data received for ' + data);
                }
            }, duration);
        })
    }
}

const p1 = fakeFetcher('P1', 1000, true);
const p2 = fakeFetcher('P2', 2000);
const p3 = fakeFetcher('P3', 3000);

Promise.allSettled = function (promises){ // we create a new function called allSettled that takes an array of promises as an argument and returns a new promise that resolves when all the promises in the array have either resolved or rejected. The resolved value of the new promise is an array of objects, where each object represents the outcome of the corresponding promise in the input array. Each object has a status property that indicates whether the promise was fulfilled or rejected, and a value property that contains the resolved value or the reason for rejection.
    return new Promise((resolve, reject) => {
        let results = [];
        let completedPromises = 0;

        promises.forEach((promise, index) => {// we iterate over the input array of promises and for each promise, we attach a then and catch handler to it. The then handler is called when the promise resolves successfully, and the catch handler is called when the promise rejects. In both handlers, we store the result of the promise in the results array at the corresponding index, and we increment the completedPromises counter. If the completedPromises counter equals the length of the input array, it means that all promises have either resolved or rejected, and we can resolve the new promise with the results array.
            promise.then((res) => {
                results[index] = { status: 'fulfilled', value: res }; // if the promise resolves successfully, we store the resolved value in the results array at the corresponding index
            })
            .catch((err) => {
                results[index] = { status: 'rejected', reason: err }; // if the promise rejects, we store the reason for rejection in the results array at the corresponding index
            })
            .finally(() => {
                completedPromises++;
                if(completedPromises === promises.length){
                    resolve(results); //
                }
            })
        });
    })
}
const allData = Promise.allSettled([p1(), p2(), p3()]);

allData.then((res) => {
    console.log(res);
})
.catch((err) => {    
    console.error(err);
});