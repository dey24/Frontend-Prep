const array = [1, 2, [3, 4], [5, [6, 7]], 8];

function flatten(arr, depth = 100){
    const res = [];

    arr.forEach((item, index) => {
        if(!Array.isArray(item)){
            res.push(item);
        }
        else{
            res.push(...flatten(item, depth-1)) // recursively call the flatten function with the current array (item) and depth - 1.
        }
    })

    return res;
}

console.log(flatten(array));