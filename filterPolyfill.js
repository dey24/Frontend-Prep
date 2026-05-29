Array.prototype.myFilter = function(cb){
    if(!Array.isArray(this)) throw new Error;

    const resultArr = []
    for(let i =0; i<this.length; i++){
        if(cb(this[i], i, this)){
            resultArr.push(this[i]);
        }
    }

    return resultArr;
}

const arr = [1,2,3,4,5,6];

const filterArr = arr.myFilter((item, index) => {
    return item > 2;
})

console.log(filterArr);