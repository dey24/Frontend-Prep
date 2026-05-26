const fakeFetcher = (name, time, isReject) => {
    return function(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(isReject){
                    reject(`Error: API failed for ${name}`);
                }
                else{
                    resolve(`Data received for ${name}`);
                }
            }, time)
        })
    }
}

const p1 = fakeFetcher('P1', 1000, false);
const p2 = fakeFetcher('P2', 2000, false);
const p3 = fakeFetcher('P3', 3000, true);

Promise.myAll = function(promises = []){
    return new Promise((resolve, reject) => { // we create a new function called myAll that takes an array of promises as an argument and returns a new promise that resolves when all the promises in the array have resolved successfully. The resolved value of the new promise is an array of the resolved values of the input promises, in the same order as the input array. If any of the input promises reject, the new promise is rejected with the reason for rejection of the first promise that rejects.
        let results = [];
        let completedPromises = 0;
        if(promises.length === 0){
            resolve('No promises to resolve'); // if the input array of promises is empty, we resolve the new promise with an empty array immediately.
            return;
        }
        promises.forEach((promise, index) => {
            promise.then((res) => { // we iterate over the input array of promises and for each promise, we attach a then handler to it. The then handler is called when the promise resolves successfully, and we store the resolved value in the results array at the corresponding index. We also increment the completedPromises counter, and if it equals the length of the input array, it means that all promises have resolved successfully, and we can resolve the new promise with the results array.
                results[index] = res;
                completedPromises++;
                if(completedPromises === promises.length){
                    resolve(results);
                }
            })
            .catch((err) => { // if any of the input promises reject, we reject the new promise with the reason for rejection of the first promise that rejects. We also return from the catch handler to prevent further execution of the then handlers for the remaining promises.
                reject(err);
            });
        })
    });
}
const allData = Promise.myAll([p1(), p2(), p3()]);

allData.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.error(err);
});