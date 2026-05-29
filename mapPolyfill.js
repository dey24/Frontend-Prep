Array.prototype.myMap = function(cb){
    if(!Array.isArray(this)) return;

    const result = []

    for(let i=0; i<this.length; i++){
        result.push(cb(this[i], i, this));
    }

    return result;
}

const arr = [1,2,3,4,5];

const newOne = arr.myMap((item, index) => {
    return item +2;
})

console.log(newOne);