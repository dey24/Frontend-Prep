//1. Normal limited currying 
function sum(a){
    return function(b){
        return function(c){
            return a+b+c;
        }
    }
}

console.log(sum(2)(5)(8));

//2. Infinite Currying example
function sum(a){
    return function(b){
        if(b != undefined){ // b needs to be undefined, only then it will work.
            return sum(a+b);
        }
        return a;
    }
}

console.log(sum(2)(5)(8)());


//3. The Classic Curry Utility (Fixed Arity)
function curry(cb){ // cb is the callback function that we want to curry.
    return function curried(...args){ // args is an array of arguments that we want to pass to the callback function.
        if(args.length >= cb.length){ // If the number of arguments passed is greater than or equal to the number of arguments expected by the callback function, then we can call the callback function with the arguments.
            return cb(...args); // We use the spread operator to pass the arguments to the callback function.
        }
        
        return function(...nextArgs){ // If the number of arguments passed is less than the number of arguments expected by the callback function, then we return a new function that takes the next set of arguments.
            return curried(...args, ...nextArgs) // We use the spread operator to combine the arguments passed so far with the next set of arguments and call the curried function again.
        }
    }
}

function sum(a,b,c){ // This is a normal function, not curried.
    return a+b+c; //
}

const curriedSum = curry(sum); // This is a curried version of the sum function.

console.log(curriedSum(1,2,3)); // Output: 6

// 4.  The multi curry utility (Variable Arity)
function calc(initVal){
    let result = initVal;
    let obj = {
        add(num){
            result = result + num;
            console.log(this, 'this');
            return this;
        },
        subtract(num){
            result -= num;
            return this
        },
        multiple(num){
            result *= num;
            return this;
        },
        divide(num){
            result /= num;
            return this;
        },
        value(){
            return result;
        }
    }
    return obj; 
}


const ans = calc(10).add(5).subtract(2).multiple(3).divide(3).value();
const ans2 = calc(10).add(5).add(5).value();

console.log(ans);
console.log(ans2);  