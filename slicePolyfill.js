Array.prototype.mySlice = function(start, end){
    const newArr = []
     // handle negative start
    if (start < 0) {
        start = len + start;
    }

    // handle negative end
    if (end < 0) {
        end = len + end;
    }
    for(let i =start; i<end; i++){
        newArr.push(this[i])
    }

    return newArr;
}

const arr = ['abc', 'def', 'ghi', 'jkl'];
const newArr = arr.mySlice(1,3);
console.log(newArr)